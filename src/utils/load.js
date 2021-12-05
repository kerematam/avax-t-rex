const Web3 = require("web3");
const { abi, networks } = require("./MetaCoin.json");

const rpc = "https://api.avax-test.network/ext/bc/C/rpc";
// "http://localhost:7545"
const web3 = new Web3(new Web3.providers.HttpProvider(rpc));

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("accounts :", accounts);

  const MetaCoin = new web3.eth.Contract(abi, networks[5777].address);
  // const balance = await MetaCoin.methods.getBalanceInEth(accounts[0]).call();
  // console.log("balance : ", balance);

  // const balanceInEth = await MetaCoin.methods.getBalance(accounts[0]).call();
  // const send = await MetaCoin.methods.sendCoin(accounts[1], 1000).send({
  //   from: accounts[0],
  // });

  // const addData = await MetaCoin.methods
  //   .registerPost("asd", "image.jpg", 1)
  //   .send({
  //     from: accounts[0],
  //     gas: 1000000,
  //   });
  // console.log("add data ", addData);

  // const data = await MetaCoin.methods.getPostIds().call();
  // console.log("data :", data);

  // console.log("data : ", data);
  // console.log("balance : ", balance);
  // console.log("balance in eth : ", balanceInEth);
  // console.log("send : ", send);
  //   const hash =
  //     "0xfc7eed1db0c14d70f875460a53c315d0df86a087ba9e921e9fe2923577c327f9";
  //   const signature =
  //     "0xe6a543bbbf2ef15c0f8d75ae96b3bc030076bc3dbf56f447214cf574b36e63e258533c45032842d57a92aee456faf8d723ab13cfcf714a1a78cfef7992fbefde1c";
  //   var key = await web3.eth.accounts.recover(hash, signature);
  //   console.log("key : ", key);
})();
