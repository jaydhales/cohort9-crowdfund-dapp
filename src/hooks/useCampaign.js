import { ethers } from "ethers";
import { useConnection } from "../context/connection";
import { contractAddr } from "../utils";
import contractAbi from "../utils/abi.json";
import { useEffect, useState } from "react";


const useCampaign = () => {
   const [campaigns, setCampaigns] = useState([]);
   const [contract, setContract] = useState(null)

   const { isActive, provider } = useConnection();

   const getContract = async (_provider) => {
      setContract(new ethers.Contract(contractAddr, contractAbi, _provider));
   }

   const getData = async () => {
      try {
         const id = ethers.formatUnits(await contract.id(), 0);
         const allCalls = []
         for (let i = 1; i <= id; i++) {
            const promise = contract.crowd(i);
            allCalls.push(promise)
         }
         const results = await Promise.all(allCalls);

         setCampaigns(results)

      } catch (err) {
         console.error(err);
      }
   }


   useEffect(() => {
      if (!isActive) return;
      getContract(provider);
   }, [isActive, provider])

   useEffect(() => {
      if (!contract) return;
      getData(contract)
   }, [contract]) // eslint-disable-line react-hooks/exhaustive-deps

   const createCampaign = async (_title,
      _fundingGoal,
      _durationTime) => {
      try {
         const signer = await provider.getSigner();
         await contract.connect(signer).proposeCampaign(_title, _fundingGoal, _durationTime);
         return { status: true, msg: "Successfully created Campaign" };
      } catch (err) {
         console.error(err);
         return { status: false, msg: err.message }
      }

   }

   return {
      campaigns,
      createCampaign
   }
}

export default useCampaign;