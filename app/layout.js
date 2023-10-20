"use client";

import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/Header";
import { Toaster } from "react-hot-toast";
import { config } from "@/lib/wagmi";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const config = createConfig({
//   autoConnect: true,
//   publicClient: createPublicClient({
//     chain: mainnet,
//     transport: http(),
//   }),
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark",
          fontSans.variable
        )}
      >
        <WagmiConfig config={config}>
          <Header />
          {children}

          <Toaster />
        </WagmiConfig>
      </body>
    </html>
  );
}
