import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <header className="bg-green-700 text-green-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>sketchbook</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/GeneratePalatte">Generate</Link>
          <Link href="/AutoPalatte">Random</Link>
          <Link href="/Profile">Profile</Link>
          <Link href="/LoginPage">Log In</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
