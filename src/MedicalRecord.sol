
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

error MedicalRecord__UserIsAddressZero();

contract MedicalRecord {
    struct RecordMetadata {
        string ipfshash;
        uint256 timestamp;
        address lastModifiedBy;
    }

    RecordMetadata private record;
    address immutable i_admin = 0x2e1f165BeD2EDEb80c96c46Ab10d0b753Bd708bd;
    address public patient;
    address[] public registeredAddresses;
    address public owner;

    // role => address => bool
    // mapping(bytes32 => mapping(address => bool)) public roles;
    mapping(address => bytes32) public addressToRole;
    mapping(address => RecordMetadata) private patientToRecord; // just to know which patient has which record
    mapping(address => bool) public isUserRegistered;

    // ROLES
    bytes32 private constant ADMIN = keccak256(abi.encodePacked(bytes32(abi.encodePacked("ADMIN"))));
    bytes32 private constant DOCTOR = keccak256(abi.encodePacked(bytes32(abi.encodePacked("DOCTOR"))));
    bytes32 private constant PATIENT = keccak256(abi.encodePacked(bytes32(abi.encodePacked("PATIENT"))));

    // EVENTS
    event roleGranted(bytes32 indexed role, address indexed account);
    event roleRevoked(bytes32 indexed role, address indexed account);
    event registeredUser(bytes32 indexed role, address indexed account);

    // MODIFIERS
    modifier onlyRole(bytes32 _role) {
        // require(roles[_role][msg.sender], "not authorized");
        // _;
        require(addressToRole[msg.sender] == _role, "not authorized");
        _;
    }

    constructor(string memory role) {
        _grantRole(ADMIN, i_admin);
        isUserRegistered[i_admin] = true;
        registeredAddresses.push(i_admin);
        owner = msg.sender;
        if (!isUserRegistered[owner]) {
            registerAddress(owner, keccak256(abi.encodePacked(role)));
        }
    }

    function registerAddress(address _owner, bytes32 _role) public {
        if (isUserRegistered[_owner] == false) {
            registeredAddresses.push(_owner);
            isUserRegistered[_owner] = true;
            _grantRole(keccak256(abi.encodePacked(_role)), _owner);
            emit registeredUser(_role, _owner);
        }
    }

    function grantRole(bytes32 _role, address _account) external onlyRole(ADMIN) {
        _grantRole(_role, _account);
    }

    // function revokeRole(bytes32 _role, address _account) external onlyRole(ADMIN) {
    //     roles[_role][_account] = false;
    //     emit roleRevoked(_role, _account);
    // }

    function addRecord(bytes _datahash, address _patient) public onlyRole(ADMIN) onlyRole(PATIENT) {
        patientToRecord[_patient] = RecordMetadata(_datahash, block.timestamp, msg.sender);
        // rzn for `onlyAdmin` is because the record has been stored on ipfs, so this just adds it to the blockchain.
    }

    function getRecord(address _patient) public view onlyRole(PATIENT) returns (RecordMetadata memory) {
        return patientToRecord[_patient];
    }

    function viewEncodedRole(bytes32 _role) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_role));
    }

    
    function _grantRole(bytes32 _role, address _account) internal {
        addressToRole[_account] = _role;
        // roles[_role][_account] = true;
        emit roleGranted(_role, _account);
    }
}
