export const LocalVouchersABI = [
    {
  "_format": "hh-sol-artifact-1",
  "contractName": "LocalVouchers",
  "sourceName": "contracts/LocalVouchers.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_paymentToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_feeRecipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_feeBps",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_baseURI",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC1155InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idsLength",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "valuesLength",
          "type": "uint256"
        }
      ],
      "name": "ERC1155InvalidArrayLength",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC1155InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC1155MissingApprovalForAll",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "business",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        }
      ],
      "name": "BusinessMetadataUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "business",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        }
      ],
      "name": "BusinessRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "feeBps",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "feeRecipient",
          "type": "address"
        }
      ],
      "name": "FeeUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "indexed": false,
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        }
      ],
      "name": "TransferBatch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "TransferSingle",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "value",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "URI",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "business",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "uri",
          "type": "string"
        }
      ],
      "name": "VoucherCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalPaid",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fee",
          "type": "uint256"
        }
      ],
      "name": "VoucherPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "VoucherRedeemed",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "accounts",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        }
      ],
      "name": "balanceOfBatch",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "businesses",
      "outputs": [
        {
          "internalType": "bool",
          "name": "registered",
          "type": "bool"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "buyVoucher",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "uri_",
          "type": "string"
        }
      ],
      "name": "createVoucher",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeBps",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "feeRecipient",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "nextVoucherId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paymentToken",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "redeemSelf",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        }
      ],
      "name": "registerBusiness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "ids",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "values",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeBatchTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_feeRecipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_feeBps",
          "type": "uint256"
        }
      ],
      "name": "setFeeConfig",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        }
      ],
      "name": "setVoucherActive",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        }
      ],
      "name": "updateBusinessMetadata",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "uri",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "vouchers",
      "outputs": [
        {
          "internalType": "address",
          "name": "business",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "expiry",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x60a060405234801561001057600080fd5b50604051614ced380380614ced83398181016040528101906100329190610558565b33816100438161027660201b60201c565b50600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100b65760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016100ad91906105ea565b60405180910390fd5b6100c58161028960201b60201c565b50600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610135576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161012c90610662565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036101a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161019b906106ce565b60405180910390fd5b6103e88211156101e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101e09061073a565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff168152505082600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600581905550600160088190555050505050610a43565b80600290816102859190610971565b5050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061038e82610363565b9050919050565b61039e81610383565b81146103a957600080fd5b50565b6000815190506103bb81610395565b92915050565b6000819050919050565b6103d4816103c1565b81146103df57600080fd5b50565b6000815190506103f1816103cb565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61044a82610401565b810181811067ffffffffffffffff8211171561046957610468610412565b5b80604052505050565b600061047c61034f565b90506104888282610441565b919050565b600067ffffffffffffffff8211156104a8576104a7610412565b5b6104b182610401565b9050602081019050919050565b60005b838110156104dc5780820151818401526020810190506104c1565b60008484015250505050565b60006104fb6104f68461048d565b610472565b905082815260208101848484011115610517576105166103fc565b5b6105228482856104be565b509392505050565b600082601f83011261053f5761053e6103f7565b5b815161054f8482602086016104e8565b91505092915050565b6000806000806080858703121561057257610571610359565b5b6000610580878288016103ac565b9450506020610591878288016103ac565b93505060406105a2878288016103e2565b925050606085015167ffffffffffffffff8111156105c3576105c261035e565b5b6105cf8782880161052a565b91505092959194509250565b6105e481610383565b82525050565b60006020820190506105ff60008301846105db565b92915050565b600082825260208201905092915050565b7f496e76616c6964207061796d656e7420746f6b656e0000000000000000000000600082015250565b600061064c601583610605565b915061065782610616565b602082019050919050565b6000602082019050818103600083015261067b8161063f565b9050919050565b7f496e76616c69642066656520726563697069656e740000000000000000000000600082015250565b60006106b8601583610605565b91506106c382610682565b602082019050919050565b600060208201905081810360008301526106e7816106ab565b9050919050565b7f46656520746f6f20686967680000000000000000000000000000000000000000600082015250565b6000610724600c83610605565b915061072f826106ee565b602082019050919050565b6000602082019050818103600083015261075381610717565b9050919050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806107ac57607f821691505b6020821081036107bf576107be610765565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026108277fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826107ea565b61083186836107ea565b95508019841693508086168417925050509392505050565b6000819050919050565b600061086e610869610864846103c1565b610849565b6103c1565b9050919050565b6000819050919050565b61088883610853565b61089c61089482610875565b8484546107f7565b825550505050565b600090565b6108b16108a4565b6108bc81848461087f565b505050565b5b818110156108e0576108d56000826108a9565b6001810190506108c2565b5050565b601f821115610925576108f6816107c5565b6108ff846107da565b8101602085101561090e578190505b61092261091a856107da565b8301826108c1565b50505b505050565b600082821c905092915050565b60006109486000198460080261092a565b1980831691505092915050565b60006109618383610937565b9150826002028217905092915050565b61097a8261075a565b67ffffffffffffffff81111561099357610992610412565b5b61099d8254610794565b6109a88282856108e4565b600060209050601f8311600181146109db57600084156109c9578287015190505b6109d38582610955565b865550610a3b565b601f1984166109e9866107c5565b60005b82811015610a11578489015182556001820191506020850194506020810190506109ec565b86831015610a2e5784890151610a2a601f891682610937565b8355505b6001600288020188555050505b505050505050565b608051614281610a6c6000396000818161074c01528181611337015261143801526142816000f3fe608060405234801561001057600080fd5b50600436106101575760003560e01c80635f5a8200116100c3578063b31e26e41161007c578063b31e26e4146103c5578063e07a3111146103f7578063e985e9c514610413578063f242432a14610443578063f2fde38b1461045f578063fe7c7bcf1461047b57610157565b80635f5a82001461032d57806360e7f7d1146103495780636ab1507114610365578063715018a6146103815780638da5cb5b1461038b578063a22cb465146103a957610157565b8063368ed91211610115578063368ed9121461024457806338b44934146102605780633a31f6a2146102905780633e97b43f146102ac57806346904840146102df5780634e1273f4146102fd57610157565b8062fdd58e1461015c57806301ffc9a71461018c5780630e89341c146101bc57806324a9d853146101ec5780632eb2c2d61461020a5780633013ce2914610226575b600080fd5b61017660048036038101906101719190612993565b610499565b60405161018391906129e2565b60405180910390f35b6101a660048036038101906101a19190612a55565b6104f3565b6040516101b39190612a9d565b60405180910390f35b6101d660048036038101906101d19190612ab8565b6105d5565b6040516101e39190612b75565b60405180910390f35b6101f461069c565b60405161020191906129e2565b60405180910390f35b610224600480360381019061021f9190612d94565b6106a2565b005b61022e61074a565b60405161023b9190612ec2565b60405180910390f35b61025e60048036038101906102599190612edd565b61076e565b005b61027a60048036038101906102759190612f78565b61097d565b60405161028791906129e2565b60405180910390f35b6102aa60048036038101906102a59190612fec565b610bba565b005b6102c660048036038101906102c19190612ab8565b610cb7565b6040516102d69493929190613048565b60405180910390f35b6102e7610d14565b6040516102f4919061308d565b60405180910390f35b6103176004803603810190610312919061316b565b610d3a565b60405161032491906132a1565b60405180910390f35b610347600480360381019061034291906132ef565b610e43565b005b610363600480360381019061035e9190612fec565b610fa0565b005b61037f600480360381019061037a9190612edd565b6110fe565b005b61038961158f565b005b6103936115a3565b6040516103a0919061308d565b60405180910390f35b6103c360048036038101906103be919061332f565b6115cd565b005b6103df60048036038101906103da919061336f565b6115e3565b6040516103ee9392919061339c565b60405180910390f35b610411600480360381019061040c9190612993565b6116c2565b005b61042d600480360381019061042891906133da565b611803565b60405161043a9190612a9d565b60405180910390f35b61045d6004803603810190610458919061341a565b611897565b005b6104796004803603810190610474919061336f565b61193f565b005b6104836119c5565b60405161049091906129e2565b60405180910390f35b600080600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105be57507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806105ce57506105cd826119cb565b5b9050919050565b606060006009600084815260200190815260200160002080546105f7906134e0565b80601f0160208091040260200160405190810160405280929190818152602001828054610623906134e0565b80156106705780601f1061064557610100808354040283529160200191610670565b820191906000526020600020905b81548152906001019060200180831161065357829003601f168201915b5050505050905060008151111561068a5780915050610697565b61069383611a35565b9150505b919050565b60055481565b60006106ac611ac9565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156106f157506106ef8682611803565b155b156107355780866040517fe237d92200000000000000000000000000000000000000000000000000000000815260040161072c929190613511565b60405180910390fd5b6107428686868686611ad1565b505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600081116107b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a890613586565b60405180910390fd5b6000600760008481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16036108cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c2906135f2565b60405180910390fd5b600081604001511461091e578060400151421061091d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109149061365e565b60405180910390fd5b5b610929338484611bc9565b3373ffffffffffffffffffffffffffffffffffffffff16837fb757d79c84afbc340d26d38a931274e3ec0c57f9bed689c3d6c4fa29843d89c68460405161097091906129e2565b60405180910390a3505050565b600080600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff16610a12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a09906136ca565b60405180910390fd5b60008611610a55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a4c90613736565b60405180910390fd5b60086000815480929190610a6890613785565b91905055915060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001878152602001868152602001600115158152506007600084815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083151502179055509050508383600960008581526020019081526020016000209182610b5b92919061397a565b503373ffffffffffffffffffffffffffffffffffffffff16827ff71916d31f2184254612f50e081534143bd9610b0f646139fe4f80d81aa965f688888888604051610ba99493929190613a77565b60405180910390a350949350505050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff16610c4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4590613b03565b60405180910390fd5b8282826001019182610c6192919061397a565b503373ffffffffffffffffffffffffffffffffffffffff167f831068e55d7ae2d5be9ffa6339c09ab5244e80a8e4d32bebfb4e6a24de67c6a58484604051610caa929190613b23565b60405180910390a2505050565b60076020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030160009054906101000a900460ff16905084565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60608151835114610d8657815183516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401610d7d929190613b47565b60405180910390fd5b6000835167ffffffffffffffff811115610da357610da2612b9c565b5b604051908082528060200260200182016040528015610dd15781602001602082028036833780820191505090505b50905060005b8451811015610e3857610e0e610df68287611c7090919063ffffffff16565b610e098387611c8490919063ffffffff16565b610499565b828281518110610e2157610e20613b70565b5b602002602001018181525050806001019050610dd7565b508091505092915050565b6000600760008481526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610eed576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee4906135f2565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f7f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f7690613beb565b60405180910390fd5b818160030160006101000a81548160ff021916908315150217905550505050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff1615611035576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102c90613c57565b60405180910390fd5b60018160000160006101000a81548160ff021916908315150217905550338160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082828260010191826110a892919061397a565b503373ffffffffffffffffffffffffffffffffffffffff167f160d4f1baa5abe6346266de469621d777ce8d4ed54db1ecdeae78b47bad7faa584846040516110f1929190613b23565b60405180910390a2505050565b60008111611141576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161113890613586565b60405180910390fd5b6000600760008481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff160361125b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611252906135f2565b60405180910390fd5b806060015161129f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129690613cc3565b60405180910390fd5b60008160400151146112f257806040015142106112f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e89061365e565b60405180910390fd5b5b60008282602001516113049190613ce3565b90506000612710600554836113199190613ce3565b6113239190613d54565b9050600081836113339190613d85565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd33600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856040518463ffffffff1660e01b81526004016113b493929190613db9565b6020604051808303816000875af11580156113d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113f79190613e05565b611436576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142d90613e7e565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd338660000151846040518463ffffffff1660e01b815260040161149793929190613db9565b6020604051808303816000875af11580156114b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114da9190613e05565b611519576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151090613eea565b60405180910390fd5b61153433878760405180602001604052806000815250611c98565b3373ffffffffffffffffffffffffffffffffffffffff16867f980121843a2c17bb01271383354b0885a75c2f9928949cc68247390396361ef187868660405161157f93929190613f0a565b60405180910390a3505050505050565b611597611d31565b6115a16000611db8565b565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6115df6115d8611ac9565b8383611e7e565b5050565b60066020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461163f906134e0565b80601f016020809104026020016040519081016040528092919081815260200182805461166b906134e0565b80156116b85780601f1061168d576101008083540402835291602001916116b8565b820191906000526020600020905b81548152906001019060200180831161169b57829003601f168201915b5050505050905083565b6116ca611d31565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611739576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161173090613f8d565b60405180910390fd5b6103e881111561177e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161177590613ff9565b60405180910390fd5b81600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806005819055507f7cfad8b150be9751a5386cc4e0f549618032ff63d14fab4f77cd4b0aaaedc24281836040516117f7929190614019565b60405180910390a15050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60006118a1611ac9565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156118e657506118e48682611803565b155b1561192a5780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401611921929190613511565b60405180910390fd5b6119378686868686611fee565b505050505050565b611947611d31565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036119b95760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016119b0919061308d565b60405180910390fd5b6119c281611db8565b50565b60085481565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b606060028054611a44906134e0565b80601f0160208091040260200160405190810160405280929190818152602001828054611a70906134e0565b8015611abd5780601f10611a9257610100808354040283529160200191611abd565b820191906000526020600020905b815481529060010190602001808311611aa057829003601f168201915b50505050509050919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603611b435760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401611b3a919061308d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603611bb55760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401611bac919061308d565b60405180910390fd5b611bc285858585856120f9565b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611c3b5760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401611c32919061308d565b60405180910390fd5b600080611c4884846121ab565b91509150611c698560008484604051806020016040528060008152506120f9565b5050505050565b600060208202602084010151905092915050565b600060208202602084010151905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603611d0a5760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401611d01919061308d565b60405180910390fd5b600080611d1785856121ab565b91509150611d296000878484876120f9565b505050505050565b611d39611ac9565b73ffffffffffffffffffffffffffffffffffffffff16611d576115a3565b73ffffffffffffffffffffffffffffffffffffffff1614611db657611d7a611ac9565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401611dad919061308d565b60405180910390fd5b565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611ef05760006040517fced3e100000000000000000000000000000000000000000000000000000000008152600401611ee7919061308d565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611fe19190612a9d565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036120605760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612057919061308d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036120d25760006040517f01a835140000000000000000000000000000000000000000000000000000000081526004016120c9919061308d565b60405180910390fd5b6000806120df85856121ab565b915091506120f087878484876120f9565b50505050505050565b612105858585856121db565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146121a4576000612143611ac9565b90506001845103612193576000612164600086611c8490919063ffffffff16565b9050600061217c600086611c8490919063ffffffff16565b905061218c838989858589612583565b50506121a2565b6121a1818787878787612737565b5b505b5050505050565b60608060405191506001825283602083015260408201905060018152826020820152604081016040529250929050565b805182511461222557815181516040517f5b05999100000000000000000000000000000000000000000000000000000000815260040161221c929190613b47565b60405180910390fd5b600061222f611ac9565b905060005b835181101561243e5760006122528286611c8490919063ffffffff16565b905060006122698386611c8490919063ffffffff16565b9050600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff161461239657600080600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561233e57888183856040517f03dee4c50000000000000000000000000000000000000000000000000000000081526004016123359493929190614042565b60405180910390fd5b81810360008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614612431578060008084815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546124299190614087565b925050819055505b5050806001019050612234565b5060018351036124fd57600061245e600085611c8490919063ffffffff16565b90506000612476600085611c8490919063ffffffff16565b90508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6285856040516124ee929190613b47565b60405180910390a4505061257c565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb86866040516125739291906140bb565b60405180910390a45b5050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b111561272f578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016125e4959493929190614147565b6020604051808303816000875af192505050801561262057506040513d601f19601f8201168201806040525081019061261d91906141b6565b60015b6126a4573d8060008114612650576040519150601f19603f3d011682016040523d82523d6000602084013e612655565b606091505b50600081510361269c57846040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612693919061308d565b60405180910390fd5b805160208201fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461272d57846040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612724919061308d565b60405180910390fd5b505b505050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b11156128e3578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b81526004016127989594939291906141e3565b6020604051808303816000875af19250505080156127d457506040513d601f19601f820116820180604052508101906127d191906141b6565b60015b612858573d8060008114612804576040519150601f19603f3d011682016040523d82523d6000602084013e612809565b606091505b50600081510361285057846040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612847919061308d565b60405180910390fd5b805160208201fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146128e157846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016128d8919061308d565b60405180910390fd5b505b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061292a826128ff565b9050919050565b61293a8161291f565b811461294557600080fd5b50565b60008135905061295781612931565b92915050565b6000819050919050565b6129708161295d565b811461297b57600080fd5b50565b60008135905061298d81612967565b92915050565b600080604083850312156129aa576129a96128f5565b5b60006129b885828601612948565b92505060206129c98582860161297e565b9150509250929050565b6129dc8161295d565b82525050565b60006020820190506129f760008301846129d3565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612a32816129fd565b8114612a3d57600080fd5b50565b600081359050612a4f81612a29565b92915050565b600060208284031215612a6b57612a6a6128f5565b5b6000612a7984828501612a40565b91505092915050565b60008115159050919050565b612a9781612a82565b82525050565b6000602082019050612ab26000830184612a8e565b92915050565b600060208284031215612ace57612acd6128f5565b5b6000612adc8482850161297e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612b1f578082015181840152602081019050612b04565b60008484015250505050565b6000601f19601f8301169050919050565b6000612b4782612ae5565b612b518185612af0565b9350612b61818560208601612b01565b612b6a81612b2b565b840191505092915050565b60006020820190508181036000830152612b8f8184612b3c565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b612bd482612b2b565b810181811067ffffffffffffffff82111715612bf357612bf2612b9c565b5b80604052505050565b6000612c066128eb565b9050612c128282612bcb565b919050565b600067ffffffffffffffff821115612c3257612c31612b9c565b5b602082029050602081019050919050565b600080fd5b6000612c5b612c5684612c17565b612bfc565b90508083825260208201905060208402830185811115612c7e57612c7d612c43565b5b835b81811015612ca75780612c93888261297e565b845260208401935050602081019050612c80565b5050509392505050565b600082601f830112612cc657612cc5612b97565b5b8135612cd6848260208601612c48565b91505092915050565b600080fd5b600067ffffffffffffffff821115612cff57612cfe612b9c565b5b612d0882612b2b565b9050602081019050919050565b82818337600083830152505050565b6000612d37612d3284612ce4565b612bfc565b905082815260208101848484011115612d5357612d52612cdf565b5b612d5e848285612d15565b509392505050565b600082601f830112612d7b57612d7a612b97565b5b8135612d8b848260208601612d24565b91505092915050565b600080600080600060a08688031215612db057612daf6128f5565b5b6000612dbe88828901612948565b9550506020612dcf88828901612948565b945050604086013567ffffffffffffffff811115612df057612def6128fa565b5b612dfc88828901612cb1565b935050606086013567ffffffffffffffff811115612e1d57612e1c6128fa565b5b612e2988828901612cb1565b925050608086013567ffffffffffffffff811115612e4a57612e496128fa565b5b612e5688828901612d66565b9150509295509295909350565b6000819050919050565b6000612e88612e83612e7e846128ff565b612e63565b6128ff565b9050919050565b6000612e9a82612e6d565b9050919050565b6000612eac82612e8f565b9050919050565b612ebc81612ea1565b82525050565b6000602082019050612ed76000830184612eb3565b92915050565b60008060408385031215612ef457612ef36128f5565b5b6000612f028582860161297e565b9250506020612f138582860161297e565b9150509250929050565b600080fd5b60008083601f840112612f3857612f37612b97565b5b8235905067ffffffffffffffff811115612f5557612f54612f1d565b5b602083019150836001820283011115612f7157612f70612c43565b5b9250929050565b60008060008060608587031215612f9257612f916128f5565b5b6000612fa08782880161297e565b9450506020612fb18782880161297e565b935050604085013567ffffffffffffffff811115612fd257612fd16128fa565b5b612fde87828801612f22565b925092505092959194509250565b60008060208385031215613003576130026128f5565b5b600083013567ffffffffffffffff811115613021576130206128fa565b5b61302d85828601612f22565b92509250509250929050565b6130428161291f565b82525050565b600060808201905061305d6000830187613039565b61306a60208301866129d3565b61307760408301856129d3565b6130846060830184612a8e565b95945050505050565b60006020820190506130a26000830184613039565b92915050565b600067ffffffffffffffff8211156130c3576130c2612b9c565b5b602082029050602081019050919050565b60006130e76130e2846130a8565b612bfc565b9050808382526020820190506020840283018581111561310a57613109612c43565b5b835b81811015613133578061311f8882612948565b84526020840193505060208101905061310c565b5050509392505050565b600082601f83011261315257613151612b97565b5b81356131628482602086016130d4565b91505092915050565b60008060408385031215613182576131816128f5565b5b600083013567ffffffffffffffff8111156131a05761319f6128fa565b5b6131ac8582860161313d565b925050602083013567ffffffffffffffff8111156131cd576131cc6128fa565b5b6131d985828601612cb1565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6132188161295d565b82525050565b600061322a838361320f565b60208301905092915050565b6000602082019050919050565b600061324e826131e3565b61325881856131ee565b9350613263836131ff565b8060005b8381101561329457815161327b888261321e565b975061328683613236565b925050600181019050613267565b5085935050505092915050565b600060208201905081810360008301526132bb8184613243565b905092915050565b6132cc81612a82565b81146132d757600080fd5b50565b6000813590506132e9816132c3565b92915050565b60008060408385031215613306576133056128f5565b5b60006133148582860161297e565b9250506020613325858286016132da565b9150509250929050565b60008060408385031215613346576133456128f5565b5b600061335485828601612948565b9250506020613365858286016132da565b9150509250929050565b600060208284031215613385576133846128f5565b5b600061339384828501612948565b91505092915050565b60006060820190506133b16000830186612a8e565b6133be6020830185613039565b81810360408301526133d08184612b3c565b9050949350505050565b600080604083850312156133f1576133f06128f5565b5b60006133ff85828601612948565b925050602061341085828601612948565b9150509250929050565b600080600080600060a08688031215613436576134356128f5565b5b600061344488828901612948565b955050602061345588828901612948565b94505060406134668882890161297e565b93505060606134778882890161297e565b925050608086013567ffffffffffffffff811115613498576134976128fa565b5b6134a488828901612d66565b9150509295509295909350565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806134f857607f821691505b60208210810361350b5761350a6134b1565b5b50919050565b60006040820190506135266000830185613039565b6135336020830184613039565b9392505050565b7f416d6f756e74203d203000000000000000000000000000000000000000000000600082015250565b6000613570600a83612af0565b915061357b8261353a565b602082019050919050565b6000602082019050818103600083015261359f81613563565b9050919050565b7f566f7563686572206e6f7420666f756e64000000000000000000000000000000600082015250565b60006135dc601183612af0565b91506135e7826135a6565b602082019050919050565b6000602082019050818103600083015261360b816135cf565b9050919050565b7f566f756368657220657870697265640000000000000000000000000000000000600082015250565b6000613648600f83612af0565b915061365382613612565b602082019050919050565b600060208201905081810360008301526136778161363b565b9050919050565b7f4e6f74206120627573696e657373000000000000000000000000000000000000600082015250565b60006136b4600e83612af0565b91506136bf8261367e565b602082019050919050565b600060208201905081810360008301526136e3816136a7565b9050919050565b7f5072696365206d757374206265203e2030000000000000000000000000000000600082015250565b6000613720601183612af0565b915061372b826136ea565b602082019050919050565b6000602082019050818103600083015261374f81613713565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006137908261295d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036137c2576137c1613756565b5b600182019050919050565b600082905092915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261383a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826137fd565b61384486836137fd565b95508019841693508086168417925050509392505050565b600061387761387261386d8461295d565b612e63565b61295d565b9050919050565b6000819050919050565b6138918361385c565b6138a561389d8261387e565b84845461380a565b825550505050565b600090565b6138ba6138ad565b6138c5818484613888565b505050565b5b818110156138e9576138de6000826138b2565b6001810190506138cb565b5050565b601f82111561392e576138ff816137d8565b613908846137ed565b81016020851015613917578190505b61392b613923856137ed565b8301826138ca565b50505b505050565b600082821c905092915050565b600061395160001984600802613933565b1980831691505092915050565b600061396a8383613940565b9150826002028217905092915050565b61398483836137cd565b67ffffffffffffffff81111561399d5761399c612b9c565b5b6139a782546134e0565b6139b28282856138ed565b6000601f8311600181146139e157600084156139cf578287013590505b6139d9858261395e565b865550613a41565b601f1984166139ef866137d8565b60005b82811015613a17578489013582556001820191506020850194506020810190506139f2565b86831015613a345784890135613a30601f891682613940565b8355505b6001600288020188555050505b50505050505050565b6000613a568385612af0565b9350613a63838584612d15565b613a6c83612b2b565b840190509392505050565b6000606082019050613a8c60008301876129d3565b613a9960208301866129d3565b8181036040830152613aac818486613a4a565b905095945050505050565b7f4e6f742072656769737465726564000000000000000000000000000000000000600082015250565b6000613aed600e83612af0565b9150613af882613ab7565b602082019050919050565b60006020820190508181036000830152613b1c81613ae0565b9050919050565b60006020820190508181036000830152613b3e818486613a4a565b90509392505050565b6000604082019050613b5c60008301856129d3565b613b6960208301846129d3565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e6f7420766f7563686572206f776e6572000000000000000000000000000000600082015250565b6000613bd5601183612af0565b9150613be082613b9f565b602082019050919050565b60006020820190508181036000830152613c0481613bc8565b9050919050565b7f416c726561647920726567697374657265640000000000000000000000000000600082015250565b6000613c41601283612af0565b9150613c4c82613c0b565b602082019050919050565b60006020820190508181036000830152613c7081613c34565b9050919050565b7f566f756368657220696e61637469766500000000000000000000000000000000600082015250565b6000613cad601083612af0565b9150613cb882613c77565b602082019050919050565b60006020820190508181036000830152613cdc81613ca0565b9050919050565b6000613cee8261295d565b9150613cf98361295d565b9250828202613d078161295d565b91508282048414831517613d1e57613d1d613756565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000613d5f8261295d565b9150613d6a8361295d565b925082613d7a57613d79613d25565b5b828204905092915050565b6000613d908261295d565b9150613d9b8361295d565b9250828203905081811115613db357613db2613756565b5b92915050565b6000606082019050613dce6000830186613039565b613ddb6020830185613039565b613de860408301846129d3565b949350505050565b600081519050613dff816132c3565b92915050565b600060208284031215613e1b57613e1a6128f5565b5b6000613e2984828501613df0565b91505092915050565b7f466565207472616e73666572206661696c656400000000000000000000000000600082015250565b6000613e68601383612af0565b9150613e7382613e32565b602082019050919050565b60006020820190508181036000830152613e9781613e5b565b9050919050565b7f427573696e657373207472616e73666572206661696c65640000000000000000600082015250565b6000613ed4601883612af0565b9150613edf82613e9e565b602082019050919050565b60006020820190508181036000830152613f0381613ec7565b9050919050565b6000606082019050613f1f60008301866129d3565b613f2c60208301856129d3565b613f3960408301846129d3565b949350505050565b7f496e76616c69642066656520726563697069656e740000000000000000000000600082015250565b6000613f77601583612af0565b9150613f8282613f41565b602082019050919050565b60006020820190508181036000830152613fa681613f6a565b9050919050565b7f46656520746f6f20686967680000000000000000000000000000000000000000600082015250565b6000613fe3600c83612af0565b9150613fee82613fad565b602082019050919050565b6000602082019050818103600083015261401281613fd6565b9050919050565b600060408201905061402e60008301856129d3565b61403b6020830184613039565b9392505050565b60006080820190506140576000830187613039565b61406460208301866129d3565b61407160408301856129d3565b61407e60608301846129d3565b95945050505050565b60006140928261295d565b915061409d8361295d565b92508282019050808211156140b5576140b4613756565b5b92915050565b600060408201905081810360008301526140d58185613243565b905081810360208301526140e98184613243565b90509392505050565b600081519050919050565b600082825260208201905092915050565b6000614119826140f2565b61412381856140fd565b9350614133818560208601612b01565b61413c81612b2b565b840191505092915050565b600060a08201905061415c6000830188613039565b6141696020830187613039565b61417660408301866129d3565b61418360608301856129d3565b8181036080830152614195818461410e565b90509695505050505050565b6000815190506141b081612a29565b92915050565b6000602082840312156141cc576141cb6128f5565b5b60006141da848285016141a1565b91505092915050565b600060a0820190506141f86000830188613039565b6142056020830187613039565b81810360408301526142178186613243565b9050818103606083015261422b8185613243565b9050818103608083015261423f818461410e565b9050969550505050505056fea2646970667358221220de2b93adad8bd1d260b9fb2d8e0dfc5c1bee2568bb8b781d2ace0800ce5a4a0f64736f6c634300081c0033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101575760003560e01c80635f5a8200116100c3578063b31e26e41161007c578063b31e26e4146103c5578063e07a3111146103f7578063e985e9c514610413578063f242432a14610443578063f2fde38b1461045f578063fe7c7bcf1461047b57610157565b80635f5a82001461032d57806360e7f7d1146103495780636ab1507114610365578063715018a6146103815780638da5cb5b1461038b578063a22cb465146103a957610157565b8063368ed91211610115578063368ed9121461024457806338b44934146102605780633a31f6a2146102905780633e97b43f146102ac57806346904840146102df5780634e1273f4146102fd57610157565b8062fdd58e1461015c57806301ffc9a71461018c5780630e89341c146101bc57806324a9d853146101ec5780632eb2c2d61461020a5780633013ce2914610226575b600080fd5b61017660048036038101906101719190612993565b610499565b60405161018391906129e2565b60405180910390f35b6101a660048036038101906101a19190612a55565b6104f3565b6040516101b39190612a9d565b60405180910390f35b6101d660048036038101906101d19190612ab8565b6105d5565b6040516101e39190612b75565b60405180910390f35b6101f461069c565b60405161020191906129e2565b60405180910390f35b610224600480360381019061021f9190612d94565b6106a2565b005b61022e61074a565b60405161023b9190612ec2565b60405180910390f35b61025e60048036038101906102599190612edd565b61076e565b005b61027a60048036038101906102759190612f78565b61097d565b60405161028791906129e2565b60405180910390f35b6102aa60048036038101906102a59190612fec565b610bba565b005b6102c660048036038101906102c19190612ab8565b610cb7565b6040516102d69493929190613048565b60405180910390f35b6102e7610d14565b6040516102f4919061308d565b60405180910390f35b6103176004803603810190610312919061316b565b610d3a565b60405161032491906132a1565b60405180910390f35b610347600480360381019061034291906132ef565b610e43565b005b610363600480360381019061035e9190612fec565b610fa0565b005b61037f600480360381019061037a9190612edd565b6110fe565b005b61038961158f565b005b6103936115a3565b6040516103a0919061308d565b60405180910390f35b6103c360048036038101906103be919061332f565b6115cd565b005b6103df60048036038101906103da919061336f565b6115e3565b6040516103ee9392919061339c565b60405180910390f35b610411600480360381019061040c9190612993565b6116c2565b005b61042d600480360381019061042891906133da565b611803565b60405161043a9190612a9d565b60405180910390f35b61045d6004803603810190610458919061341a565b611897565b005b6104796004803603810190610474919061336f565b61193f565b005b6104836119c5565b60405161049091906129e2565b60405180910390f35b600080600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105be57507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806105ce57506105cd826119cb565b5b9050919050565b606060006009600084815260200190815260200160002080546105f7906134e0565b80601f0160208091040260200160405190810160405280929190818152602001828054610623906134e0565b80156106705780601f1061064557610100808354040283529160200191610670565b820191906000526020600020905b81548152906001019060200180831161065357829003601f168201915b5050505050905060008151111561068a5780915050610697565b61069383611a35565b9150505b919050565b60055481565b60006106ac611ac9565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156106f157506106ef8682611803565b155b156107355780866040517fe237d92200000000000000000000000000000000000000000000000000000000815260040161072c929190613511565b60405180910390fd5b6107428686868686611ad1565b505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600081116107b1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a890613586565b60405180910390fd5b6000600760008481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff16036108cb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c2906135f2565b60405180910390fd5b600081604001511461091e578060400151421061091d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109149061365e565b60405180910390fd5b5b610929338484611bc9565b3373ffffffffffffffffffffffffffffffffffffffff16837fb757d79c84afbc340d26d38a931274e3ec0c57f9bed689c3d6c4fa29843d89c68460405161097091906129e2565b60405180910390a3505050565b600080600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff16610a12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a09906136ca565b60405180910390fd5b60008611610a55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a4c90613736565b60405180910390fd5b60086000815480929190610a6890613785565b91905055915060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001878152602001868152602001600115158152506007600084815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083151502179055509050508383600960008581526020019081526020016000209182610b5b92919061397a565b503373ffffffffffffffffffffffffffffffffffffffff16827ff71916d31f2184254612f50e081534143bd9610b0f646139fe4f80d81aa965f688888888604051610ba99493929190613a77565b60405180910390a350949350505050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff16610c4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4590613b03565b60405180910390fd5b8282826001019182610c6192919061397a565b503373ffffffffffffffffffffffffffffffffffffffff167f831068e55d7ae2d5be9ffa6339c09ab5244e80a8e4d32bebfb4e6a24de67c6a58484604051610caa929190613b23565b60405180910390a2505050565b60076020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030160009054906101000a900460ff16905084565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60608151835114610d8657815183516040517f5b059991000000000000000000000000000000000000000000000000000000008152600401610d7d929190613b47565b60405180910390fd5b6000835167ffffffffffffffff811115610da357610da2612b9c565b5b604051908082528060200260200182016040528015610dd15781602001602082028036833780820191505090505b50905060005b8451811015610e3857610e0e610df68287611c7090919063ffffffff16565b610e098387611c8490919063ffffffff16565b610499565b828281518110610e2157610e20613b70565b5b602002602001018181525050806001019050610dd7565b508091505092915050565b6000600760008481526020019081526020016000209050600073ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610eed576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ee4906135f2565b60405180910390fd5b8060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f7f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f7690613beb565b60405180910390fd5b818160030160006101000a81548160ff021916908315150217905550505050565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff1615611035576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102c90613c57565b60405180910390fd5b60018160000160006101000a81548160ff021916908315150217905550338160000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082828260010191826110a892919061397a565b503373ffffffffffffffffffffffffffffffffffffffff167f160d4f1baa5abe6346266de469621d777ce8d4ed54db1ecdeae78b47bad7faa584846040516110f1929190613b23565b60405180910390a2505050565b60008111611141576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161113890613586565b60405180910390fd5b6000600760008481526020019081526020016000206040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481526020016003820160009054906101000a900460ff1615151515815250509050600073ffffffffffffffffffffffffffffffffffffffff16816000015173ffffffffffffffffffffffffffffffffffffffff160361125b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611252906135f2565b60405180910390fd5b806060015161129f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129690613cc3565b60405180910390fd5b60008160400151146112f257806040015142106112f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e89061365e565b60405180910390fd5b5b60008282602001516113049190613ce3565b90506000612710600554836113199190613ce3565b6113239190613d54565b9050600081836113339190613d85565b90507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd33600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16856040518463ffffffff1660e01b81526004016113b493929190613db9565b6020604051808303816000875af11580156113d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113f79190613e05565b611436576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142d90613e7e565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd338660000151846040518463ffffffff1660e01b815260040161149793929190613db9565b6020604051808303816000875af11580156114b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114da9190613e05565b611519576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151090613eea565b60405180910390fd5b61153433878760405180602001604052806000815250611c98565b3373ffffffffffffffffffffffffffffffffffffffff16867f980121843a2c17bb01271383354b0885a75c2f9928949cc68247390396361ef187868660405161157f93929190613f0a565b60405180910390a3505050505050565b611597611d31565b6115a16000611db8565b565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6115df6115d8611ac9565b8383611e7e565b5050565b60066020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600101805461163f906134e0565b80601f016020809104026020016040519081016040528092919081815260200182805461166b906134e0565b80156116b85780601f1061168d576101008083540402835291602001916116b8565b820191906000526020600020905b81548152906001019060200180831161169b57829003601f168201915b5050505050905083565b6116ca611d31565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611739576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161173090613f8d565b60405180910390fd5b6103e881111561177e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161177590613ff9565b60405180910390fd5b81600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806005819055507f7cfad8b150be9751a5386cc4e0f549618032ff63d14fab4f77cd4b0aaaedc24281836040516117f7929190614019565b60405180910390a15050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60006118a1611ac9565b90508073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141580156118e657506118e48682611803565b155b1561192a5780866040517fe237d922000000000000000000000000000000000000000000000000000000008152600401611921929190613511565b60405180910390fd5b6119378686868686611fee565b505050505050565b611947611d31565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036119b95760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016119b0919061308d565b60405180910390fd5b6119c281611db8565b50565b60085481565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b606060028054611a44906134e0565b80601f0160208091040260200160405190810160405280929190818152602001828054611a70906134e0565b8015611abd5780601f10611a9257610100808354040283529160200191611abd565b820191906000526020600020905b815481529060010190602001808311611aa057829003601f168201915b50505050509050919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603611b435760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401611b3a919061308d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603611bb55760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401611bac919061308d565b60405180910390fd5b611bc285858585856120f9565b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611c3b5760006040517f01a83514000000000000000000000000000000000000000000000000000000008152600401611c32919061308d565b60405180910390fd5b600080611c4884846121ab565b91509150611c698560008484604051806020016040528060008152506120f9565b5050505050565b600060208202602084010151905092915050565b600060208202602084010151905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603611d0a5760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401611d01919061308d565b60405180910390fd5b600080611d1785856121ab565b91509150611d296000878484876120f9565b505050505050565b611d39611ac9565b73ffffffffffffffffffffffffffffffffffffffff16611d576115a3565b73ffffffffffffffffffffffffffffffffffffffff1614611db657611d7a611ac9565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401611dad919061308d565b60405180910390fd5b565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611ef05760006040517fced3e100000000000000000000000000000000000000000000000000000000008152600401611ee7919061308d565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051611fe19190612a9d565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036120605760006040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612057919061308d565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036120d25760006040517f01a835140000000000000000000000000000000000000000000000000000000081526004016120c9919061308d565b60405180910390fd5b6000806120df85856121ab565b915091506120f087878484876120f9565b50505050505050565b612105858585856121db565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146121a4576000612143611ac9565b90506001845103612193576000612164600086611c8490919063ffffffff16565b9050600061217c600086611c8490919063ffffffff16565b905061218c838989858589612583565b50506121a2565b6121a1818787878787612737565b5b505b5050505050565b60608060405191506001825283602083015260408201905060018152826020820152604081016040529250929050565b805182511461222557815181516040517f5b05999100000000000000000000000000000000000000000000000000000000815260040161221c929190613b47565b60405180910390fd5b600061222f611ac9565b905060005b835181101561243e5760006122528286611c8490919063ffffffff16565b905060006122698386611c8490919063ffffffff16565b9050600073ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff161461239657600080600084815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561233e57888183856040517f03dee4c50000000000000000000000000000000000000000000000000000000081526004016123359493929190614042565b60405180910390fd5b81810360008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614612431578060008084815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546124299190614087565b925050819055505b5050806001019050612234565b5060018351036124fd57600061245e600085611c8490919063ffffffff16565b90506000612476600085611c8490919063ffffffff16565b90508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6285856040516124ee929190613b47565b60405180910390a4505061257c565b8373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb86866040516125739291906140bb565b60405180910390a45b5050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b111561272f578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016125e4959493929190614147565b6020604051808303816000875af192505050801561262057506040513d601f19601f8201168201806040525081019061261d91906141b6565b60015b6126a4573d8060008114612650576040519150601f19603f3d011682016040523d82523d6000602084013e612655565b606091505b50600081510361269c57846040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612693919061308d565b60405180910390fd5b805160208201fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461272d57846040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612724919061308d565b60405180910390fd5b505b505050505050565b60008473ffffffffffffffffffffffffffffffffffffffff163b11156128e3578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b81526004016127989594939291906141e3565b6020604051808303816000875af19250505080156127d457506040513d601f19601f820116820180604052508101906127d191906141b6565b60015b612858573d8060008114612804576040519150601f19603f3d011682016040523d82523d6000602084013e612809565b606091505b50600081510361285057846040517f57f447ce000000000000000000000000000000000000000000000000000000008152600401612847919061308d565b60405180910390fd5b805160208201fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146128e157846040517f57f447ce0000000000000000000000000000000000000000000000000000000081526004016128d8919061308d565b60405180910390fd5b505b505050505050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061292a826128ff565b9050919050565b61293a8161291f565b811461294557600080fd5b50565b60008135905061295781612931565b92915050565b6000819050919050565b6129708161295d565b811461297b57600080fd5b50565b60008135905061298d81612967565b92915050565b600080604083850312156129aa576129a96128f5565b5b60006129b885828601612948565b92505060206129c98582860161297e565b9150509250929050565b6129dc8161295d565b82525050565b60006020820190506129f760008301846129d3565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612a32816129fd565b8114612a3d57600080fd5b50565b600081359050612a4f81612a29565b92915050565b600060208284031215612a6b57612a6a6128f5565b5b6000612a7984828501612a40565b91505092915050565b60008115159050919050565b612a9781612a82565b82525050565b6000602082019050612ab26000830184612a8e565b92915050565b600060208284031215612ace57612acd6128f5565b5b6000612adc8482850161297e565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612b1f578082015181840152602081019050612b04565b60008484015250505050565b6000601f19601f8301169050919050565b6000612b4782612ae5565b612b518185612af0565b9350612b61818560208601612b01565b612b6a81612b2b565b840191505092915050565b60006020820190508181036000830152612b8f8184612b3c565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b612bd482612b2b565b810181811067ffffffffffffffff82111715612bf357612bf2612b9c565b5b80604052505050565b6000612c066128eb565b9050612c128282612bcb565b919050565b600067ffffffffffffffff821115612c3257612c31612b9c565b5b602082029050602081019050919050565b600080fd5b6000612c5b612c5684612c17565b612bfc565b90508083825260208201905060208402830185811115612c7e57612c7d612c43565b5b835b81811015612ca75780612c93888261297e565b845260208401935050602081019050612c80565b5050509392505050565b600082601f830112612cc657612cc5612b97565b5b8135612cd6848260208601612c48565b91505092915050565b600080fd5b600067ffffffffffffffff821115612cff57612cfe612b9c565b5b612d0882612b2b565b9050602081019050919050565b82818337600083830152505050565b6000612d37612d3284612ce4565b612bfc565b905082815260208101848484011115612d5357612d52612cdf565b5b612d5e848285612d15565b509392505050565b600082601f830112612d7b57612d7a612b97565b5b8135612d8b848260208601612d24565b91505092915050565b600080600080600060a08688031215612db057612daf6128f5565b5b6000612dbe88828901612948565b9550506020612dcf88828901612948565b945050604086013567ffffffffffffffff811115612df057612def6128fa565b5b612dfc88828901612cb1565b935050606086013567ffffffffffffffff811115612e1d57612e1c6128fa565b5b612e2988828901612cb1565b925050608086013567ffffffffffffffff811115612e4a57612e496128fa565b5b612e5688828901612d66565b9150509295509295909350565b6000819050919050565b6000612e88612e83612e7e846128ff565b612e63565b6128ff565b9050919050565b6000612e9a82612e6d565b9050919050565b6000612eac82612e8f565b9050919050565b612ebc81612ea1565b82525050565b6000602082019050612ed76000830184612eb3565b92915050565b60008060408385031215612ef457612ef36128f5565b5b6000612f028582860161297e565b9250506020612f138582860161297e565b9150509250929050565b600080fd5b60008083601f840112612f3857612f37612b97565b5b8235905067ffffffffffffffff811115612f5557612f54612f1d565b5b602083019150836001820283011115612f7157612f70612c43565b5b9250929050565b60008060008060608587031215612f9257612f916128f5565b5b6000612fa08782880161297e565b9450506020612fb18782880161297e565b935050604085013567ffffffffffffffff811115612fd257612fd16128fa565b5b612fde87828801612f22565b925092505092959194509250565b60008060208385031215613003576130026128f5565b5b600083013567ffffffffffffffff811115613021576130206128fa565b5b61302d85828601612f22565b92509250509250929050565b6130428161291f565b82525050565b600060808201905061305d6000830187613039565b61306a60208301866129d3565b61307760408301856129d3565b6130846060830184612a8e565b95945050505050565b60006020820190506130a26000830184613039565b92915050565b600067ffffffffffffffff8211156130c3576130c2612b9c565b5b602082029050602081019050919050565b60006130e76130e2846130a8565b612bfc565b9050808382526020820190506020840283018581111561310a57613109612c43565b5b835b81811015613133578061311f8882612948565b84526020840193505060208101905061310c565b5050509392505050565b600082601f83011261315257613151612b97565b5b81356131628482602086016130d4565b91505092915050565b60008060408385031215613182576131816128f5565b5b600083013567ffffffffffffffff8111156131a05761319f6128fa565b5b6131ac8582860161313d565b925050602083013567ffffffffffffffff8111156131cd576131cc6128fa565b5b6131d985828601612cb1565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6132188161295d565b82525050565b600061322a838361320f565b60208301905092915050565b6000602082019050919050565b600061324e826131e3565b61325881856131ee565b9350613263836131ff565b8060005b8381101561329457815161327b888261321e565b975061328683613236565b925050600181019050613267565b5085935050505092915050565b600060208201905081810360008301526132bb8184613243565b905092915050565b6132cc81612a82565b81146132d757600080fd5b50565b6000813590506132e9816132c3565b92915050565b60008060408385031215613306576133056128f5565b5b60006133148582860161297e565b9250506020613325858286016132da565b9150509250929050565b60008060408385031215613346576133456128f5565b5b600061335485828601612948565b9250506020613365858286016132da565b9150509250929050565b600060208284031215613385576133846128f5565b5b600061339384828501612948565b91505092915050565b60006060820190506133b16000830186612a8e565b6133be6020830185613039565b81810360408301526133d08184612b3c565b9050949350505050565b600080604083850312156133f1576133f06128f5565b5b60006133ff85828601612948565b925050602061341085828601612948565b9150509250929050565b600080600080600060a08688031215613436576134356128f5565b5b600061344488828901612948565b955050602061345588828901612948565b94505060406134668882890161297e565b93505060606134778882890161297e565b925050608086013567ffffffffffffffff811115613498576134976128fa565b5b6134a488828901612d66565b9150509295509295909350565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806134f857607f821691505b60208210810361350b5761350a6134b1565b5b50919050565b60006040820190506135266000830185613039565b6135336020830184613039565b9392505050565b7f416d6f756e74203d203000000000000000000000000000000000000000000000600082015250565b6000613570600a83612af0565b915061357b8261353a565b602082019050919050565b6000602082019050818103600083015261359f81613563565b9050919050565b7f566f7563686572206e6f7420666f756e64000000000000000000000000000000600082015250565b60006135dc601183612af0565b91506135e7826135a6565b602082019050919050565b6000602082019050818103600083015261360b816135cf565b9050919050565b7f566f756368657220657870697265640000000000000000000000000000000000600082015250565b6000613648600f83612af0565b915061365382613612565b602082019050919050565b600060208201905081810360008301526136778161363b565b9050919050565b7f4e6f74206120627573696e657373000000000000000000000000000000000000600082015250565b60006136b4600e83612af0565b91506136bf8261367e565b602082019050919050565b600060208201905081810360008301526136e3816136a7565b9050919050565b7f5072696365206d757374206265203e2030000000000000000000000000000000600082015250565b6000613720601183612af0565b915061372b826136ea565b602082019050919050565b6000602082019050818103600083015261374f81613713565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006137908261295d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036137c2576137c1613756565b5b600182019050919050565b600082905092915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261383a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826137fd565b61384486836137fd565b95508019841693508086168417925050509392505050565b600061387761387261386d8461295d565b612e63565b61295d565b9050919050565b6000819050919050565b6138918361385c565b6138a561389d8261387e565b84845461380a565b825550505050565b600090565b6138ba6138ad565b6138c5818484613888565b505050565b5b818110156138e9576138de6000826138b2565b6001810190506138cb565b5050565b601f82111561392e576138ff816137d8565b613908846137ed565b81016020851015613917578190505b61392b613923856137ed565b8301826138ca565b50505b505050565b600082821c905092915050565b600061395160001984600802613933565b1980831691505092915050565b600061396a8383613940565b9150826002028217905092915050565b61398483836137cd565b67ffffffffffffffff81111561399d5761399c612b9c565b5b6139a782546134e0565b6139b28282856138ed565b6000601f8311600181146139e157600084156139cf578287013590505b6139d9858261395e565b865550613a41565b601f1984166139ef866137d8565b60005b82811015613a17578489013582556001820191506020850194506020810190506139f2565b86831015613a345784890135613a30601f891682613940565b8355505b6001600288020188555050505b50505050505050565b6000613a568385612af0565b9350613a63838584612d15565b613a6c83612b2b565b840190509392505050565b6000606082019050613a8c60008301876129d3565b613a9960208301866129d3565b8181036040830152613aac818486613a4a565b905095945050505050565b7f4e6f742072656769737465726564000000000000000000000000000000000000600082015250565b6000613aed600e83612af0565b9150613af882613ab7565b602082019050919050565b60006020820190508181036000830152613b1c81613ae0565b9050919050565b60006020820190508181036000830152613b3e818486613a4a565b90509392505050565b6000604082019050613b5c60008301856129d3565b613b6960208301846129d3565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e6f7420766f7563686572206f776e6572000000000000000000000000000000600082015250565b6000613bd5601183612af0565b9150613be082613b9f565b602082019050919050565b60006020820190508181036000830152613c0481613bc8565b9050919050565b7f416c726561647920726567697374657265640000000000000000000000000000600082015250565b6000613c41601283612af0565b9150613c4c82613c0b565b602082019050919050565b60006020820190508181036000830152613c7081613c34565b9050919050565b7f566f756368657220696e61637469766500000000000000000000000000000000600082015250565b6000613cad601083612af0565b9150613cb882613c77565b602082019050919050565b60006020820190508181036000830152613cdc81613ca0565b9050919050565b6000613cee8261295d565b9150613cf98361295d565b9250828202613d078161295d565b91508282048414831517613d1e57613d1d613756565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000613d5f8261295d565b9150613d6a8361295d565b925082613d7a57613d79613d25565b5b828204905092915050565b6000613d908261295d565b9150613d9b8361295d565b9250828203905081811115613db357613db2613756565b5b92915050565b6000606082019050613dce6000830186613039565b613ddb6020830185613039565b613de860408301846129d3565b949350505050565b600081519050613dff816132c3565b92915050565b600060208284031215613e1b57613e1a6128f5565b5b6000613e2984828501613df0565b91505092915050565b7f466565207472616e73666572206661696c656400000000000000000000000000600082015250565b6000613e68601383612af0565b9150613e7382613e32565b602082019050919050565b60006020820190508181036000830152613e9781613e5b565b9050919050565b7f427573696e657373207472616e73666572206661696c65640000000000000000600082015250565b6000613ed4601883612af0565b9150613edf82613e9e565b602082019050919050565b60006020820190508181036000830152613f0381613ec7565b9050919050565b6000606082019050613f1f60008301866129d3565b613f2c60208301856129d3565b613f3960408301846129d3565b949350505050565b7f496e76616c69642066656520726563697069656e740000000000000000000000600082015250565b6000613f77601583612af0565b9150613f8282613f41565b602082019050919050565b60006020820190508181036000830152613fa681613f6a565b9050919050565b7f46656520746f6f20686967680000000000000000000000000000000000000000600082015250565b6000613fe3600c83612af0565b9150613fee82613fad565b602082019050919050565b6000602082019050818103600083015261401281613fd6565b9050919050565b600060408201905061402e60008301856129d3565b61403b6020830184613039565b9392505050565b60006080820190506140576000830187613039565b61406460208301866129d3565b61407160408301856129d3565b61407e60608301846129d3565b95945050505050565b60006140928261295d565b915061409d8361295d565b92508282019050808211156140b5576140b4613756565b5b92915050565b600060408201905081810360008301526140d58185613243565b905081810360208301526140e98184613243565b90509392505050565b600081519050919050565b600082825260208201905092915050565b6000614119826140f2565b61412381856140fd565b9350614133818560208601612b01565b61413c81612b2b565b840191505092915050565b600060a08201905061415c6000830188613039565b6141696020830187613039565b61417660408301866129d3565b61418360608301856129d3565b8181036080830152614195818461410e565b90509695505050505050565b6000815190506141b081612a29565b92915050565b6000602082840312156141cc576141cb6128f5565b5b60006141da848285016141a1565b91505092915050565b600060a0820190506141f86000830188613039565b6142056020830187613039565b81810360408301526142178186613243565b9050818103606083015261422b8185613243565b9050818103608083015261423f818461410e565b9050969550505050505056fea2646970667358221220de2b93adad8bd1d260b9fb2d8e0dfc5c1bee2568bb8b781d2ace0800ce5a4a0f64736f6c634300081c0033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

] as const;
