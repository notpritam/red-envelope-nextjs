const generateRandomCell = () => {
  const row = Math.floor(Math.random() * 3);
  const col = Math.floor(Math.random() * 3);
  return { row, col };
};

import Lottie from "lottie-react";
import envelope from "../../ani/envelope.json";

import envelopAbi from "../../lib/envelopeAbi";
import { writeContract, readContract } from "@wagmi/core";

import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

function Game({ code, address }) {
  const [listArray, setlistArray] = useState();
  const rowAnswer = Math.floor(Math.random() * 3) + 1;
  const colAnswer = Math.floor(Math.random() * 3) + 1;

  const [tryCount, setTryCount] = useState(0);

  const [gameStatus, setGameStatus] = useState(false);

  console.log(rowAnswer, colAnswer, "this is answer");

  function createArrayOfArrays() {
    const arrayOfArrays = [];

    for (let i = 0; i < 3; i++) {
      const innerArray = [];
      for (let j = 0; j < 3; j++) {
        const randomNumber = Math.floor(Math.random() * 10); // Generates random numbers between 0 and 9
        innerArray.push(randomNumber);
      }
      arrayOfArrays.push(innerArray);
    }

    return arrayOfArrays;
  }

  // Call the function to create the array of arrays with random numbers

  useEffect(() => {
    setlistArray(createArrayOfArrays());
  }, []);

  const handleCellClick = (row, col) => {
    if (row === rowAnswer && col === colAnswer) {
      setGameStatus(true);
      toast.success("You Won!!!");
    } else {
      toast.error("Try Again, Better Luck Next Time!");
      setTryCount((tryCount) => tryCount + 1);
    }
  };

  const claimPrize = async () => {
    const hash = await writeContract({
      abi: envelopAbi,
      address: address,
      functionName: "claim",
      args: [code],
    });

    const data = await readContract({
      abi: envelopAbi,
      address: address,
      functionName: "getAmt",
    });

    toast.success(`You Won!! Check your wallet`);
    console.log(data, "this is data");

    redirect("/");
  };

  return gameStatus ? (
    <>
      <span className="text-[2rem] lg:text-[4rem] font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%] mt-10px">
        You Won!!!
      </span>
      <span className="lg:text-4xl  text-2xl font-semibold ">
        Tried Count :-{" "}
        <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text ">
          {tryCount}
        </span>{" "}
      </span>
      <Lottie
        // lottieRef={envelopeRef}
        className="lg:h-[50vh]"
        animationData={envelope}
      />

      <Button onClick={() => claimPrize()} className="flex w-[300px]">
        Claim Your Prize
      </Button>
    </>
  ) : (
    <div className="flex p-8 lg:p-0 flex-col items-center gap-4">
      <span className="text-[40px] font-medium  w-full lg:w-auto lg:text-[60px]">
        Choose the Correct One
      </span>

      <div className="grid gap-4 h-[600px] grid-cols-3 lg:w-[600px]">
        {listArray?.map((item1, index) =>
          item1.map((item3, index2) => (
            <>
              <div
                key={item1 + item3}
                className=" p-4  flex items-center border-[2px] cursor-pointer rounded-lg shadow-lg tile relative transition-all duration-500 ease-in-out btn  justify-center"
                onClick={() =>
                  gameStatus
                    ? toast.error("Game Ended")
                    : handleCellClick(index + 1, index2 + 1)
                }
              >
                <Lottie
                  className=""
                  autoPlay={false}
                  animationData={envelope}
                ></Lottie>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default Game;
