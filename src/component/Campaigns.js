import React from 'react'
import useCampaign from '../hooks/useCampaign';
import { ethers } from 'ethers';
import { shortenAccount } from '../utils';

const Campaigns = () => {

   const { campaigns } = useCampaign();

   return (
      <div className='px-6 py-8 grid gap-4 sm:grid-cols-2'>
         {
            campaigns.length > 0 && campaigns.map((
               { title,
                  fundingGoal,
                  owner,
                  durationTime,
                  isActive,
                  fundingBalance
               }, index) => (
               <div key={index} className='bg-blue-400 p-4 rounded-lg shadow-lg hover:bg-blue-300 hover:shadow-inner hover:shadow-blue-700'>
                  <p>{title}</p>
                  <p>{ethers.formatEther(fundingGoal)}</p>
                  <p>{shortenAccount(owner)}</p>
                  <p>{ethers.formatUnits(durationTime , 0)}</p>
                  <p>{isActive && "active"}</p>
                  <p>{ethers.formatEther(fundingBalance)}</p>
               </div>
            ))
         }
      </div>
   )
}

export default Campaigns