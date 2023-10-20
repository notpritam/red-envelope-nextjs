"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import Link from "next/link";

import giftHero from "../ani/hero.json";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 justify-between p-24">
      <div className="w-full h-[50vh] justify-center align-middle items-center flex gap-4">
        <div className="flex w-full h-full justify-center align-middle gap-8 flex-col">
          <span className="text-[60px] font-medium">
            Send{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%] ">
              Gifts Worldwide
            </span>
            <br /> with{" "}
            <span className="bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%] ">
              Privacy & Security
            </span>
          </span>

          <span className="text-[20px]">
            Discover a New Era of Gifting – Where Distance Fades, Privacy
            Prevails, and Smiles Know No Borders.
          </span>

          <Link href="/create">
            <Button className="w-[300px]">Send Gift</Button>
          </Link>
        </div>

        <div className="flex items-center align-middle justify-end w-full">
          {/* <img src="/assets/red-envelope.png"></img> */}
          <Lottie animationData={giftHero}></Lottie>
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <span className="text-4xl font-semibold">How Does It Work?</span>
        <span className="text-xl font-semibold">Sending Gifts Made Easy</span>
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-4xl font-semibold">Key Features</span>
        <span className="text-xl font-semibold">Sending Gifts Made Easy</span>
      </div>
    </main>
  );
}
