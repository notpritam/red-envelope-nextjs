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

function Header() {
  const { account, address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { data, isError } = useBalance({
    address: account?.address,
  });

  const { disconnect } = useDisconnect();

  return (
    <div className="p-4 pl-12 pr-12 bg-opacity-30 border-b  sticky top-0 z-10  backdrop-filter backdrop-blur-lg flex items-center justify-between">
      <img src="/assets/logo.png" className="h-[80px] w-[80px]"></img>

      <div className="flex gap-4 w-full justify-end">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Send Gifts</MenubarTrigger>
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
          <MenubarMenu>
            <MenubarTrigger>Recieve Gifts</MenubarTrigger>
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
                {console.log(data)}
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent>
                  <button onClick={() => disconnect()}>Logout</button>
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
