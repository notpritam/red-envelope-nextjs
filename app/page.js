import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex gap-4">
        <div className="flex w-full gap-8 flex-col">
          <span className="text-[80px] font-medium">
            Send Perfect Gifts,
            <br /> to your loved ones
          </span>

          <span className="text-[30px]">SOme Pargargan</span>

          <Button>Send Gift</Button>
        </div>

        <div className="flex items-center justify-center w-full">
          <img src="/assets/red-envelope.png"></img>
        </div>
      </div>

      <div>
        <span className="text-4xl font-semibold">How Does It Work?</span>
      </div>
    </main>
  );
}
