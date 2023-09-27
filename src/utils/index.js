import { ethers } from "ethers";
import { supportedChains } from "../constants";

export const isSupportedChain = (chainId) =>
    supportedChains.includes(Number(chainId));

export const shortenAccount = (account) =>
    `${account.substring(0, 5)}...${account.substring(38)}`;

export const getReadOnlyProvider = () =>
    new ethers.JsonRpcProvider("https://goerli.base.org");

export const contractAddr = "0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C";

export const formatToETH = (_bal) => `${Number(_bal).toFixed(2)} ETH`;

export const formatDate = (_date) => {
    const currentDate = Date.now() / 1000 / 3600;
    const date = ethers.formatUnits(_date, 0) / 3600;
    const timeLeft = (Math.floor(date - currentDate))
    return timeLeft > 0 ? timeLeft : 0;
};
