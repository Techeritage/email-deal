"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AddProduct from "./forms/AddProduct";
import { useState } from "react";

const Store = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Store</h1>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#3371FF] w-fit px-5 h-[52px] rounded-[8px] hover:border-[#3371FF] hover:border"
            >
              Add Product
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="border px-[3%] md:px-[5%] py-10 custom-shadows border-[#2B3B5A]/70 bg-[#151E2F]/95 mx-auto max-w-[90%] md:max-w-[500px] rounded-[10px] shadow-md">
            <AddProduct onClose={closeDialog} />
            <AlertDialogCancel
              onClick={() => setIsDialogOpen(false)}
              className="border-0 bg-red-500 rounded-[10px] h-[52px]"
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Store;
