"use client";
import React, { useState } from "react";
import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { saveEmail } from "@/lib/powerhouse";
import { useToast } from "@/hooks/use-toast";

const AdminContainer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const res = await saveEmail(email);
      if (res.status === 200) {
        toast({
          title: "Thank you! Your submission has been received.",
        });
        setLoading(false);
        setError("");
      } else {
        toast({
          variant: "destructive",
          title: "Email already exist",
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {" "}
      {/* Form submission handler */}
      <Card type="email" loading={loading}>
        <div>
          <h2 className="md:text-4xl text-2xl font-semibold max-w-[80%] mb-3">
            Unlock 🔓 Exclusive Deals and Updates!
          </h2>
          <p className="text-[#B4C6EE] text-xs md:text-sm max-w-[90%] font-light">
            Sign up now to be the first to know about our latest products and
            receive special discounts directly in your inbox.
          </p>
          <div className="py-10 grid gap-2">
            <label
              htmlFor="email"
              className="text-xs md:text-sm font-light pl-2 text-[#B4C6EE]"
            >
              Enter Email
            </label>
            <div className="relative">
              <Input
                type="email"
                id="email"
                placeholder="emmy@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#27344D] pl-12 focus:border-[#3371FF] placeholder:text-xs text-xs md:text-sm md:placeholder:text-sm placeholder:font-light placeholder:opacity-70 border-[#2E3D5B] h-[52px] rounded-[8px]"
              />
              <Image
                src="/icons/email.svg"
                width={20}
                height={30}
                alt="email icon"
                className="absolute top-[50%] translate-y-[-50%] left-3"
              />
            </div>
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
