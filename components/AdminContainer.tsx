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
import { useRouter } from "next/navigation";

const AdminContainer = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate OTP
    if (!otp || otp.length !== 6) {
      setError("OTP is required and must be 6 characters.");
      return;
    }

    setLoading(true); // Set loading to true when submitting the form
    setError(""); // Clear previous errors

    if (otp) {
      const giveAccess = (process.env.NEXT_PUBLIC_ADMIN_KEY as string) === otp;
      if (giveAccess) {
        setLoading(false);
        toast({
          title: "Login Succesfull. Redirecting...",
        });
        router.push(`/admin/${otp}`);
      } else {
        setLoading(false);
        setError("Invalid access code");
      }
    }
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
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={(e) => setOtp(e)}
            >
              <InputOTPGroup className="min-w-full gap-2 justify-evenly">
                <InputOTPSlot
                  index={0}
                  autoFocus
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
              <p className="text-red-500 mt-1 text-xs font-light pl-2 md:text-sm">
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
