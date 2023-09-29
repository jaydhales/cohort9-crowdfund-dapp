import { useCallback, useEffect, useState } from "react";
import useCampaignCount from "./useCampaignCount";
import { useConnection } from "../context/connection";
import { getCrowdfundContract, getCrowdfundContractWithProvider } from "../utils";

const useCampaign = (id) => {
    const [campaign, setCampaign] = useState(null);
    const [state, setState] = useState("LOADING");
    const { provider } = useConnection();
    const campaignLength = useCampaignCount();

    const fetchCampaign = useCallback(async () => {

        const campaignId = Number(id);
        if (!campaignLength) return;
        if (!campaignId || campaignId > campaignLength)
            return setState("NOT_FOUND");
        try {
            const contract = await getCrowdfundContract(provider, false);

            const campaignStruct = await contract.crowd(campaignId);


            const campaignDetails = {
                id: campaignId,
                title: campaignStruct.title,
                fundingGoal: campaignStruct.fundingGoal,
                owner: campaignStruct.owner,
                durationTime: Number(campaignStruct.durationTime),
                isActive: campaignStruct.isActive,
                fundingBalance: campaignStruct.fundingBalance,
                contributors: await contract.getContributors(id),
            };


            setCampaign(campaignDetails);
            setState("LOADED");
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            setState("NOT_FOUND");
        }
    }, [campaignLength, id, provider]);

    useEffect(() => {
        fetchCampaign();
    }, [campaignLength, fetchCampaign, id, provider]);


    useEffect(() => {
        // const handleContributeEthEvent = (id, balance) => id === campaign.id && setCampaign({ ...campaign, fundingBalance: balance })
        const handleContributeEthEvent = (id) => fetchCampaign()

        const contract = getCrowdfundContractWithProvider(provider);
        contract.on("ContributeEth", handleContributeEthEvent);

        return () => {
            contract.off("ContributeEth", handleContributeEthEvent);
        };
    }, [fetchCampaign, provider])

    return { campaign, state };
};

export default useCampaign;
