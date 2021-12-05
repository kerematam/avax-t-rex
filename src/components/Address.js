import { useEffect } from "react";
import Web3 from "web3";
import abi from "../contract/abi.json";

// var Contract = require("web3-eth-contract");

const contractAddr = "0x338d8553513e300a7f851cc9a5ab7bf7d3f8e7e5";
const rpc = "https://api.avax-test.network/ext/bc/C/rpc";
// const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
const web3 = new Web3(window.ethereum);
const TokenContract = new web3.eth.Contract(abi, contractAddr);

async function getAccount() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

async function getBalance() {
  const methods = TokenContract.methods;

  const addr = await getAccount();
  const balance = await methods.balanceOf(addr).call();
  return balance;
}

async function mintReward() {
  const addr = await getAccount();
  const methods = TokenContract.methods;
  const res = await methods.mintMinerReward(addr, 999).send({
    from: addr,
    gas: 50000,
  });

  console.log("TX RES ", res);

  // gas limit : 34951
  // .send({
  //   from: accounts[0],
  //   gas: 34951,
  // });
  //   const addData = await MetaCoin.methods
  //     .registerPost("asd", "image.jpg", 1)
  //     .send({
  //       from: accounts[0],
  //       gas: 1000000,
  //     });
}

// const getAddress = async () => {
//   TokenContract.methods
//     .name()
//     .call()
//     .then((r) => {
//       console.log(r);
//     });

//   console.log("TokenContract.methods ", TokenContract.methods);
//   //   console.log("name ", name);
// };

const Address = () => {
  const handleClick = async () => {
    // const res = await getAccount();
    // console.log("res ", res);
    // const balance = await getBalance();
    // console.log("balance ", balance);

    // mintReward();

    getBalance();
  };

  useEffect(() => {
    // getAddress();
    // Contract.setProvider(rpc);
    // const contract = new Contract(jsonInterface, address);
  }, []);
  return <div onClick={handleClick}>addr</div>;
};

export default Address;
