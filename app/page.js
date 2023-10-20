"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import Link from "next/link";

import giftHero from "../ani/hero.json";
import privacyIcon from "../ani/privacy.json";
import globalReachIcon from "../ani/globalReach.json";
import trackingIcon from "../ani/tracking.json";

const keyFeatures = [
  {
    title: "Privacy Assurance",
    des: "Your Secrets Are Our Priority: Secure, Private Gift-Giving with Blockchain Technolog",
    img: privacyIcon,
  },
  {
    title: "Global Reach",
    des: "Reaching Loved Ones Worldwide: Connect with Family and Friends Across Borders",
    img: globalReachIcon,
  },
  {
    title: "Transparent Tracking",
    des: "Real-Time Insight into Your Gifts: Follow Your Presents Every Step of the Way",
    img: privacyIcon,
  },
  {
    title: "Secure and Swift Transactions",
    des: "Swift, Secure, and Worry-Free: Trust GiftChain for Fast, Safe Gift Delivery",
    img: privacyIcon,
  },
  {
    title: "Boundless Gifting Adventure",
    des: "A World Without Borders: Explore a Boundless Universe of Gift-Giving Love",
    img: privacyIcon,
  },
  {
    title: "Interactive Gift Claim",
    des: "Play to Claim: Elevate the Joy of Receiving Gifts with Fun Games",
    img: privacyIcon,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:gap-12 gap-4 justify-between p-8 lg:p-24">
      <div className="w-full h-[80vh] lg:h-[50vh] justify-center align-middle items-center lg:flex-row flex-col-reverse flex gap-4">
        <div className="flex w-full h-full justify-center align-middle gap-8 flex-col">
          <span className="lg:text-[60px] text-[40px] font-medium">
            Send{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%] ">
              Gifts Worldwide
            </span>
            <br /> with{" "}
            <span className="bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%] ">
              Privacy & Security
            </span>
          </span>

          <span className="text-[18px] lg:text-[20px]">
            Discover a New Era of Gifting – Where Distance Fades, Privacy
            Prevails, and Smiles Know No Borders.
          </span>

          <Link href="/create">
            <Button className="w-full lg:w-[300px]">Send Gift</Button>
          </Link>
        </div>

        <div className="flex items-center align-middle justify-start lg:justify-end  w-full">
          {/* <img src="/assets/red-envelope.png"></img> */}
          <Lottie
            className="w-[80%] lg:w-auto"
            animationData={giftHero}
          ></Lottie>
        </div>
      </div>

      <img src="/assets/heroLine.svg"></img>

      <div className="flex flex-col gap-4 w-full lg:items-center">
        <span className="text-4xl font-semibold">How Does It Work?</span>
        <span className="text-xl font-semibold">Sending Gifts Made Easy</span>
      </div>

      <div className="flex flex-col w-full lg:items-center  gap-4">
        <span className=" text-[35px] lg:text-[50px] font-semibold">
          Key Features
        </span>
        <span className="text-xl font-semibold">Sending Gifts Made Easy</span>

        <div className="grid grid-cols-3 gap-8 w-[90%]">
          {keyFeatures.map((item) => (
            <>
              <div className="rounded-lg overflow-hidden p-8 flex-col flex gap-4 border-[2px] dark">
                <Lottie
                  className="h-[150px] w-[150px]"
                  animationData={item.img}
                ></Lottie>
                <span className="text-[20px]">{item.title}</span>
                <span className="text-[16px]">{item.des}</span>
              </div>
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
