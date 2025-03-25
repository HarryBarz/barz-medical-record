import { useContext, useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { contractAddress, abi } from "./data";
import { WalletContext } from "./WalletContext";
import { CID, create } from "kubo-rpc-client";
import CryptoJS from "crypto-js";

export const Dashboard = () => {
  const { walletAddress, signer } = useContext(WalletContext);
  const [user, setUser] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
  });
  const [role, setRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedData, setDecryptedData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const contract = useMemo(
    () => new ethers.Contract(contractAddress, abi, signer),
    [signer]
  );
  const navigate = useNavigate();
  const client = create();
  // const file = await ipfs.add(message);
  const SECRET_KEY = "Xghhsy113#";

  // const decryptData = () => {
  //   try {
  //     const bytes = CryptoJS.AES.decrypt(message, SECRET_KEY);
  //     const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //     setDecryptedData(data);
  //     setErrorMessage("catch didn't hit for decrypt");
  //   } catch (error) {
  //     setErrorMessage("Decryption failed.");
  //   }
  // };

  const checkRegistration = async () => {
    // const isUserRegistered = await contract.isUserRegistered(walletAddress);
    setIsLoading(true);
    const isAdmin = await contract.roles(
      ethers.keccak256(ethers.encodeBytes32String("ADMIN")),
      walletAddress
    );
    const isDoctor = await contract.roles(
      ethers.keccak256(ethers.encodeBytes32String("DOCTOR")),
      walletAddress
    );
    const isPatient = await contract.roles(
      ethers.keccak256(ethers.encodeBytes32String("PATIENT")),
      walletAddress
    );

    if (isAdmin) {
      setRole("ADMIN");
    }
    if (isDoctor) {
      setRole("DOCTOR");
    }
    if (isPatient) {
      setRole("PATIENT");
    }
    setIsLoading(false);
  };

  const registerUser = async () => {
    setIsLoading(true);
    await contract.registerAddress(
      walletAddress,
      ethers.encodeBytes32String(selectedRole)
    );
    contract.on("registeredUser", () => {
      alert("Role Registered Successfully");
      setRole(selectedRole);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!signer) {
      navigate("/signin");
    } else {
      checkRegistration();
    }
  }, [signer]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await client.add(encryptData(message));
    console.log(CID);

    // await contract.addRecord(
    //   ethers.encodeBytes32String(message),
    //   walletAddress
    // );
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const genderOptions = ["male", "female"];
  const JSONrecord = JSON.stringify(user);

  useEffect(() => {
    console.log(message);
  }, [message]);

  return (
    <div>
      <h2>Hello there</h2>
      <p>Your wallet is {walletAddress}</p>
      {role ? (
        <p>Your Role is {role}</p>
      ) : (
        <div>
          <h3>Choose your role</h3>
          <label htmlFor="role">Select Role</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value=""></option>
            <option value="DOCTOR">Doctor</option>
            <option value="PATIENT">Patient</option>
          </select>

          <button onClick={() => registerUser()} disabled={!selectedRole}>
            Register
          </button>
        </div>
      )}
      <div>
        <form className="form">
          <h2>Enter your details</h2>
          {/* name */}
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              value={user.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          {/* age */}
          <div className="form-row">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="age"
              id="age"
              value={user.age}
              onChange={handleChange}
              name="age"
            />
          </div>
          {/* gender */}
          <div className="form-row">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select name="gender" id="gender" onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* diagnosis */}
          <div className="form-row">
            <label htmlFor="diagnosis" className="form-label">
              Diagnosis:
            </label>
            <input
              type="text"
              className="diagnosis"
              value={user.diagnosis}
              onChange={handleChange}
              name="diagnosis"
            />
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-circle"></div>
        </div>
      )}
    </div>
  );
};
