"use client";
import { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";

export function NavbarDemo() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsNavbarVisible(scrollTop < 150); // Adjust the threshold value as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center">
      {isNavbarVisible && <Navbar className="top-2" />}
      {/* <p className="text-black dark:text-white"> The Navbar will show on top of the page </p> */}
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <img
          src="https://res.cloudinary.com/dfpzyjix2/image/upload/v1713807365/ReSculpt/b5jt2rtxk7kzg2wz38ri.png"
          alt=""
          className="h-6 w-6 float-left"
        />

        <MenuItem setActive={setActive} active={active} item="Uploads">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/uploadWasteReq">Waste Requirement</HoveredLink>
            <HoveredLink href="/uploadInnovativeProd">
              Innovative Product
            </HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className=" text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Waste Requirements"
              href="/displayWasteReq"
              src="https://res.cloudinary.com/dfpzyjix2/image/upload/v1713703030/ReSculpt/vcbu1i77dcrobpncpvng.jpg"
              description="Contribute your Household-Waste and be a part of sustainability."
            />
            <ProductItem
              title="Innovative Products"
              href="/displayInnovativeProds"
              src="https://res.cloudinary.com/dfpzyjix2/image/upload/v1713703030/ReSculpt/q5imjtcedjzf9g8zsphm.jpg"
              description="Recycled Brilliance: Where Waste Becomes Wonderful."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Profile">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/profile/userData">My Profile</HoveredLink>
            <HoveredLink href="/profile/satisfiedReq">
              Satisfied Requirements
            </HoveredLink>
            <HoveredLink href="/profile/uploadedReq">
              Uploaded Requirements
            </HoveredLink>
            <HoveredLink href="/profile/uploadedInnovations">
              Uploaded Innovations
            </HoveredLink>
            <HoveredLink href="/profile/contributions">
              Contributions
            </HoveredLink>
            {/* <HoveredLink href="/profile/orders">Orders</HoveredLink> */}
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
