import {
    Web3Button,
    useAddress,
    useConnectionStatus,
    useDisconnect,
} from "@thirdweb-dev/react";
import { toast } from "react-hot-toast";
import { AiOutlineDisconnect } from "react-icons/ai";

export default function Home() {
    const address = useAddress();
    const connectionStatus = useConnectionStatus();
    const disconnect = useDisconnect();

    return (
        <div className="border-2 border-black p-4 flex flex-col space-y-3">
            <h1 className="text-lg font-bold text-center">
                Allowlist Paymaster on Celo using ThirdWeb
            </h1>

            <h2 className="text-md text-center">
                Mint an NFT from a smart contract wallet
            </h2>

            {address && (
                <div className="flex flex-col border-2 border-black p-4">
                    <p>Smart Account:</p>
                    <a
                        href={`https://alfajores.celoscan.io/address/${address}`}
                        target="_blank"
                    >
                        <p className="underline"> {address}</p>
                    </a>
                </div>
            )}

            {/* This button acts as a connect wallet button if one is not already connected. */}
            <Web3Button
                style={{
                    border: "2px solid black",
                    background: "transparent",
                    borderRadius: 0,
                    fontWeight: 400,
                    boxShadow: "",
                }}
                // ThirdWeb NFT Contract on Celo Alfajores Testnet
                // https://thirdweb.com/celo-alfajores-testnet/0xc7B49359B9507d24a5CF39375c31E39EB2f6A2aB
                contractAddress="0xc7B49359B9507d24a5CF39375c31E39EB2f6A2aB"
                action={(contract) =>
                    // Call the "mintTo" function with the following metadata.
                    // Metadata is uploaded to IPFS and pinned before the transaction is sent.
                    contract.erc721.claim(1)
                }
                onSuccess={(result) => {
                    toast.success("NFT Minted!");
                }}
                onError={(error) => {
                    toast.error("Something went wrong!");
                }}
            >
                Mint An NFT
            </Web3Button>
            {connectionStatus == "connected" && (
                <button
                    className="border-2 border-black py-2 flex justify-center items-center space-x-1"
                    onClick={disconnect}
                >
                    <AiOutlineDisconnect />
                    <p>Disconnect</p>
                </button>
            )}
        </div>
    );
}
