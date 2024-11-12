import React, { useState } from "react";
import Menu from "./Menu";

function Header() {
  return (
    <header className="flex items-center justify-between p-5 bg-white font-serif border-b-2 border-purple-800  text-black">
      <h1 className="text-3xl font-semibold h-10">Employee Management</h1>
      <Menu />
    </header>
  );
}

export default Header;
