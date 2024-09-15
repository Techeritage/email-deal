import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="py-3 px-[3%] flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Clif Digi Store</h1>
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetClose asChild>
            <div>
              <Link href="/">Home</Link>
              <Link href="/">Store</Link>
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Header;
