import "./App.css";
import SignIn from "./signIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Contact from "./contact";
import { Dashboard } from "./Dashboard.1";
import { WalletContext } from "./WalletContext";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState("");

  return (
    <WalletContext.Provider
      value={{ walletAddress, setWalletAddress, signer, setSigner }}
    >
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </WalletContext.Provider>
  );
}

export default App;
