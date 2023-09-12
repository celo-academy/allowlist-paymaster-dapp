import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css";
import {
    metamaskWallet,
    smartWallet,
    ThirdwebProvider,
    walletConnect,
} from "@thirdweb-dev/react";
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";
import { PaymasterAPI } from "@account-abstraction/sdk";
import { UserOperationStruct } from "@account-abstraction/contracts";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { QueryClient } from "@tanstack/react-query";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const activeChain = "celo-alfajores-testnet";

class AllowlistPaymasterAPI extends PaymasterAPI {
    async getPaymasterAndData(
        op: Partial<UserOperationStruct>
    ): Promise<string> {
        try {
            let response = await axios.get("/api/paymasterAndData", {
                params: op,
            });

            let { data } = response;
            return data.paymasterAndData;
        } catch (e) {
            throw new Error(e.response.data.error);
        }
    }
}

function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return (
        <ThirdwebProvider
            activeChain={activeChain}
            supportedChains={[CeloAlfajoresTestnet]}
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_API_KEY}
            queryClient={queryClient}
            // Define that we only want to support Account Abstraction wallets aka Smart Wallets
            supportedWallets={[
                smartWallet({
                    // View my Factory Contract: https://thirdweb.com/celo-alfajores-testnet/0x7FDaA334E6A515dF22583c5dfe78B302a3dfE3F8
                    // Deploy your own Factory: https://thirdweb.com/thirdweb.eth/AccountFactory
                    factoryAddress:
                        "0x7FDaA334E6A515dF22583c5dfe78B302a3dfE3F8",

                    // Gasless mode on: means the smart wallet does not need to be funded with any CELO.
                    gasless: true,

                    // API Key from the thirdweb dashboard. (You'll want to keep yours a secret)

                    personalWallets: [
                        walletConnect({
                            projectId,
                        }),
                        metamaskWallet({
                            projectId,
                        }),
                    ],
                    paymasterAPI: new AllowlistPaymasterAPI(),
                }),
            ]}
        >
            <Layout>
                <Component {...pageProps} />
                <Toaster />
            </Layout>
        </ThirdwebProvider>
    );
}

export default App;
