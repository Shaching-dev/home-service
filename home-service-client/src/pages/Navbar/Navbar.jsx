import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SettingsIcon,
  UserIcon,
  MenuIcon,
  ChevronDownIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const profiles = [
  { icon: <UserIcon className="w-4 h-4" />, label: "Profile" },
  { icon: <UserIcon className="w-4 h-4" />, label: "Billing" },
  { icon: <SettingsIcon className="w-4 h-4" />, label: "Settings" },
  { icon: <UserIcon className="w-4 h-4" />, label: "Dashboard" },
];

const links = [
  { link: "/services", label: "Services" },
  {
    link: "#1",
    label: "Learn",
    links: [
      { link: "/docs", label: "Documentation" },
      { link: "/resources", label: "Resources" },
      { link: "/community", label: "Community" },
      { link: "/blog", label: "Blog" },
    ],
  },
  { link: "/about", label: "About" },
  { link: "/pricing", label: "Pricing" },
  // {
  //   link: "#2",
  //   label: "Support",
  //   links: [
  //     { link: "/faq", label: "FAQ" },
  //     { link: "/demo", label: "Book a demo" },
  //     { link: "/forums", label: "Forums" },
  //   ],
  // },
];

// Mobile Sheet Menu Item with collapsible sub-links
const MobileNavItem = ({ item, onClose }) => {
  const [open, setOpen] = useState(false);

  if (item.links) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
          {item.label}
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="ml-4 mt-1 space-y-1 border-l border-white/20 pl-3">
            {item.links.map((sub) => (
              <li key={sub.label}>
                <NavLink
                  to={sub.link}
                  onClick={onClose}
                  className="block rounded-md px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                >
                  {sub.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <NavLink
      to={item.link}
      onClick={onClose}
      className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
    >
      {item.label}
    </NavLink>
  );
};

const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="px-5 bg-chart-2 py-3 text-primary-foreground">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h3 className="font-semibold text-lg">Hello Navbar</h3>

        {/* Desktop Navigation — hidden on sm and below */}
        <div className="hidden md:flex items-center space-x-5">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.links ? (
                    <>
                      <NavigationMenuTrigger className="hover:text-black focus:bg-chart-1  hover:bg-amber-200">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-52 gap-1 p-2  rounded-md">
                          {item.links.map((sub) => (
                            <li key={sub.label}>
                              <NavigationMenuLink
                                className={` hover:bg-chart-2 hover:text-white`}
                                asChild
                              >
                                <NavLink
                                  to={sub.link}
                                  className="block rounded-md px-3 py-2 text-sm transition-colors"
                                >
                                  {sub.label}
                                </NavLink>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavLink
                      to={item.link}
                      className="px-4 py-2 text-sm font-medium "
                    >
                      {item.label}
                    </NavLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side: Avatar + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {profiles.map((profile) => (
                <DropdownMenuItem
                  key={profile.label}
                  className="flex items-center gap-2"
                >
                  {profile.icon}
                  {profile.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Hamburger — visible on sm and below */}
          <div className="md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Open menu"
                >
                  <MenuIcon className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 bg-chart-2 text-primary-foreground border-r border-white/20"
              >
                <SheetHeader>
                  <SheetTitle className="text-primary-foreground text-left">
                    Hello Navbar
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-1">
                  {links.map((item) => (
                    <MobileNavItem
                      key={item.label}
                      item={item}
                      onClose={() => setSheetOpen(false)}
                    />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
