import { useEffect } from "react";
import Web3 from "web3";
import abi from "../contract/verify-and-mint.8.abi.json";

const contractAddr = "0x8f827ccc5aafb79399c615f744ce73812e1a879d";
const rpc = "https://api.avax-test.network/ext/bc/C/rpc";
// const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
const web3 = new Web3(window.ethereum);
const TokenContract = new web3.eth.Contract(abi, contractAddr);

export async function getAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

export async function getBalance() {
  const methods = TokenContract.methods;

  const addr = await getAccount();
  const balance = await methods.balanceOf(addr).call();
  console.log("balance ", balance);
  return balance;
}

// bytes memory signature_1,
// bytes memory signature_2,
// bytes memory signature_3,
// address winner,
// uint _amount,
// string memory _sessionId,
// uint _nonce

export async function mintReward(mintData) {
  const signatures = mintData.map((item) => item.signature);
  const { winner, score, sessionId } = mintData[0];

  const methods = TokenContract.methods;
  await methods
    .verifyAndMint(
      signatures[0],
      signatures[1],
      signatures[2],
      winner,
      score,
      sessionId,
      1
    )
    .send({
      from: winner,
      gas: 100000,
    })
    // .catch(() => {});
}
