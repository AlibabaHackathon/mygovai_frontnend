import { Facebook } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-5 border-t bg-slate-50">
        <div className="flex flex-col space-y-3">

      
      <div className="flex justify-between px-10 py-2">
        <h3>MyGovAI</h3>
        <div className="flex flex-row">
            <div className="rounded-full bg-white border border-black px-2 py-2">
                <Facebook/>
            </div>
        </div>
      </div>
      
      <div className="px-10">
        <p>
          © {new Date().getFullYear()} Government Services. All rights reserved.
        </p>
      </div>
        </div>
    </footer>
  );
};

export default Footer;
