"use client";

import { useAccount } from "wagmi";

function page() {
  const { account, address, connector, isConnected } = useAccount();

  isConnected ? console.log("connected") : console.log("not connected");

  return <div>Here</div>;
}

export default page;
