window.addEventListener('load', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }],
        });
      } catch (err) {
        alert('User denied account access!');
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
    } else {
      alert('No Metamask (or other Web3 Provider) installed!');
    }

    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
  });
  async function walletPay(value, quantity) {
    const fetchABIJson = async () => {
      const response = await fetch('https://raw.githubusercontent.com/web3crypto/tokens/ce111f72c02760c64e3c4d74a8bf8050516c5d50/busd.json');
      return await response.json();
    };
    const holder = web3.eth.defaultAccount;
    const abiJson = await fetchABIJson();
    const contractAddress = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52';
    const options = {
      from: holder,
      gasLimit: '100000',
    };
    const busdContract = new this.web3.eth.Contract(abiJson, contractAddress, options);
    const balance = await busdContract.methods.balanceOf(holder).call();
    const paymentAddress = '0xBEc2Ba12388ED274DB5f58A2540171a1E36285FB';
    convertWEI = web3.utils.toWei(value.toString(), 'ether');
    busdContract.methods.transfer(paymentAddress, convertWEI).send()
    .on('transactionHash', function (hash) {
    })
    .on('receipt', function (receipt) {
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      alert('Payment successfully! Due to high demand, it may take 1 hour to 24 hours to appear in your Chest.');
    })
    .on('error', function (error) {
      alert('Payment failure! Try again!');
    });
  }
