"use client";
import Lottie from "lottie-react";

import giftAni from "../../ani/giftIcon.json";
import entertheCode from "../../ani/enterthecode.json";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Home, KeySquare, LogIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useParams, useSearchParams } from "next/navigation";

import { useAccount, useConnect } from "wagmi";
import Game from "@/components/shared/Game";

function page() {
  const { account, address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const [open, setOpen] = useState(!isConnected);

  const [code, setCode] = useState(null);
  const [add, setAdd] = useState(null);

  const [showGame, setShowGame] = useState(false);

  const searchParams = useSearchParams();

  const codeS = searchParams.get("code");
  const addS = searchParams.get("address");

  const envelopeRef = useRef();

  useEffect(() => {
    setCode(codeS);
    setAdd(addS);

    if (codeS != null && addS != null) {
      setShowGame(true);
    }
  }, []);

  const showGameFunction = () => {
    if (code != null && add != null) {
      setShowGame(true);
    }
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
                    To Claim the envelope, please login with any wallet..
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

      {!showGame ? (
        <>
          <div className="flex mt-[10px] items-center flex-col w-full p-8 lg:p-0 gap-4 justify-center">
            <Lottie className="h-[300px]" animationData={entertheCode} />
            <span className="lg:text-[60px] text-[40px] lg:w-auto w-full font-medium">
              Enter the Details
            </span>

            <div className="flex p-2  border-[2px]  gap-4 rounded-lg items-center focus:outline-none focus:ring-0 focus:border-none">
              <Home />
              <input
                placeholder="Address"
                value={add}
                onChange={(e) => setAdd(e.target.value)}
                className="m-2 shadow-none text-[20px] dark bg-transparent rounded-md overflow-hidden"
              ></input>
            </div>

            <div className="flex p-2  border-[2px] mt-0 gap-4 rounded-lg items-center focus:outline-none focus:ring-0 focus:border-none">
              <KeySquare />
              <input
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="m-2 shadow-none text-[20px] dark bg-transparent rounded-md overflow-hidden"
              ></input>
            </div>

            <Button
              onClick={() => showGameFunction()}
              className="p-4 text-[16px] w-full lg:w-auto"
            >
              Submit
            </Button>
          </div>
        </>
      ) : null}

      {showGame ? (
        <>
          <div className=" flex flex-col items-center gap-8">
            <Game code={code} address={add} />
          </div>
        </>
      ) : null}
    </>
  );
}

export default page;
