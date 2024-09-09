"use client";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Card = ({
  children,
  type,
  loading,
}: {
  children: React.ReactNode;
  type: "email" | "otp";
  loading: boolean;
}) => {
  return (
    <div
      className={cn(
        "border px-[3%] md:px-[5%] py-10 custom-shadows border-[#2B3B5A]/70 bg-[#151E2F]/95 mx-auto max-w-[90%] md:max-w-[500px] rounded-[10px] shadow-md",
        {
          "md:min-w-[500px] w-[100vw]": type === "otp",
        }
      )}
    >
      {children}
      <Button
        disabled={loading}
        type="submit"
        className="bg-[#3371FF] w-full h-[52px] rounded-[8px] hover:border-[#3371FF] hover:border"
      >
        {loading ? (
          <>
            <span className="spinner"></span>
          </>
        ) : type === "email" ? (
          "Get My Exclusive Offers"
        ) : (
          "Verify"
        )}
      </Button>
    </div>
  );
};

export default Card;
