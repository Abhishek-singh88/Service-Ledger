import { LocalVouchersABI } from './abis/LocalVouchers';

export const CONTRACTS = {
  localVouchers: {
    address: "0x075A09489e13765451A7E4085Db30AEeed9BA9F2" as `0x${string}`,
    abi: LocalVouchersABI
  },
  slr: {
    address: "0x6dcEae9Afd6E76eFEb8B0fB27803c1dfFb06E9A6" as `0x${string}`,
    abi: [
      {
        "inputs": [
          { "internalType": "address", "name": "spender", "type": "address" },
          { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
      }
    ] as const
  }
} as const;

export const ARBITRUM_SEPOLIA_CHAIN_ID = 421614;
