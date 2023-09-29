import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { calculateGasMargin, getCrowdfundContract } from "../utils";

const useProposeCampaign = () => {
    const { isActive, provider } = useConnection();
    const proposeCampaign = useCallback(
        async (title, goal, duration) => {
            if (!title || !goal || !duration)
                return alert("Please provide all valeus");
            if (!isActive) return alert("please, connect");
            const contract = await getCrowdfundContract(provider, true);
            const estimatedGas = await contract.proposeCampaign.estimateGas(
                title,
                goal,
                duration
            );

            return contract.proposeCampaign(title, goal, duration, {
                gasLimit: calculateGasMargin(estimatedGas),
            });
        },
        [isActive, provider]
    );

    return proposeCampaign;
};

export default useProposeCampaign;
