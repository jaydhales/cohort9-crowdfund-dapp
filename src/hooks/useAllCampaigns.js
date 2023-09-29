import { useEffect, useState } from "react";
import useCampaignCount from "./useCampaignCount";
import { useConnection } from "../context/connection";
import {
    getCrowdfundContract,
    getCrowdfundContractWithProvider,
} from "../utils";

const useAllCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { provider } = useConnection();
    const campaignNo = useCampaignCount();

    useEffect(() => {
        const fetchAllCampaigns = async () => {
            try {
                const contract = await getCrowdfundContract(provider, false);
                const campaignsKeys = Array.from(
                    { length: Number(campaignNo) },
                    (_, i) => i + 1
                );
                const campaignPromises = campaignsKeys.map((id) =>
                    contract.crowd(id)
                );

                const contributorsPromises = campaignsKeys.map((id) =>
                    contract.getContributors(id)
                );

                const campaignResults = await Promise.all(campaignPromises);
                const contributorsResults = await Promise.all(contributorsPromises);

                const campaignDetails = campaignResults.map(
                    (details, index) => ({
                        id: campaignsKeys[index],
                        title: details.title,
                        fundingGoal: details.fundingGoal,
                        owner: details.owner,
                        durationTime: Number(details.durationTime),
                        isActive: details.isActive,
                        fundingBalance: details.fundingBalance,
                        contributors: contributorsResults[index],
                    })
                );

                setCampaigns(campaignDetails);
            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        };

        fetchAllCampaigns();
       
    }, [campaignNo, provider]);


    // Listen for event

    useEffect(() => {
        const updateCampaign = (id, title, fundingGoal, duration) => {
            const newCam = {
                id,
                title,
                fundingGoal,
                durationTime: Number(duration),
                isActive: true,
                fundingBalance: 0,
                contributors: [],
            };
            const newCampaignArr = [...campaigns, newCam]
            setCampaigns(newCampaignArr)
        }

        
        const handleProposeCampaignEvent = (id, title, amount, duration) => {
            updateCampaign(id, title, amount, duration);
        };
        const contract = getCrowdfundContractWithProvider(provider);
        contract.on("ProposeCampaign", handleProposeCampaignEvent);

        return () => {
            contract.off("ProposeCampaign", handleProposeCampaignEvent);
        };
    }, [campaigns, provider])

    return campaigns;
};

export default useAllCampaigns;
