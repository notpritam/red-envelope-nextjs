"use client";

import FactoryAbi from "../../lib/redFactory.js";

import envelopAbi from "../../lib/envelopeAbi.js";

import Lottie from "lottie-react";
import { Slider } from "@/components/ui/slider";

import giftAni from "../../ani/giftIcon.json";
import envelope from "../../ani/envelope.json";

import create from "../../ani/blockchain1.json";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Web3 } from "web3";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Coins,
  Copy,
  Delete,
  Facebook,
  KeySquare,
  LogIn,
  Mail,
  MessageSquare,
  View,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  readContracts,
  useAccount,
  useConnect,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { readContract , writeContract} from "@wagmi/core";

import Image from "next/image";
import { parseEther } from "viem";
import toast from "react-hot-toast";
import Link from "next/link.js";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const contractAdd = "0x7ef8E99980Da5bcEDcF7C10f41E55f759F6A174B";

function page() {
  const router = useRouter();

  const { account, address, connector, isConnected } = useAccount();
  const { connect, connectors, pendingConnector } = useConnect();
  const [open, setOpen] = useState(!isConnected);

  const [count, setCount] = useState(0);

  const [amount, setAmount] = useState(0);
  const [greeting, setGreetings] = useState("");

  //Main Code From Here

  //dont forget to set envHash to nUll after testing

  const [userCodeList, setUserCodeList] = useState();

  const [envHash, setenvHash] = useState(null);
  const { write, data, error, isLoading, isError } = useContractWrite({
    address: contractAdd,
    abi: FactoryAbi,
    functionName: "createRedEnvelope",
    value: parseEther(`${amount}`),
    async onSuccess() {
      const data = await readContract({
        address: contractAdd,
        abi: FactoryAbi,
        functionName: "getLatest",
      });
      setenvHash(data);
      console.log("this is hash", envHash);

      toast.success("Envelope Successfully Created");
    },
  });
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  const createContract = () => {
    const greetings = greeting;
    const passArray = [];
    const hashArray = [];
    for (let index = 0; index < count; index++) {
      const pass = generateString(10);
      passArray.push(pass);
      hashArray.push(Web3.utils.soliditySha3({ type: "string", value: pass }));
    }
    setUserCodeList(passArray);

    write({
      args: [greetings, count, hashArray],
      value: parseEther(`${amount}`),
    });
  };

  const [envlopeList, setEnvelopeList] = useState(null);

  const withdraw = async (addF) => {
    await writeContract({
      address: addF,
      abi: envelopAbi,
    });

    router.reload();

    toast.success("Envelope Deleted Successfully");
  };

  useEffect(() => {
    getEnvleopesList();
  }, []);
  const getEnvleopesList = async () => {
    const myEnvelopes = await readContract({
      address: contractAdd,
      abi: FactoryAbi,
      functionName: "getEnvelopes",
    });

    setEnvelopeList(myEnvelopes);

    console.log(myEnvelopes);
  };
  return (
    <>
      {!isConnected ? (
        <>
          <div>
            <Dialog open={open} onClose={() => {}}>
              <DialogContent>
                <DialogHeader>
                  <Lottie className="h-[300px]" animationData={giftAni} />
                  <DialogTitle>You are not Logged in..</DialogTitle>
                  <div className="flex flex-col gap-4 mt-4">
                    To Claim or Create the envelope, please login with any wallet..
                    <Button className="flex gap-4" onClick={() => connect()}>
                      <LogIn />
                      {connectors
                        .filter((x) => x.ready && x.id !== connector?.id)
                        .map((x) => (
                          <button
                            key={x.id}
                            onClick={() => connect({ connector: x })}
                          >
                            Connect to {x.name}
                            {isLoading &&
                              x.id === pendingConnector?.id &&
                              " (connecting)"}
                          </button>
                        ))}
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : null}

      {/* <div className="w-full p-4 mt-12 items-center align-middle flex gap-4">
        <div className="flex p-4 h-full flex-col w-full gap-4 ">
          <span className="text-[60px]">Spread the Happiness</span>
        </div>
        <div className="flex items-center flex-col w-full gap-4 justify-center">
          <span className="text-[60px] font-medium">Create the Envelope</span>

          <div className="flex items-center focus:outline-none focus:ring-0 focus:border-none">
            <KeySquare />
            <input
              placeholder="0XFDD"
              className="p-4 shadow-none text-[20px] dark bg-transparent rounded-md overflow-hidden"
            ></input>
          </div>

          <Button className="p-4 text-[16px]">Submit</Button>
        </div>
      </div> */}

      <div className="flex items-center p-8 lg:p-0 flex-col w-full gap-4 justify-center pt-[4rem]">
        <Image
          height={500}
          width={1000}
          className="w-full h-full z-[0] bg-black opacity-20 absolute"
          src="/assets/banner.jpg"
        ></Image>

        <div className="z-[10] flex flex-col gap-4">
          <Lottie className="h-[300px]" animationData={create}></Lottie>

          <span className="lg:text-[60px]  text-[40px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  text-transparent bg-clip-text  font-medium">
            Create the Envelope
          </span>

          <div className="flex flex-col  relative z-[100] justify-center gap-8">
            <div className="flex border gap-4  border-white rounded-md p-2 pl-4 pr-4 items-center focus:outline-none focus:ring-0 focus:border-none">
              <Coins />
              <input
                placeholder="Amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 w-full shadow-none text-[20px] dark bg-transparent rounded-md overflow-hidden"
              ></input>
            </div>

            <div className="flex border gap-4  border-white rounded-md p-2 pl-4 pr-4 items-center focus:outline-none focus:ring-0 focus:border-none">
              <MessageSquare />
              <input
                placeholder="Write Your Greetingss..."
                type="text"
                value={greeting}
                onChange={(e) => setGreetings(e.target.value)}
                className="p-2 w-full shadow-none text-[20px] dark bg-transparent rounded-md overflow-hidden"
              ></input>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[18px]">Member Count :- {count}</span>
              <Slider
                defaultValue={[count]}
                onValueChange={(e) => {
                  setCount(e);
                  console.log(e);
                }}
                max={15}
                step={1}
              />
            </div>
          </div>

          <Button
            onClick={() => createContract()}
            className="p-4 pl-8 pr-8 mt-12 w-auto text-[16px] hover:bg-black hover:text-white transition-all duration-300"
          >
            Submit
          </Button>
        </div>
      </div>

      {envHash != null ? (
        <>
          <div className="p-8 mt-[8rem]  flex align-middle items-center w-full justify-center flex-col ">
            <div className="w-[80%] flex flex-col mb-[2rem]">
              <span className="text-[60px] font-medium bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  text-transparent bg-clip-text">
                Share the Joy
              </span>
              <span className="text-xl text-gray-500">
                Distribute Your Codes and Links to Let Loved Ones Claim Their
                Gifts
              </span>
            </div>
            <Table className="w-[80%] m-auto">
              <TableCaption>A list of your recent gift codes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Member No.</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead className="flex-1 flex w-full">Share</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userCodeList?.map((item, index) => (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{item}</TableCell>
                      <TableCell className="flex gap-[2rem]">
                        <span>
                          {`http://localhost:3000/claim?code=${item}&address=${envHash}`}
                        </span>
                        <div className="flex gap-2">
                          <Copy className="cursor-pointer" />
                          <Facebook className="cursor-pointer" />
                          <Mail className="cursor-pointer" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : null}

      {envlopeList != null ? (
        <>
          <div className="p-8 mt-[8rem]  flex align-middle items-center w-full justify-center flex-col ">
            <div className="w-[80%] flex flex-col mb-[2rem]">
              <span className="text-[40px] lg:text-[60px] font-medium bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  text-transparent bg-clip-text">
                Gift Archive
              </span>
              <span className="text-xl text-gray-500">
                Revisit Your Heartfelt Gifts and Celebrate the Joy You've Shared
              </span>
            </div>
            <Table className="w-[80%] m-auto">
              <TableCaption>A list of your recent gift codes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Envelope No.</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="flex-1 flex w-full">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {envlopeList?.map((item, index) => (
                  <>
                    <TableRow>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <Link
                          href={`http://localhost:3000/envelope?search=${item}}`}
                        />

                        {item}
                      </TableCell>
                      <TableCell className="flex gap-[2rem]">
                        <div className="flex gap-2">
                          <Delete
                            onClick={() => withdraw(item)}
                            className="cursor-pointer"
                          />
                          <Link href={`/envelope?search=${item}`}>
                            <View className="cursor-pointer" />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : null}
    </>
  );
}

export default page;
