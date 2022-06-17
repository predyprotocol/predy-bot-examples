/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  NettingLibTester,
  NettingLibTesterInterface,
} from "../NettingLibTester";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_productId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "delta0",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "delta1",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "gamma1",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "spotPrice",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "poolMarginRiskParam",
            type: "int256",
          },
        ],
        internalType: "struct NettingLib.AddMarginParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "addMargin",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_productId",
        type: "uint256",
      },
      {
        internalType: "int128",
        name: "_delta0",
        type: "int128",
      },
      {
        internalType: "int128",
        name: "_delta1",
        type: "int128",
      },
    ],
    name: "calculateWeightedDelta",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amountUsdc",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountUnderlying",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "futureWeight",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
        ],
        internalType: "struct NettingLib.CompleteParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "complete",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getInfo",
    outputs: [
      {
        components: [
          {
            internalType: "int256[2]",
            name: "amountsUsdc",
            type: "int256[2]",
          },
          {
            internalType: "uint256",
            name: "amountUnderlying",
            type: "uint256",
          },
        ],
        internalType: "struct NettingLib.Info",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_productId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "int256",
            name: "delta0",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "delta1",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "gamma1",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "spotPrice",
            type: "int256",
          },
          {
            internalType: "int256",
            name: "poolMarginRiskParam",
            type: "int256",
          },
        ],
        internalType: "struct NettingLib.AddMarginParams",
        name: "_params",
        type: "tuple",
      },
    ],
    name: "getRequiredMargin",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountUnderlying",
        type: "uint256",
      },
      {
        internalType: "int256[2]",
        name: "_deltas",
        type: "int256[2]",
      },
      {
        internalType: "int256",
        name: "_spotPrice",
        type: "int256",
      },
    ],
    name: "getRequiredTokenAmountsForHedge",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amountUsdc",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountUnderlying",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "futureWeight",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isLong",
            type: "bool",
          },
        ],
        internalType: "struct NettingLib.CompleteParams",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "info",
    outputs: [
      {
        internalType: "uint256",
        name: "amountUnderlying",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610e64806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80635a9b0b891161005b5780635a9b0b89146100d45780637690ba23146100e9578063b7a81a38146100fc578063c661e6561461011c5761007d565b80633225897514610082578063370158ea146100ab57806356059109146100b3575b600080fd5b610095610090366004610c52565b610131565b6040516100a29190610cd7565b60405180910390f35b610095610146565b6100c66100c1366004610c52565b61014c565b6040516100a2929190610ce0565b6100dc610166565b6040516100a29190610d1b565b6100956100f7366004610c17565b6101b6565b61010f61010a366004610b8a565b6101d3565b6040516100a29190610cee565b61012f61012a366004610b21565b6101e6565b005b600061013d83836101f4565b90505b92915050565b60025481565b60008061015b600085856102ba565b915091509250929050565b61016e610aa7565b604080516080810180835290916000918391820190839060029082845b81548152602001906001019080831161018b5750505050508152602001600282015481525050905090565b60006101c98484600f0b84600f0b610358565b90505b9392505050565b6101db610ac7565b6101c9848484610393565b6101f160008261044c565b50565b60008061020a8484600001518560200151610358565b9050600084600114156102525761024f64e8d4a5100061024986604001516102438860600151896080015161057490919063ffffffff16565b90610574565b9061061d565b90505b600061028d6305f5e10061024961028261027d61026e876106d5565b610277896106d5565b906106f2565b61074c565b606089015190610574565b90506102b06127106102498388608001516127100161057490919063ffffffff16565b9695505050505050565b60008060006102c985856101f4565b604080516080810180835292935061031992909189918391820190839060029082845b8154815260200190600101908083116102ec57505050505081526020016002820154815250508587610790565b9150610325818361081f565b925061033f8387876002811061033757fe5b015490610884565b86866002811061034b57fe5b0155509094909350915050565b6000806103658484610884565b905061038a662386f26fc1000061024961038361027d8989896108e9565b8490610574565b95945050505050565b61039b610ac7565b60006103a68561074c565b905060006103ce826103c887600160200201518860005b602002015190610884565b90610884565b6020860151600091820392506103e59087836103bd565b13156103f2578160000390505b600081136060840152610404816106d5565b60208401526305f5e1006104218561041b846106d5565b9061098a565b8161042857fe5b0483528451602086015161043e916000916108e9565b604084015250509392505050565b600061047a662386f26fc100006104748460400151856000015161098a90919063ffffffff16565b906109e3565b825190915060009061048c9083610a4a565b905060008360200151116104cc576040805162461bcd60e51b81526020600482015260026024820152614e3160f01b604482015290519081900360640190fd5b82606001511561052657602083015160028501546104e9916106f2565b60028501556105066104fa8361074c565b8560005b01549061081f565b845561051c6105148261074c565b8560016104fe565b846001015561056e565b6020830151600285015461053991610a4a565b600285015561055261054a8361074c565b856000610337565b84556105686105608261074c565b856001610337565b84600101555b50505050565b60008261058357506000610140565b826000191480156105975750600160ff1b82145b156105d35760405162461bcd60e51b8152600401808060200182810382526027815260200180610dbc6027913960400191505060405180910390fd5b828202828482816105e057fe5b051461013d5760405162461bcd60e51b8152600401808060200182810382526027815260200180610dbc6027913960400191505060405180910390fd5b600081610671576040805162461bcd60e51b815260206004820181905260248201527f5369676e6564536166654d6174683a206469766973696f6e206279207a65726f604482015290519081900360640190fd5b816000191480156106855750600160ff1b83145b156106c15760405162461bcd60e51b8152600401808060200182810382526021815260200180610d7a6021913960400191505060405180910390fd5b60008284816106cc57fe5b05949350505050565b6000808212156106e857816000036106ea565b815b90505b919050565b60008282018381101561013d576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6000600160ff1b82106106e85760405162461bcd60e51b8152600401808060200182810382526028815260200180610de36028913960400191505060405180910390fd5b6000806107b66305f5e1006102496107ab886020015161074c565b606088015190610574565b905060006107e6662386f26fc100006102496107df61027d60008a600001518b602001516108e9565b8590610574565b905083600114156107fe576107fb828261081f565b90505b600061081482886000015187600281106103bd57fe5b979650505050505050565b60008183038183128015906108345750838113155b80610849575060008312801561084957508381135b61013d5760405162461bcd60e51b8152600401808060200182810382526024815260200180610e0b6024913960400191505060405180910390fd5b60008282018183128015906108995750838112155b806108ae57506000831280156108ae57508381125b61013d5760405162461bcd60e51b8152600401808060200182810382526021815260200180610d596021913960400191505060405180910390fd5b6000806109016108f8846106d5565b610277866106d5565b9050806109125760009150506101cc565b846109375761092f81610474662386f26fc1000061041b886106d5565b9150506101cc565b84600114156109585761092f81610474662386f26fc1000061041b876106d5565b6040805162461bcd60e51b815260206004820152600260248201526104e360f41b604482015290519081900360640190fd5b60008261099957506000610140565b828202828482816109a657fe5b041461013d5760405162461bcd60e51b8152600401808060200182810382526021815260200180610d9b6021913960400191505060405180910390fd5b6000808211610a39576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381610a4257fe5b049392505050565b600082821115610aa1576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6040518060400160405280610aba610af1565b8152602001600081525090565b60405180608001604052806000815260200160008152602001600081526020016000151581525090565b60405180604001604052806002906020820280368337509192915050565b8035600f81900b81146106ed57600080fd5b600060808284031215610b32578081fd5b6040516080810181811067ffffffffffffffff82111715610b4f57fe5b806040525082358152602083013560208201526040830135604082015260608301358015158114610b7e578283fd5b60608201529392505050565b600080600060808486031215610b9e578182fd5b83359250602085603f860112610bb2578283fd5b6040516040810181811067ffffffffffffffff82111715610bcf57fe5b604052808683016060880189811115610be6578687fd5b865b6002811015610c0557823584529285019291850191600101610be8565b50969992985050943595509350505050565b600080600060608486031215610c2b578283fd5b83359250610c3b60208501610b0f565b9150610c4960408501610b0f565b90509250925092565b60008082840360c0811215610c65578283fd5b8335925060a0601f1982011215610c7a578182fd5b5060405160a0810181811067ffffffffffffffff82111715610c9857fe5b80604052506020840135815260408401356020820152606084013560408201526080840135606082015260a08401356080820152809150509250929050565b90815260200190565b918252602082015260400190565b81518152602080830151908201526040808301519082015260609182015115159181019190915260800190565b815160608201908260005b6002811015610d45578251825260209283019290910190600101610d26565b505050602083015160408301529291505056fe5369676e6564536166654d6174683a206164646974696f6e206f766572666c6f775369676e6564536166654d6174683a206469766973696f6e206f766572666c6f77536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775369676e6564536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7753616665436173743a2076616c756520646f65736e27742066697420696e20616e20696e743235365369676e6564536166654d6174683a207375627472616374696f6e206f766572666c6f77a264697066735822122039e882b8d0da72de40ab6d52c7c92e61f11e13faf956e553248ab3ff5866ab7464736f6c63430007060033";

export class NettingLibTester__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NettingLibTester> {
    return super.deploy(overrides || {}) as Promise<NettingLibTester>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): NettingLibTester {
    return super.attach(address) as NettingLibTester;
  }
  connect(signer: Signer): NettingLibTester__factory {
    return super.connect(signer) as NettingLibTester__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NettingLibTesterInterface {
    return new utils.Interface(_abi) as NettingLibTesterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NettingLibTester {
    return new Contract(address, _abi, signerOrProvider) as NettingLibTester;
  }
}