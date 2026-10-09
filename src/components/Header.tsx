import Image from "next/image";
import { connection } from "next/server";
import NavLinks from "./NavLinks";

const Header = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header>
      <div className="relative mx-auto flex max-w-7xl items-center justify-end px-4 py-4">

        {/* Logo + Name + Date - Center */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3">
          <Image
            className="h-14 w-14 object-contain"
            height={50}
            width={50}
            src="/logo.webp"
            alt="Bangla News 24 Logo"
          />

          <div>
            <h1 className="text-2xl font-bold">
              Bangla News 24
            </h1>

            <p className="text-sm text-gray-500">
              {date}
            </p>
          </div>
        </div>

        {/* Auth Buttons - Right */}
        <div className="flex items-center gap-2">
          <button className="btn">
            সাইন ইন
          </button>

          <button className="btn btn-primary">
            সাইন আপ
          </button>
        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;