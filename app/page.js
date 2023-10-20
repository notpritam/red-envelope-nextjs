"use client";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import Link from "next/link";

import giftHero from "../ani/hero.json";
import privacyIcon from "../ani/privacy.json";
import globalReachIcon from "../ani/globalReach.json";
import trackingIcon from "../ani/tracking.json";
import secureIcon from "../ani/secure.json";
import giftIcon from "../ani/gift.json";
import gameIcon from "../ani/game.json";
import Image from "next/image";

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
    img: trackingIcon,
  },
  {
    title: "Secure and Swift Transactions",
    des: "Swift, Secure, and Worry-Free: Trust GiftChain for Fast, Safe Gift Delivery",
    img: secureIcon,
  },
  {
    title: "Boundless Gifting Adventure",
    des: "A World Without Borders: Explore a Boundless Universe of Gift-Giving Love",
    img: giftIcon,
  },
  {
    title: "Interactive Gift Claim",
    des: "Play to Claim: Elevate the Joy of Receiving Gifts with Fun Games",
    img: gameIcon,
  },
];

const unlockingTheMagic = [
  {
    title: "Create Your Gift Envelope",
    des: "Start by creating a unique gift envelope. Set the gift amount and specify how many recipients you want to surprise.",
    img: privacyIcon,
  },
  {
    title: "Make the Payment",
    des: "After confirming your gift details, you'll make a payment in ETH. This triggers our secure RedEnvelopeFactory contract to create your gift envelope on the blockchain.",
    img: globalReachIcon,
  },
  {
    title: "Receive Your Shareable Link",
    des: "You'll receive a shareable link with individual codes for each recipient. This link can be easily shared via any messaging platform.",
    img: trackingIcon,
  },
  {
    title: "Recipient's Entry",
    des: "Recipients click the link and enter their individual code on our site. This is where the excitement begins.",
    img: secureIcon,
  },
  {
    title: "Boundless Gifting Adventure",
    des: "Recipients are invited to play an engaging game. If they win, they receive a prize directly into their MetaMask wallet.",
    img: giftIcon,
  },
  {
    title: "Celebrate the Gift Experience",
    des: "Your gift becomes an interactive, memorable experience. RedLetter combines the joy of giving with the thrill of gaming, making every gift truly special.",
    img: gameIcon,
  },
];

const upcomingFeatures = [
  "NFT Integration",
  "Cross-Chain Gifting",
  "Multi Currency Support",
  "Customizable Gift Themes",
  "Auto Remeinders",
  "Group Gifting",
  // "Auto Reminders",
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center lg:gap-12 gap-4 justify-between p-8 lg:p-24">
      <div className="w-full h-[80vh] lg:h-[50vh] justify-center align-middle items-center lg:flex-row flex-col-reverse flex gap-4">
        <div className="flex w-full h-full justify-center align-middle gap-8 flex-col">
          <span className="lg:text-[75px]  text-[40px] font-medium">
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

      <div className="flex relative lg:pt-[10rem] flex-col w-full lg:items-center  gap-4">
        <img className="mb-4" src="/assets/line.svg"></img>
        <span className=" z-10 text-[35px] lg:text-[50px] font-semibold">
          Unlocking the{" "}
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%]">
            Magic
          </span>
        </span>
        <span className="text-xl text-gray-500">
          The RedLetter Journey Explained
        </span>
        <img className="mt-4" src="/assets/line.svg"></img>

        <div className="grid grid-cols-1 mt-[3rem] lg:grid-cols-3  items-center align-middle gap-8 lg:w-[90%]">
          {unlockingTheMagic.map((item, index) => (
            <>
              <div className="hover:shadow-2xl duration-300 ease-in-out h-full hover:border-white rounded-lg w-full lg:w-auto overflow-hidden p-8 flex-col flex gap-4 border-[2px] dark">
                <div className="h-[80px] w-[80px] rounded-full border flex justify-center items-center text-[30px] font-semibold  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%]">
                  {index + 1}
                </div>
                <span className="text-[20px]  tracking-[.15rem]">
                  {item.title}
                </span>
                <span className="text-[16px] text-gray-400">{item.des}</span>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="flex mt-[6rem] flex-col w-full lg:items-center  gap-4">
        <img className="mb-4" src="/assets/line.svg"></img>

        <span className=" text-[35px] lg:text-[50px] font-semibold ">
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%]">
            Technolgies{" "}
          </span>
          Used
        </span>
        <span className="text-xl text-gray-500">Sending Gifts Made Easy</span>
        <img className="mt-4" src="/assets/line.svg"></img>

        <div className="lg:flex mt-[3rem] grid grid-cols-2 lg:gap-8 gap-y-4 items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Image height={100} width={100} src={"./next.svg"}></Image>
          </div>
          <div className=" p-4 rounded-lg w-[200px] bg-black  shadow-lg">
            <svg
              viewBox="0 0 561 132"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current  lg:w-[200px]"
            >
              <title>wagmi logo</title>
              <path
                d="M561 12C561 18.6274 555.627 24 549 24C542.373 24 537 18.6274 537 12C537 5.37259 542.373 0 549 0C555.627 0 561 5.37259 561 12Z"
                fill="inherit"
              ></path>
              <path
                d="M414 105C418.971 105 423 100.971 423 96V60C423 55.0294 427.029 51 432 51H450C454.971 51 459 55.0294 459 60V96C459 100.971 463.029 105 468 105C472.971 105 477 100.971 477 96V60C477 55.0294 481.029 51 486 51H504C508.971 51 513 55.0294 513 60V96C513 100.971 517.029 105 522 105H549C553.971 105 558 100.971 558 96V42C558 37.0294 553.971 33 549 33C544.029 33 540 37.0294 540 42V82.5C540 84.9853 537.985 87 535.5 87C533.015 87 531 84.9853 531 82.5V42C531 37.0294 526.971 33 522 33H414C409.029 33 405 37.0294 405 42V96C405 100.971 409.029 105 414 105Z"
                fill="inherit"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M27 87C22.0294 87 18 82.9706 18 78V42C18 37.0294 13.9706 33 9 33C4.02943 33 0 37.0294 0 42V96C0 100.971 4.02943 105 9 105H117C121.971 105 126 100.971 126 96V60C126 55.0294 130.029 51 135 51H238.5C240.985 51 243 53.0147 243 55.5C243 57.9853 240.985 60 238.5 60H144C139.029 60 135 64.0294 135 69V96C135 100.971 139.029 105 144 105H252C256.971 105 261 100.971 261 96V42C261 37.0294 256.971 33 252 33H117C112.029 33 108 37.0294 108 42V78C108 82.9706 103.971 87 99 87H81C76.0294 87 72 82.9706 72 78V42C72 37.0294 67.9706 33 63 33C58.0294 33 54 37.0294 54 42V78C54 82.9706 49.9706 87 45 87H27ZM243 82.5C243 84.9853 240.985 87 238.5 87H157.5C155.015 87 153 84.9853 153 82.5C153 80.0147 155.015 78 157.5 78H238.5C240.985 78 243 80.0147 243 82.5Z"
                fill="inherit"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M270 96C270 100.971 274.029 105 279 105H373.5C375.985 105 378 107.015 378 109.5C378 111.985 375.985 114 373.5 114H279C274.029 114 270 118.029 270 123C270 127.971 274.029 132 279 132H387C391.971 132 396 127.971 396 123V42C396 37.0294 391.971 33 387 33H279C274.029 33 270 37.0294 270 42V96ZM297 51C292.029 51 288 55.0294 288 60V78C288 82.9706 292.029 87 297 87H369C373.971 87 378 82.9706 378 78V60C378 55.0294 373.971 51 369 51H297Z"
                fill="inherit"
              ></path>
            </svg>
          </div>
          <div className="p-4 flex justify-center items-center">
            <img src="/assets/hardhat.png" className="h-[50px]"></img>
          </div>
          <div className="p-4 flex justify-center items-center">
            <img src="/assets/tailwindcss-logo.png" className="h-[80px]"></img>
          </div>
          <div className="pl-4 pr-4 flex justify-center bg-white rounded-lg  items-center">
            <img src="/assets/soliditylogo.png" className="h-[60px]"></img>
          </div>
        </div>
      </div>

      <div className="flex mt-[6rem] flex-col w-full lg:items-center  gap-4">
        <img className="mt-4" src="/assets/line.svg"></img>

        <span className=" bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%] text-[35px] lg:text-[50px] font-semibold">
          Key Features
        </span>
        <span className="text-xl text-gray-500">Sending Gifts Made Easy</span>
        <img className="mb-4" src="/assets/line.svg"></img>

        <div className="grid grid-cols-1 mt-[6rem] lg:grid-cols-3  items-center align-middle gap-8 lg:w-[90%]">
          {keyFeatures.map((item) => (
            <>
              <div className="rounded-lg w-full lg:w-auto overflow-hidden p-8 flex-col flex gap-4 border-[2px] dark">
                <Lottie
                  className="h-[150px] w-[150px]"
                  animationData={item.img}
                ></Lottie>
                <span className="text-[20px]  tracking-[.15rem]">
                  {item.title}
                </span>
                <span className="text-[16px] text-gray-400">{item.des}</span>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="flex mt-[6rem] flex-col w-full lg:items-center  gap-4">
        <img className="mt-4" src="/assets/line.svg"></img>

        <span className=" text-[35px] lg:text-[50px] font-semibold">
          <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%]">
            Coming Soon
          </span>
        </span>
        <span className="text-xl text-gray-500">
          Stay Tuned for Exciting Features That Will Redefine the Art of Gifting
        </span>
        <img className="mb-4" src="/assets/line.svg"></img>

        <div className="grid  mt-[5rem] grid-cols-1 lg:grid-cols-3  items-center align-middle gap-8 lg:w-[90%]">
          {upcomingFeatures.map((item, index) => (
            <>
              <div className="hover:shadow-2xl duration-300 ease-in-out h-full hover:border-white rounded-lg w-full lg:w-auto overflow-hidden p-4 items-center flex gap-4 border-[2px] dark">
                <div className="h-[80px] w-[80px] rounded-full border flex justify-center items-center text-[20px] font-semibold  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%]">
                  {index + 1}
                </div>
                <span className="text-[18px] font-light tracking-[.25rem]">
                  {item}
                </span>
              </div>
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
