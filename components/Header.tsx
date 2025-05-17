"use client";
import React from "react";
import {  FlagIcon, Plus } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="py-3 px-10">
        <div className="flex justify-between items-center">
          {/*Logo*/}
          <div className="flex flex-row space-x-2">
            <FlagIcon className="fill-black" />
            <p className="text-xl font-bold">MyGovAI</p>
          </div>
          <div className="flex flex-row space-x-2">
          
              <Button onClick={()=>window.location.reload()}>
                <Plus />
                <span>New Chat</span>
              </Button>
        

            <Button>Learn More</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
