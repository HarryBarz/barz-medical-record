// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {MedicalRecord} from "../src/MedicalRecord.sol";

contract DeployMedicalRecord is Script {
    function run() external {
        MedicalRecord medicalrecord;
        vm.startBroadcast();
        medicalrecord = new MedicalRecord("PATIENT");
        vm.stopBroadcast();
    }
}
