"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavMenu from "@/components/nav/NavMenu";
import UserNav from "./UserNav";
import LoginButton from "./LoginButton";

type SectionState = "BG-Trans" | "BG-Blur" | "Text-Black"

const NavBar = () => {
  const [isTop, setIsTop] = useState(true); // Renamed for clarity
  const [section, setSection] = useState<SectionState>('BG-Trans')
  const session = useSession();
  const router = useRouter();

  const avatarUrl =
    session.data?.user?.image || "https://github.com/shadcn.png";
  const userEmail = session.data?.user?.email || "";
  const userName = session.data?.user?.name || "Chiang";

  useEffect (() => {
    if (session?.data?.user.role === "admin") {
      console.log('hello admin')
    }
  }, [session.data?.user.role, router])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      currentScrollTop <= 1 ? setSection('BG-Trans') : currentScrollTop <= 1700 ? setSection('BG-Blur') : setSection('Text-Black')
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        className={`  font-normal w-full fixed top-0 left-0 z-50 px-2 md:px-4 transition-colors duration-300 ${
          section == "BG-Trans" ? ' text-red-100 bg-transparent' : section == "BG-Blur" ? 'text-red-100 bg-white/25 backdrop-blur-sm' : 'text-black'
        }`}
      >
        <div className="container mx-auto max-w-[1170px] flex items-center font-small justify-between py-3 space-x-5">
          <Link href={"/"} className="w-[120px] md:w-[150px] py-3 md:py-2">
            LOGO
          </Link>
          <div className="grow"></div>
          <NavMenu />
          <div className="flex flex-row justify-center items-center">
            { session.status === "authenticated" 
              && 
              <UserNav avatarUrl={avatarUrl} userEmail={userEmail} userName={userName}/>
            }
            { session.status === "unauthenticated" 
              && 
              <LoginButton/>
            }
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
