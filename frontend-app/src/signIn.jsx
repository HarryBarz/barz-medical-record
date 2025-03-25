import { ethers } from "ethers";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "./WalletContext";
// import { Route, Routes } from "react-router-dom";
// import dashboard from "./dashboard";

const SignIn = () => {
  const { walletAddress, setWalletAddress, setSigner } =
    useContext(WalletContext);

  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [currentPage, setCurrentPage] = useState('connect');

  const handleLogin = async () => {
    let etherSigner = null;

    let provider;

    if (window.ethereum == null) {
      console.log("Metamask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      etherSigner = await provider.getSigner();
      // console.log(etherSigner);
      setSigner(etherSigner);
      setWalletAddress(etherSigner.address);
    }
  };

  // async function getAccount() {
  //   const accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts"
  //   }).catch((err) => {
  //     if (err.code === 4001) {
  //       console.log("Please connect to metamask.")
  //     } else {
  //       console.log(err)
  //     }
  //   })
  //   const account = accounts[0];
  //   setWalletAddress(account);
  //   // setIsLoggedIn(true);
  // }

  useEffect(() => {
    // getAccount();
    if (walletAddress) {
      navigate("/dashboard");
    }
  }, [walletAddress]);

  return (
    <>
      <div className="connect-wallet-btn">
        {walletAddress ? (
          <p>Connected Address: {walletAddress}</p>
        ) : (
          <>
            <h1>Connect your wallet</h1>
            <button onClick={handleLogin}>Connect wallet</button>
          </>
        )}
      </div>
    </>
  );
};

export default SignIn;
