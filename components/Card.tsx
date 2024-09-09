"use client";
import React from "react";
import { Button } from "./ui/button";

const Card = ({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: "email" | "otp";
}) => {
  return (
    <div className="border px-[3%] md:px-[5%] py-10 custom-shadows border-[#2B3B5A]/70 bg-[#151E2F]/95 mx-auto max-w-[90%] md:max-w-[500px] rounded-[10px] shadow-md">
      {children}
      <Button
        type="submit"
        className="bg-[#3371FF] w-full h-[52px] rounded-[8px] hover:border-[#3371FF] hover:border"
        onClick={onClick}
      >
        {type === "email" ? "Get My Exclusive Offers" : "Verify"}
      </Button>
    </div>
  );
};

export default Card;
