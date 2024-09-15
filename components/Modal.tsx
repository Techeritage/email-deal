"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AddProduct from "./forms/AddProduct";
import { cn } from "@/lib/utils";

const Modal = ({
  type,
  imageUrl,
  title,
  link,
  id,
}: {
  type: "add" | "update" | "delete";
  imageUrl?: string;
  title?: string;
  link?: string;
  id?: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className={cn(
              "w-fit px-5 h-[48px] rounded-[8px] hover:border-[#3371FF] hover:border",
              {
                "bg-[#3371FF] hover:border-[#3371FF] hover:border":
                  type === "add",
                "bg-green-500 hover:border-green-500 hover:border":
                  type === "update",
                "bg-red-500 hover:border-red-500 hover:border":
                  type === "delete",
              }
            )}
          >
            {type === "add"
              ? "Add Product"
              : type === "update"
              ? "Update"
              : "Delete"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border px-[3%] md:px-[5%] py-10 custom-shadows border-[#2B3B5A]/70 bg-[#151E2F]/95 mx-auto max-w-[90%] md:max-w-[500px] rounded-[10px] shadow-md">
          <AddProduct
            onClose={closeDialog}
            type={type}
            imageEdit={imageUrl}
            titleEdit={title}
            linkEdit={link}
            id={id}
          />
          <AlertDialogCancel
            onClick={() => setIsDialogOpen(false)}
            className="border-0 bg-red-500 rounded-[10px] h-[52px]"
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Modal;
