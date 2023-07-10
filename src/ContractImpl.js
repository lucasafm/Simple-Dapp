import React, {useEffect, useState} from 'react'
import { ethers } from "ethers";
import Contract_abi from './contracts/Contract_abi.json'
import './ContractImpl.css';
import Home from './Home';
import { ReactComponent as LoadingSVG } from './loading.svg';

const ContractImpl = (props) => {
    const {logoClicked} = props;

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState("No Acount Connected.");
    const [provider, setProvider] = useState(null)
	const [currentContractVal, setCurrentContractVal] = useState(null);
	const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);

	const connectWalletHandler = () => {
        if (defaultAccount !== "No Acount Connected."){
            console.log(contract)
        } else if (window.ethereum) {
            let walletProvider = window.ethereum.providers[0]
            walletProvider.request({method: 'eth_requestAccounts'})
			.then(result => {
                setProvider(walletProvider)
				accountChangedHandler(result[0], walletProvider);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const accountChangedHandler = (newAccount, provider) => {
		setDefaultAccount(newAccount);
		updateEthers(provider)
	}

    useEffect(()=>{
        if ((defaultAccount !== "No Acount Connected.") && contract){
            getCurrentVal()
        }
    }, [contract])

    useEffect(()=>{
        let timer = setTimeout(() => {setErrorMessage(null)}, 3500);
        return ()=>{ clearTimeout(timer)}
    }, [errorMessage])

	window.ethereum.on('accountsChanged', accountChangedHandler);

	const updateEthers = async (provider) => {
		let tempProvider = new ethers.BrowserProvider(provider);
		let tempSigner = await tempProvider.getSigner();
		let tempContract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Contract_abi, tempSigner);
		setContract(tempContract);
	}

	const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
        if((defaultAccount !== "No Acount Connected.") && contract){
            contract.write(event.target.setText.value)
                .then(()=>{
                    console.log("modified successfully")
                    let timer = setTimeout(() => {getCurrentVal()}, 10000);
                    return ()=>{ clearTimeout(timer)}
                })
                .catch((err)=>{
                    console.log(err)
                    setErrorMessage("There was an error in the modification of the contracts value.")
                });
        } else {
            setErrorMessage("No connected acount found.")
        }
	}

	const getCurrentVal = async () => {
        if (!provider) {
            return setErrorMessage("No connected acount found.")
        }
        if (provider.chainId !== "0xaa36a7"){
            return setErrorMessage("You should be connected to SeponiaEth")
        }
        setLoading(true)
        let val = await contract.read();
		setCurrentContractVal("Current Value: " + val);
        setLoading(false)
	}
	
	return (
		<div className="bigDiv">
            {logoClicked?<div className='contractDiv'>
                <div className="smallDiv">
                    {defaultAccount !== "No Acount Connected."?
                        <span>Address: {defaultAccount}</span>:
			            <button className="button" onClick={connectWalletHandler}><span>Connect Wallet</span></button>
                    }
                </div>
                <div className="smallDiv">
			        <form className="formId" onSubmit={setHandler}>
				        <input placeholder="Change here the contracts value" id="setText" type="text"/>
				        <button className="button" type={"submit"}><span>Update</span></button>
			        </form>
                </div>
                <div className="smallDiv">
			        <button className="button" onClick={getCurrentVal}><span>Get Contract Value <span className={loading?'loadingSpan':"notLoadingSpan"}></span></span> </button>
			        <span id="valText">{currentContractVal}</span>
                </div>
                <div className='errDiv'>
                    <span id="errText">{errorMessage}</span>
                </div>
            </div>:<Home />}
		</div>
	);
}

export default ContractImpl;