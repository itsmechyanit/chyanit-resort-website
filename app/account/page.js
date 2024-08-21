import { auth } from "../auth";
export const metadata = {
  title: "Guest Area",
};

async function Page() {
  const { user } = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-4">
      Welcome {user.name.split(" ").at(0)}
    </h2>
  );
}

export default Page;
