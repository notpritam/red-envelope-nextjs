import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-12 justify-between p-24">
      <div className="w-full items-center flex gap-4">
        <div className="flex w-full align-middle gap-8 flex-col">
          <span className="text-[60px] font-medium">
            Send Gifts Worldwide <br /> with Privacy & Security
          </span>

          <span className="text-[20px]">
            Discover a New Era of Gifting – Where Distance Fades, Privacy
            Prevails, and Smiles Know No Borders.
          </span>

          <Button className="w-[300px]">Send Gift</Button>
        </div>

        <div className="flex items-center align-middle justify-end w-full">
          <img src="/assets/red-envelope.png"></img>
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
