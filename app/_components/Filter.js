"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  function handleFilter(filterValue) {
    const queryParameters = new URLSearchParams(searchParams);
    queryParameters.set("capacity", filterValue);
    router.replace(`${pathname}?${queryParameters.toString()}`);
  }
  const activeFilter = searchParams?.get("capacity") ?? "all";
  return (
    <div className="border border-primary-700 flex">
      <Button
        filter="all"
        onClick={() => handleFilter("all")}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        onClick={() => handleFilter("small")}
        activeFilter={activeFilter}
      >
        1&mdash;3
      </Button>
      <Button
        filter="medium"
        onClick={() => handleFilter("medium")}
        activeFilter={activeFilter}
      >
        4&mdash;7
      </Button>
      <Button
        filter="large"
        onClick={() => handleFilter("large")}
        activeFilter={activeFilter}
      >
        8&mdash;12
      </Button>
    </div>
  );
}

function Button({ filter, onClick, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-800 text-primary-200" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Filter;
