"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
//import { saveotp } from "@/lib/powerhouse";
import { useToast } from "@/hooks/use-toast";

const AdminContainer = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp) {
      setError("otp is required");
      return;
    }

    setLoading(true);
    /*try {
      const res = await saveotp(otp);
      if (res.status === 200) {
        toast({
          title: "Thank you! Your submission has been received.",
        });
        setLoading(false);
        setError("");
      } else {
        toast({
          variant: "destructive",
          title: "otp already exist",
        });
        setLoading(false);
        setError("");
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong. Please try again.",
      });
      setLoading(false);
      setError("");
    }*/
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Form submission handler */}
      <Card type="otp" loading={loading}>
        <div>
          <h2 className="md:text-2xl text-lg font-semibold max-w-[80%] mb-3">
            Verify OTP
          </h2>
          <p className="text-[#B4C6EE] text-xs md:text-sm max-w-[90%] font-light">
            Please enter the OTP to login to the admin dashboard.
          </p>
          <div className="py-10">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup className="min-w-full gap-2 justify-evenly">
                <InputOTPSlot
                  index={0}
                  className="bg-[#27344D] md:w-14 md:h-14 w-full max-w-14 h-12 text-lg font-semibold border border-[#3371FF] rounded-[8px]"
                />
                <InputOTPSlot
                  index={1}
                  className="bg-[#27344D] md:w-14 md:h-14 w-full max-w-14 h-12 text-lg font-semibold border border-[#3371FF] rounded-[8px]"
                />
                <InputOTPSlot
                  index={2}
                  className="bg-[#27344D] md:w-14 md:h-14 w-full max-w-14 h-12 text-lg font-semibold border border-[#3371FF] rounded-[8px]"
                />
                <InputOTPSlot
                  index={3}
                  className="bg-[#27344D] md:w-14 md:h-14 w-full max-w-14 h-12 text-lg font-semibold border border-[#3371FF] rounded-[8px]"
                />
                <InputOTPSlot
                  index={4}
                  className="bg-[#27344D] md:w-14 md:h-14 w-full max-w-14 h-12 text-lg font-semibold border border-[#3371FF] rounded-[8px]"
                />
                <InputOTPSlot
                  index={5}
                  className="bg-[#27344D] md:w-14 md:h-14 w-full max-w-14 h-12 text-lg font-semibold border border-[#3371FF] rounded-[8px]"
                />
              </InputOTPGroup>
            </InputOTP>
            {error && (
              <p className="text-red-500 text-xs font-light pl-2 md:text-sm">
                {error}
              </p>
            )}
          </div>
        </div>
      </Card>
    </form>
  );
};

export default AdminContainer;
