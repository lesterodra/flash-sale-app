import { fetchFlashSales } from "@/lib/fetcher";
import AvailableProducts from "./components/FlashSaleProducts";

export default async function Home() {
  const flashSales = await fetchFlashSales();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <p className="text-2xl font-bold">Flash Sale ! ! !</p>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left mt-20">
          <AvailableProducts flashSales={flashSales} />
        </div>
      </main>
    </div>
  );
}
