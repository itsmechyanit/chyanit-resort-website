import Link from "next/link";

import logo from "@/public/logo.png";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image height="60" width="60" alt="Chyanit's Resort logo" src={logo} />
      <span className="text-xl font-semibold text-primary-100">
        Chyanit&apos;s Resort
      </span>
    </Link>
  );
}

export default Logo;
