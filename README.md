# MedicalRecord Smart Contract

A Solidity-based smart contract for managing medical records with role-based access control on the Ethereum blockchain.

## Features
- Role-based access control (Admin, Patient)
- Secure record storage with IPFS hash integration
- Timestamp tracking for record modifications
- Address-based permissions system
- Event logging for role changes and registrations

## Roles
- `ADMIN`: Manages role assignments and contract administration
- `PATIENT`: Can view and manage their own medical records

## Contract Structure
```solidity
MedicalRecord.sol
├── Roles
│   ├── ADMIN
│   ├── PATIENT
├── Functions
│   ├── addRecord(bytes _datahash, address _patient)
│   ├── getRecord(address _patient)
│   ├── grantRole(bytes32 _role, address _account)
│   └── registerAddress(address _owner, bytes32 _role)
└── Events
    ├── roleGranted
    ├── roleRevoked
    └── registeredUser
