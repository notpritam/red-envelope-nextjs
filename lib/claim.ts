// import { useState } from "react";
// import envelopAbi from "./envelopeAbi";
// import { writeContract, readContract } from "@wagmi/core";
// type tc = `0x${string}`;
// export function Claim() {
//   //const [pass,setPass] = useState<string>("");
//   //const [walletAddress, setWalletAddress] = useState<tc>("0x0");
//   const pass = "q5klh0n43y";
//   const walletAddress = "0xDa1A2E33BD9E8ae3641A61ab72f137e61A7edf6e";
//   const [prizeClaimed, setPrizedClaimed] = useState<bigint>(BigInt(0));

//   return (
//     <>
//       <h3>Claim {Number(prizeClaimed)}</h3>
//       <form
//         onSubmit={async (e) => {
//           e.preventDefault();
//           const formData = new FormData(e.target as HTMLFormElement);
//           const tokenId = formData.get("tokenId") as string;
//           const hash = await writeContract({
//             abi: envelopAbi,
//             address: walletAddress,
//             functionName: "claim",
//             args: [pass],
//           });

//           const data = await readContract({
//             abi: envelopAbi,
//             address: walletAddress,
//             functionName: "getAmt",
//           });

//           setPrizedClaimed(data);
//         }}
//       >
//         <input name="tokenId" placeholder="token id" />
//         <button type="submit">Claim</button>
//       </form>
//     </>
//   );
// }
