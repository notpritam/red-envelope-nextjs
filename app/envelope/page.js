"use client";
import envelopAbi from "../../lib/envelopeAbi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter } from "next/navigation";

import { Copy, Facebook, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { readContracts, readContract, writeContract } from "@wagmi/core";
import { Web3 } from "web3";
import { Button } from "@/components/ui/button";
function page() {
  const searchParams = useSearchParams();

  const [addressofGift, setAddressofGift] = useState();
  const addS = searchParams.get("search");

  const router = useRouter();

  const [balance, setBalance] = useState(0);

  const [greeting, setGreeting] = useState("Loading....");

  const [transactionList, setTransactionList] = useState();

  useEffect(() => {
    setAddressofGift(addS);
    if (addS != null) {
      getEnvelopeDetail(addS);
    }
  }, []);

  function convertUnixTimestampToDateTime(timestampInSeconds) {
    const date = new Date(timestampInSeconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }

  const unixTimestamp = 1697848672n;
  const dateTimeString = convertUnixTimestampToDateTime(Number(unixTimestamp));
  console.log(dateTimeString);

  const withdraw = async (addF) => {
    await writeContract({
      address: addF,
      abi:envelopAbi,
      functionName:"withdraw"
    })

    router.reload();
    toast.success("Envelope Deleted Successfully");
  };

  const getEnvelopeDetail = async (addF) => {
    console.log(addF);
    console.log(envelopAbi);
    const config = { abi: envelopAbi, address: addF };
    const allData = await readContracts({
      contracts: [
        {
          ...config,
          functionName: "view_balance",
        },
        {
          ...config,
          functionName: "greeting",
        },
        {
          ...config,
          functionName: "getTxn",
        },
      ],
    });

    console.log(allData, "all data");
    const rbalance = allData[0];
    const rtrasactions = allData[2];
    const rgreeting = allData[1];

    if (rbalance.status == "success") {
      const etherbal = Web3.utils.fromWei(rbalance.result, "ether");
      console.log(etherbal, rbalance.result, "balanceeeeee");
      setBalance(etherbal);
    }
    console.log(rbalance, "balance");
    if (rgreeting.status == "success") {
      setGreeting(rgreeting.result);
    }
    if (rtrasactions.status == "success") {
      setTransactionList(rtrasactions.result);
      console.log(rtrasactions.result, "list");
    }
  };
  return (
    <div className="flex flex-col p-4 lg:p-8" suppressHydrationWarning>
      <span className=" text-[35px] lg:text-[50px] font-semibold">
        Envelope Details of :-{" "}
        <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%]">
          {addressofGift}
        </span>
      </span>

      <span className="text-xl text-gray-500">
        Revisit Your Heartfelt Gifts and Celebrate the Joy You've Shared
      </span>

      {balance > 0 ? (
        <Button
          onClick={() => withdraw(addressofGift)}
          className="w-[300px] mt-4"
        >
          Delete & Withdraw Funds
        </Button>
      ) : <span className="text-[40px] text-gray-600">Envelope Expired!!!!</span>}

      <div className="flex flex-col gap-4 mt-5">
        <span className="text-[30px] text-gray-500">Greeting:- {greeting}</span>

        <span className="text-[30px] text-gray-500">Balance:- {balance}</span>
      </div>
      <Table className="mt-[5rem] w-full">
        <TableCaption>A list of your recent gift claimed </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Member No.</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className=" ">Amount</TableHead>
            <TableHead className="  ">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionList?.map((item, index) => (
            <>
              <TableRow className="w-full">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.receiver}</TableCell>
                <TableCell className=" ">
                  {Web3.utils.fromWei(item.amt, "ether")}
                </TableCell>
                <TableCell className=" ">
                  {convertUnixTimestampToDateTime(Number(item.time))}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
