export const GOLD_TOKEN_ABI = [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
 ];
  
  export const SILVER_TOKEN_ABI = [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
];
  
  export const BRONZE_TOKEN_ABI = [
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    }
   ];
  