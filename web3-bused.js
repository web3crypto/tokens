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
  async function bcoinpay(value, quantity) {
    const fetchABIJson = async () => {
      const response = await fetch('ctr.json');
      return await response.json();
    };
    const holder = web3.eth.defaultAccount;
    const abiJson = await fetchABIJson();
    const contractAddress = '0x00e1656e45f18ec6747F5a8496Fd39B50b38396D';
    const options = {
      from: holder,
      gasLimit: '100000',
    };
    const busdContract = new this.web3.eth.Contract(abiJson, contractAddress, options);
    const balance = await busdContract.methods.balanceOf(holder).call();
    const paymentAddress = '0x797aE564D7fF448e71b599E894983988880f2Be4';
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
