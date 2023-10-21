"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Facebook, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const searchParams = useSearchParams();

  const [addressofGift, setAddressofGift] = useState();
  const addS = searchParams.get("search");

  const userCodeList = ["Test", "testd", "test"];

  useEffect(() => {
    setAddressofGift(addS);
  }, []);
  return (
    <div className="flex flex-col lg:p-8">
      <span className=" text-[35px] lg:text-[50px] font-semibold">
        Envelope Details of :-{" "}
        <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text bg-[300%]">
          {addressofGift}
        </span>
      </span>

      <span className="text-xl text-gray-500">
        Revisit Your Heartfelt Gifts and Celebrate the Joy You've Shared
      </span>

      <Table className="mt-[5rem]">
        <TableCaption>A list of your recent gift claimed </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Member No.</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="flex-1 flex w-full">Share</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userCodeList?.map((item, index) => (
            <>
              <TableRow>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item}</TableCell>
                <TableCell className="flex gap-[2rem]">
                  <span>
                    {`http://localhost:3000/claim?code=${item}&address=`}
                  </span>
                  <div className="flex gap-2">
                    <Copy className="cursor-pointer" />
                    <Facebook className="cursor-pointer" />
                    <Mail className="cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
