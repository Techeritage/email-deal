"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2, UploadCloudIcon } from "lucide-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/app/utils/firebase";
import { getItems, saveItem, updateItem } from "@/lib/powerhouse";
import { toast } from "@/hooks/use-toast";

const storage = getStorage(app);

interface AddProductProps {
  onClose: () => void; // New prop to close dialog
  type: "add" | "update" | "delete";
  imageEdit?: string;
  titleEdit?: string;
  linkEdit?: string;
  id?: string;
}

const AddProduct: React.FC<AddProductProps> = ({
  onClose,
  type,
  imageEdit,
  titleEdit,
  linkEdit,
  id,
}) => {
  const [title, setTitle] = useState(titleEdit || "");
  const [link, setLink] = useState(linkEdit || "");
  const [imageUrl, setImageUrl] = useState(imageEdit || "");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle file change and upload
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) return;

    const file = target.files[0]; // Only handle one file for this example
    setUploading(true); // Start the loading indicator

    try {
      const fileRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
          setUploading(false); // Stop loading in case of error
        },
        async () => {
          // Get the download URL after upload completes
          const downloadURL = await getDownloadURL(fileRef);
          setImageUrl(downloadURL);
          setUploading(false); // End the loading indicator
        }
      );
    } catch (error) {
      console.error("File upload failed:", error);
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !link || !imageUrl) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      if (type === "add") {
        const res = await saveItem({ title, link, imageUrl });
        if (res.status === 200) {
          toast({
            title: "Product saved",
          });
          setLoading(false);
          setError("");
          setTitle("");
          setLink("");
          setImageUrl("");
          onClose(); // Close dialog on success

          // Refresh the page
          window.location.reload();
        } else {
          toast({
            variant: "destructive",
            title: "Product already exist",
          });
          setLoading(false);
          setError("");
        }
      }

      if (type === "update") {
        const res = await updateItem({ title, link, imageUrl, id });
        if (res.status === 200) {
          toast({
            title: "Product updated",
          });
          await getItems();
          setLoading(false);
          setError("");
          setTitle("");
          setLink("");
          setImageUrl("");
          onClose(); // Close dialog on success

          // Refresh the page
          window.location.reload();
        } else {
          toast({
            variant: "destructive",
            title: "Product already exist",
          });
          setLoading(false);
          setError("");
        }
      }

      if (type === "delete") {
        const res = await updateItem({ title, link, imageUrl, id });
        if (res.status === 200) {
          toast({
            title: "Product updated",
          });
          await getItems();
          setLoading(false);
          setError("");
          setTitle("");
          setLink("");
          setImageUrl("");
          onClose(); // Close dialog on success

          // Refresh the page
          window.location.reload();
        } else {
          toast({
            variant: "destructive",
            title: "Product already exist",
          });
          setLoading(false);
          setError("");
        }
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
    <div>
      <form onSubmit={handleSubmit}>
        {(type === "add" || type === "update") && (
          <>
            {error && (
              <p className="text-center py-3 text-xs text-red-500">{error}</p>
            )}
            <div className="grid gap-5">
              {/* Title Input */}
              <div className="grid gap-1">
                <label
                  htmlFor="title"
                  className="text-xs md:text-sm font-light pl-2 text-[#B4C6EE]"
                >
                  Enter title
                </label>
                <Input
                  type="text"
                  id="title"
                  placeholder="How to make money online"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#27344D] focus:border-[#3371FF] placeholder:text-xs text-xs md:text-sm md:placeholder:text-sm placeholder:font-light placeholder:opacity-70 border-[#2E3D5B] h-[52px] rounded-[8px]"
                />
              </div>

              {/* Link Input */}
              <div className="grid gap-1">
                <label
                  htmlFor="link"
                  className="text-xs md:text-sm font-light pl-2 text-[#B4C6EE]"
                >
                  Enter item URL
                </label>
                <Input
                  type="text"
                  id="link"
                  placeholder="https://www.example.com"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="bg-[#27344D] focus:border-[#3371FF] placeholder:text-xs text-xs md:text-sm md:placeholder:text-sm placeholder:font-light placeholder:opacity-70 border-[#2E3D5B] h-[52px] rounded-[8px]"
                />
              </div>

              {/* File Upload Section */}
              <div className="grid gap-3">
                <label className="text-xs md:text-sm font-light pl-2 text-[#B4C6EE]">
                  Banner image
                </label>
                <div className="relative">
                  {/* Loading spinner */}
                  {uploading && (
                    <div className="absolute z-50 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex items-center justify-center">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="50px"
                        height="50px"
                      >
                        <path
                          fill="none"
                          stroke="#2828D1"
                          strokeWidth="4"
                          strokeMiterlimit="10"
                          d="M25,5 A20,20 0 1,1 24.999,5"
                          strokeDasharray="31.4 31.4"
                          strokeLinecap="round"
                          transform="rotate(225 25 25)"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="1s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
                    </div>
                  )}

                  {/* Uploaded Image Preview */}
                  {imageUrl ? (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded banner"
                        className="rounded-[10px] w-full min-h-[150px] max-h-[200px]"
                      />
                    </div>
                  ) : (
                    <div className="bg-[#27344D] min-h-[150px] relative rounded-[10px]"></div>
                  )}

                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const fileInput = document.getElementById(
                        "file-upload"
                      ) as HTMLInputElement | null;
                      if (fileInput) {
                        fileInput.click(); // Only call click if the element is not null
                      }
                    }}
                    className="absolute right-5 top-5 flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#151E2F]/95"
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <UploadCloudIcon />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="bg-[#3371FF] mt-8 w-full h-[52px] rounded-[8px] hover:border-[#3371FF] hover:border"
        >
          {loading ? (
            <div className="animate-spin">
              <Loader2 />
            </div>
          ) : (
            <p>
              {type === "add" ? "Add" : type === "update" ? "Update" : "Delete"}{" "}
              Item
            </p>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
