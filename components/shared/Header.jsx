"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useBalance,
} from "wagmi";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Copy, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

function Header() {
  const { account, address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { data, isError } = useBalance({
    address: address,
  });

  const { disconnect } = useDisconnect();

  return (
    <div className="h-[60px] lg:p-4 pl-4 pr-4 lg:h-[100px] text_16  lg:pl-12 lg:pr-12 bg-opacity-30 border-b   sticky top-0 z-10  backdrop-filter backdrop-blur-lg flex items-center justify-between">
      <Link href="/">
        <img
          src="/assets/logo.png"
          className=" h-[40px] w-[40px] lg:h-[80px] lg:w-[80px]"
        ></img>
      </Link>

      <span className="lg:hidden">RedLetter</span>

      <div className="hidden lg:flex gap-4 w-full justify-end">
        <Menubar className="gap-4 pr-8 pl-8">
          <MenubarMenu>
            <Link href="/create">Send Gifts</Link>
          </MenubarMenu>
          <MenubarMenu>
            <Link href="/claim">Claim Gifts</Link>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="text-[16px] cursor-pointer">
              About Us
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {isConnected ? (
          <>
            <div className="flex gap-4 items-center">
              {/* <div>{ensName ? `${ensName} (${address})` : address}</div> */}
              <div>
                Balance: {data?.formatted} {data?.symbol}
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className=" overflow-hidden gap-4 flex flex-col">
                    <span className="text-[12px] w-full text-ellipsis">
                      {address}
                    </span>
                    <Button onClick={() => disconnect()}>
                      <Copy className="mr-2 h-4 w-4" /> Copy Address
                    </Button>
                    <Button onClick={() => disconnect()}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </>
        ) : (
          <div
            className="cursor-pointer  text-right  dark justify-center flex items-center"
            onClick={() => connect()}
          >
            {connectors
              .filter((x) => x.ready && x.id !== connector?.id)
              .map((x) => (
                <button key={x.id} onClick={() => connect({ connector: x })}>
                  Connect to {x.name}
                  {isLoading &&
                    x.id === pendingConnector?.id &&
                    " (connecting)"}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
