import React, { useState , useEffect} from "react";
import Web3 from "web3";
import { GOLD_TOKEN_ABI, SILVER_TOKEN_ABI, BRONZE_TOKEN_ABI } from "./abi";

// Token Contract Address 
const GOLD_TOKEN_ADDRESS = "0xbae86660f7e4c8bb8f13b1546131dbdfb20a51e7";
const SILVER_TOKEN_ADDRESS = "0xDC035401fF73d52432359Cb425270b830C6Ad99d";
const BRONZE_TOKEN_ADDRESS = "0xB995E61835aE71BBb0a89aA8bC265416Ca2F8df0";

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [authenticatedToken, setAuthenticatedToken] = useState(null);

   async function connect() {
    if (window.ethereum) {
      try { 
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
 
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Ethereum wallet not detected");
    }
  }

  // Authentication Protocol
  async function authenticate(tokenContractAddress, tokenContractABI) {
    if (!web3) {
      console.error("Not connected to Wallet");
      return;
    }

    // Load the token contract instance
    const tokenContract = new web3.eth.Contract(
      tokenContractABI,
      tokenContractAddress
    );

    // Check if the user has any tokens
    const balance = await tokenContract.methods.balanceOf(account).call();
    if (balance > 0) {
      setAuthenticatedToken(tokenContractAddress);
      localStorage.setItem("authenticatedToken", tokenContractAddress);

    } else {
      console.error(
        `No ${tokenContractAddress} tokens found in user's account`
      );
      let tokenType;
      if (tokenContractAddress === GOLD_TOKEN_ADDRESS) {
        tokenType = "gold";
      } else if (tokenContractAddress === SILVER_TOKEN_ADDRESS) {
        tokenType = "silver";
      } else if (tokenContractAddress === BRONZE_TOKEN_ADDRESS) {
        tokenType = "bronze";
      }
      console.error(`No ${tokenType} tokens found in user's account`);
      alert(`You don't have any ${tokenType} tokens in your Account , please buy or Swap them .`);
    }
  }
  useEffect(() => {
    const authenticatedTokenFromStorage = localStorage.getItem(
      "authenticatedToken"
    );
    if (authenticatedTokenFromStorage) {
      setAuthenticatedToken(authenticatedTokenFromStorage);
    }
  }, []);
  

  return (
   
 <div className="bg-gray-900 h-[100vh]"> 
      {account ? (
             <></>
      ) : (
        <div className=" shadow-lg bg-gray-900 p-8 relative h-screen flex flex-col justify-center items-center">
        <img src="https://appbeta.cryptway.in/logo.png" className="w-24 h-24 mb-11 rounded-full" /> 
        <h1 className="text-3xl text-white font-bold  text-center mb-8">
          Cryptway Authentication Interface
        </h1>
         
        <div className='flex justify-center '> 
          <button
            type="button"
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded mr-3"
            onClick={connect}
          >
            Connect Account
          </button> 
          
          
          
          </div>
     
         
      </div>
      )}
 
 {account ? (
             
     
 <div className="bg-gray-900"> <div className="flex pt-[150px] justify-center items-center flex-col w-full min-h-full">
            <img
          src={`https://api.multiavatar.com/${account}.png?apikey=s9P2DAhUGyKbJO`}
          className="w-24 h-24 rounded-full"
        /> <br/>
            
    
    
    
    
    
         
    <br/>
           <div className='flex justify-center '> 
    <button
       
        className="border border-purple-500  mr-3 font-bold  bg-[#c9b037] py-2 px-4 text-black rounded-3xl"
        onClick={() => authenticate(GOLD_TOKEN_ADDRESS, GOLD_TOKEN_ABI)}
        
        >
    Auth With Gold
      </button>   
      
      <button
        type="button"
        className="bg-[#d7d7d7] font-bold hover:bg-purple-600  py-2 px-4 rounded-3xl mr-3  text-black"
        onClick={() => authenticate(SILVER_TOKEN_ADDRESS, SILVER_TOKEN_ABI)}
        >
    Auth With Silver
      </button>      <button
         className="border border-purple-500   font-bold  bg-[#ad8a56] py-2 px-4 text-black rounded-3xl"
        onClick={() => authenticate(BRONZE_TOKEN_ADDRESS, BRONZE_TOKEN_ABI)}
         >
       Auth With Bronze
      </button>   
      </div>
    
     
      <br/>
    

      {authenticatedToken && (
  <div> 
    {authenticatedToken === GOLD_TOKEN_ADDRESS && (
      <div className="bg-[#c9b037]    rounded-lg p-4 shadow-md">
        <p className="text-black font-bold mb-4">You are Gold member</p>
        <ul className="list-disc list-inside">
          <li className="text-black">Free shipping on all orders</li>
          <li className="text-black">Exclusive deals and early access to sales</li>
          <li className="text-black">Personalized customer service</li>
          <li className="text-black">Access to members-only products</li>
          <li className="text-black">Free returns and exchanges</li>
          <li className="text-black">10% off all purchases</li>
        </ul>
      </div>
    )}
    {authenticatedToken === SILVER_TOKEN_ADDRESS && (
      <div className=" bg-[#d7d7d7]  rounded-lg p-4 shadow-md">
        <p className="text-gray-500 font-bold mb-4"> You are Silver member </p>
        <ul className="list-disc list-inside">
          <li className="text-black">Free shipping on all orders</li>
          <li className="text-black">Early access to sales</li>
          <li className="text-black">Personalized customer service</li>
          <li className="text-black">Access to members-only products</li>
          <li className="text-black">Free returns and exchanges</li>
          <li className="text-black">5% off all purchases</li>
        </ul>
      </div>
    )}
    {authenticatedToken === BRONZE_TOKEN_ADDRESS && (
      <div className="bg-[#ad8a56]  rounded-lg p-4 shadow-md">
        <p className="text-tan-400 font-bold mb-4"> You are Bronze member</p>
        <ul className="list-disc list-inside">
          <li className="text-black">Free shipping on orders over $50</li>
          <li className="text-black">Early access to select sales</li>
          <li className="text-black">Access to members-only products</li>
          <li className="text-black">Free returns and exchanges</li>
        </ul>
      </div>
    )}
  </div>
)}

     

      {authenticatedToken === null && (
        <div className="text-white bold"> 

          Not authenticated yet
        </div>
      )}

    </div>  
   
    </div>
      ) : ( <></>)}
 
    </div>


  );
}

export default App;
