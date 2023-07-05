import { BytesLike, defaultAbiCoder, hexConcat } from "ethers/lib/utils";
import { PrivateKeyWallet } from "@thirdweb-dev/wallets";
import { UserOperationStruct } from "@account-abstraction/contracts";
import { CeloAlfajoresTestnet } from "@thirdweb-dev/chains";
import { NotPromise, signUserOp } from "./aa-utils";
import { ethers } from "ethers";
import AllowlistPaymasterABI from "./abi.json";

// Address of the paymaster
const ALLOWLIST_PAYMASTER_ADDRESS =
    "0x34A00151460C7Bec401D3b24fE86E9C152EE8284";

// Only the following UserOperation senders will be allowed
let allowlist: string[] = ["0xc309c944764619548063E9644f671f666dDF95aB"];

/**
 * Get the nonce for the UserOperation from Paymaster
 */
async function getSenderNonce(address: string) {
    let provider = new ethers.providers.JsonRpcProvider(
        CeloAlfajoresTestnet.rpc[2]
    );

    let AllowlistPaymaster = new ethers.Contract(
        ALLOWLIST_PAYMASTER_ADDRESS,
        AllowlistPaymasterABI,
        provider
    );

    let nonce = await AllowlistPaymaster.senderNonce(address);

    return nonce;
}

/**
 * This function should return the `paymasterAndData` component of the UserOperation which will be then validated by the on-chain paymaster contract
 *
 * Any arbitrary logic can be defined here ultimately the return value should be the value that will lead to successful validation on-chain by `validatePaymasterUserOp` function on the paymaster
 *
 * The standard (ERC-4337) structure of paymasterAndData is
 *
 * [PAYMASTER_ADDRESS (20 bytes)][VALID_UNTIL (uint48 but encoded so 32 bytes)][VALID_AFTER (uint48 but encoded so 32 bytes)][SIGNATURE (bytes)]
 */
export async function getPaymasterAndData(
    userOp: NotPromise<UserOperationStruct>
): Promise<string> {
    // Check if the UserOperation sender is part of the allowList
    if (allowlist.indexOf(userOp.sender as string) != -1) {
        // The Paymaster Owner in the form of Wallet
        let wallet = new PrivateKeyWallet(
            process.env.PAYMASTER_SIGNER_KEY as string,
            CeloAlfajoresTestnet.chainId,
            process.env.NEXT_PUBLIC_THIRDWEB_API_KEY
        );

        // A timestamp in UNIX until which the paymaster sponsorship is valid
        let validUntil = Math.round(Date.now() / 1000) + 10 * 60;

        /**
         * UserOperation signed by Paymaster Owner
         *
         * The current state of UserOperation doesn't have paymasterAndData and a signature so we have Dummy values for those
         *
         */
        let { signature } = signUserOp(
            userOp as NotPromise<UserOperationStruct>,
            await wallet.getSigner(), // The paymaster owner in the form of Signer
            CeloAlfajoresTestnet.chainId,
            ALLOWLIST_PAYMASTER_ADDRESS,
            await getSenderNonce(userOp.sender), // senderNonce (this nonce is subjective to every paymaster and sender)
            validUntil,
            0 // validAfter - Timestamp after which the UserOperation sponsorship should be valid
        );

        /**
         * Concatenating all the paymasterAndData components
         */
        let paymasterAndData = hexConcat([
            ALLOWLIST_PAYMASTER_ADDRESS,
            defaultAbiCoder.encode(["uint48", "uint48"], [validUntil, 0]),
            signature as NotPromise<BytesLike>,
        ]);

        return paymasterAndData;
    }

    // If the sender is not part of the list return nothing
    throw new Error("Sender not allowlisted");
}
