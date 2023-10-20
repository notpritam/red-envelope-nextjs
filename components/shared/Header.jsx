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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Copy, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

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

      <span className="lg:hidden tracking-[.35rem] font-medium text-[20px] ">
        RedLetter
      </span>

      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent className="p-0">
          <ScrollArea className="rounded-md border p-4 h-full">
            <span className=" tracking-[.25rem] text-[20px] mb-8">
              RedLetter
            </span>
            <Link href={"/create"}>
              <div className="text-[1.2rem] mt-4">Send Gifts</div>
            </Link>
            <Separator className="my-2" />
            <Link href={"/claim"}>
              <div className="text-[1.2rem] mt-4">Claim Gifts</div>
            </Link>
            <Separator className="my-2" />
            <Link href={"/create"}>
              <div className="text-[1.2rem] mt-4">About Us</div>
            </Link>
            <Separator className="my-2" />

            {isConnected ? (
              <>
                <div className="flex-col flex gap-4">
                  {/* <div>{ensName ? `${ensName} (${address})` : address}</div> */}
                  <div>
                    Balance: {data?.formatted} {data?.symbol}
                  </div>
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button onClick={() => disconnect()}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="cursor-pointer border-[2px] p-2 pl-4 pr-4 rounded-lg text-right  dark justify-center flex items-center"
                onClick={() => connect()}
              >
                {connectors
                  .filter((x) => x.ready && x.id !== connector?.id)
                  .map((x) => (
                    <button
                      className=""
                      key={x.id}
                      onClick={() => connect({ connector: x })}
                    >
                      Connect to {x.name}
                      {isLoading &&
                        x.id === pendingConnector?.id &&
                        " (connecting)"}
                    </button>
                  ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

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
