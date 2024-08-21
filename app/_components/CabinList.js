import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList({ filter }) {
  const cabins = await getCabins();
  let filteredCabins;
  if (filter === "all") filteredCabins = cabins;
  if (filter === "small") {
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity < 4);
  }
  if (filter === "medium") {
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity < 8
    );
  }

  if (filter === "large") {
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }
  if (filteredCabins.length === 0) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
