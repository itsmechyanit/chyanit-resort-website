import SideNavigation from "../_components/SideNavigation";

function layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-12 h-full">
      <SideNavigation />
      <div className="mt-1">{children}</div>
    </div>
  );
}

export default layout;
