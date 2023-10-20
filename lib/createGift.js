import FactoryAbi from "./redFactory.js";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { parseEther } from "viem";
import { Web3 } from "web3";
import { useState } from "react";
import { readContract } from "@wagmi/core";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const contractAdd = "0x8464135c8F25Da09e49BC8782676a84730C318bC";
const count = 2;

export function WriteContract() {
  const [envHash, setenvHash] = useState();
  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractAdd,
    abi: FactoryAbi,
    functionName: "createRedEnvelope",
    value: parseEther("2"),
    async onSuccess() {
      const data = await readContract({
        address: contractAdd,
        abi: FactoryAbi,
        functionName: "getLatest",
      });
      setenvHash(data);
    },
  });
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });
  return (
    <>
      <h3>Mint a wagmi</h3>
      {envHash}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const greeting = formData.get("greeting");
          const passArray = [];
          const hashArray = [];
          for (let index = 0; index < count; index++) {
            const pass = generateString(10);
            passArray.push(pass);
            hashArray.push(
              Web3.utils.soliditySha3({ type: "string", value: pass })
            );
          }
          console.log(passArray);
          console.log(hashArray);
          console.log(count);
          console.log(greeting);
          write({
            args: [greeting, count, hashArray],
            value: parseEther("3"),
          });
        }}
      >
        <input name="greeting" placeholder="Greetingsss" />
        <input
          name="number"
          type="number"
          placeholder="Max number of claims"
          min="1"
          max="15"
        />
        <button disabled={isLoading} type="submit">
          Mint
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isError && <div>{error?.shortMessage}</div>}
    </>
  );
}
