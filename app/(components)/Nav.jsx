import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <header className="bg-gray-600">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>sketchbook</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/GeneratePalatte">generate</Link>
          <Link href="/AutoPalatte">random</Link>
          <Link href="/Profile">profile</Link>
          <Link href="/LoginPage">Log In</Link>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
