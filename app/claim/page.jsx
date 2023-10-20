"use client";
import Lottie from "lottie-react";

import giftAni from "../../ani/giftIcon.json";
import envelope from "../../ani/envelope.json";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, KeySquare, LogIn } from "lucide-react";
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

  const searchParams = useSearchParams();

  const codeS = searchParams.get("code");

  const envelopeRef = useRef();

  useEffect(() => {
    setCode(codeS);
  }, []);

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

      {!code ? (
        <>
          <div className="flex mt-[10px] items-center flex-col w-full gap-4 justify-center">
            <span className="text-[60px] font-medium">Enter the Code</span>

            <div className="flex items-center focus:outline-none focus:ring-0 focus:border-none">
              <KeySquare />
              <input
                placeholder="0XFDD"
                className="p-4 shadow-none text-[20px] dark bg-transparent rounded-md overflow-hidden"
              ></input>
            </div>

            <Button className="p-4 text-[16px]">Submit</Button>
          </div>
        </>
      ) : (
        <div className=" flex flex-col items-center gap-8">
          <Game />
        </div>
      )}
    </>
  );
}

export default page;
