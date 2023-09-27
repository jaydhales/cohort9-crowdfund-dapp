import React from "react";
import useCampaign from "../hooks/useCampaign";
import { ethers } from "ethers";
import { formatToETH, shortenAccount, formatDate } from "../utils";
import image from "../assets/crowd-funding-concept/515.jpg";

const Campaigns = () => {
   const { campaigns } = useCampaign();

   return (
      <div className="px-6 py-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
         {campaigns.length > 0 &&
            campaigns.map(
               (
                  {
                     title,
                     fundingGoal,
                     owner,
                     durationTime,
                     isActive,
                     fundingBalance,
                  },
                  index,
               ) => (
                  <div
                     key={index}
                     className={`${
                        (isActive || formatDate(durationTime) > 0) && "border-2 border-green-400"
                     } rounded-lg overflow-hidden hover:scale-[101%]`}
                  >
                     <img
                        src={image}
                        alt="Crowfunding Illustration"
                        className={`w-full h-40 object-cover ${
                           (isActive || formatDate(durationTime) > 0) && "border-b-[3px] border-b-green-300"
                        }`}
                     />
                     <div className="p-4">
                        <p className="font-bold">{title}</p>
                        <div className="flex justify-between items-center">
                           <p>
                              <b>Goal: </b>
                              {formatToETH(ethers.formatEther(fundingGoal))}
                           </p>
                           <p className="text-sm font-semibold">
                              {shortenAccount(owner)}
                           </p>
                        </div>

                        <p>{formatDate(durationTime)} hrs left</p>
                        <p><b>Fundings: </b>{formatToETH(ethers.formatEther(fundingBalance))}</p>
                     </div>
                  </div>
               ),
            )}
      </div>
   );
};

export default Campaigns;
