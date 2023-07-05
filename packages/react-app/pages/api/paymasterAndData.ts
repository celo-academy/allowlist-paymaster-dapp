import { getPaymasterAndData } from "@/paymaster";
import { NotPromise } from "@/paymaster/aa-utils";
import { UserOperationStruct } from "@account-abstraction/contracts";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { query } = req;

    try {
        let paymasterAndData = await getPaymasterAndData(
            query as NotPromise<UserOperationStruct>
        );

        return res.status(200).json({
            paymasterAndData,
        });
    } catch (error) {
        return res.status(400).json({
            error: "Sender Not Allowed",
        });
    }
}
