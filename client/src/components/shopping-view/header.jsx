import {
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
  Search,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { cn } from "@/lib/utils";

function MenuItems({ direction = "vertical" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "Home", label: "Home", path: "/shop/home" },
    { id: "shop", label: "Shop", path: "/shop/listing" },
    { id: "about", label: "About", path: "/shop/about" },
    { id: "contact", label: "Contact", path: "/shop/contact" },
  ];

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <nav
      className={cn(
        "flex items-start gap-9",
        direction === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      {menuItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.path)}
            className={cn(
              "font-inter text-[16px] font-semibold text-[#0C0407] hover:underline underline-offset-4 transition-all ",
              active ? "underline" : ""
            )}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if (user?.id) dispatch(fetchCartItems(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="flex items-center gap-5">
      {/* Search Icon */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/shop/search")}
        className="hover:bg-transparent"
      >
        <Search className="w-5 h-5 text-[#0C0407]" />
      </Button>

      {/* Cart */}
      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenCartSheet(true)}
          className="relative hover:bg-transparent"
        >
          <ShoppingCart className="w-5 h-5 text-[#0C0407]" />
          {cartItems?.items?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#0C0407] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {cartItems?.items?.length}
            </span>
          )}
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items || []}
        />
      </Sheet>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer bg-[#0C0407] text-white">
            <AvatarFallback className="bg-[#0C0407] text-white font-bold">
              {user?.userName?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Left Logo */}
        <Link
          to="/shop/home"
          className="text-[22px] font-extrabold text-[#0C0407] tracking-wide font-inter"
        >
          NexaShop
        </Link>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          <MenuItems direction="horizontal" />
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {isAuthenticated && <HeaderRightContent />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col items-start gap-4 pt-8 w-full">
                <MenuItems direction="vertical" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;


