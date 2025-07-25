// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition


// 0x5FbDB2315678afecb367f032d93F642f64180aa3

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("LockModule", (m) => {
  
  const lock = m.contract("TodoList");

  return { lock };
});

export default LockModule;
