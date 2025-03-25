// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.26;

import {MedicalRecord} from "../src/MedicalRecord.sol";
import {Test} from "forge-std/Test.sol";

contract MedicalRecordTest is Test {
    function setup() external {
        MedicalRecord medicalRecord = new MedicalRecord("PATIENT");
    }
}
