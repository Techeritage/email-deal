"use client";
import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const HomeContainer = () => {
  const handleSubmit = () => {};
  return (
    <div>
      <Card onClick={handleSubmit} type="email">
        <div>
          <h2 className="md:text-4xl text-2xl font-semibold max-w-[80%] mb-3">
            Unlock Exclusive Deals and Updates!
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomeContainer;
