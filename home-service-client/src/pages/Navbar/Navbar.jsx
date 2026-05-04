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
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "@/utils/Logo/Logo";
import useAuth from "@/hooks/useAuth/useAuth";

const profiles = [
  { icon: <UserIcon className="w-4 h-4" />, label: "Profile", link: "prfile" },
  {
    icon: <SettingsIcon className="w-4 h-4" />,
    label: "Settings",
    link: "settings",
  },
  {
    icon: <UserIcon className="w-4 h-4" />,
    label: "Dashboard",
    link: "dashboard",
  },
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
];

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-secondary border-b-custom-color duration-400 font-semibold border-b-4 rounded-md p-2 border-primary"
    : "text-primary/300 font-medium hover:text-primary transition-colors";

const subNavLinkClass = ({ isActive }) =>
  isActive
    ? "block rounded-md px-3 py-2 font-semibold bg-white/10 text-secondary"
    : "block rounded-md px-3 py-2 font-medium text-primary/80 hover:bg-white/5 hover:text-primary transition-colors";

const MobileNavItem = ({ item, onClose }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hasActiveChild = item.links?.some(
    (sub) => location.pathname === sub.link,
  );

  if (item.links) {
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          className={`flex items-center justify-between w-full px-3 py-2 text-[16px] rounded-md transition-colors ${
            hasActiveChild
              ? "text-primary font-semibold bg-white/10"
              : "text-primary/80 hover:bg-white/10"
          }`}
        >
          {item.label}
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <ul className="ml-4 mt-1 space-y-1 border-l border-white/20 pl-3">
            {item.links.map((sub) => (
              <li key={sub.label}>
                <NavLink
                  to={sub.link}
                  onClick={onClose}
                  className={subNavLinkClass}
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
      className={({ isActive }) =>
        isActive
          ? "block rounded-md px-3 py-2 text-[16px] font-semibold bg-white/10 text-primary"
          : "block rounded-md px-3 py-2 text-[16px] font-medium text-primary/80 hover:bg-white/5 hover:text-primary transition-colors"
      }
    >
      {item.label}
    </NavLink>
  );
};

const Navbar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

  const { user, signOutUser } = useAuth();

  const handleLogOut = async () => {
    try {
      await signOutUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-5 bg-chart-2 py-3 text-primary-foreground">
      <div className="flex justify-between items-center">
        <Logo />

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-5">
          <NavigationMenu>
            <NavigationMenuList className="space-x-5">
              {links.map((item) => {
                const hasActiveChild = item.links?.some(
                  (sub) => location.pathname === sub.link,
                );

                return (
                  <NavigationMenuItem key={item.label}>
                    {item.links ? (
                      <>
                        <NavigationMenuTrigger
                          className={`text-[16px]  ${
                            hasActiveChild
                              ? "text-secondary border-b-2 px-2 font-semibold"
                              : "text-secondary"
                          }`}
                        >
                          {item.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                          <ul className="grid w-52 gap-1 p-2 rounded-md">
                            {item.links.map((sub) => (
                              <li key={sub.label}>
                                <NavigationMenuLink asChild>
                                  <NavLink
                                    to={sub.link}
                                    className={subNavLinkClass}
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
                      <NavLink to={item.link} className={navLinkClass}>
                        {item.label}
                      </NavLink>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                {user ? (
                  <AvatarImage src={user?.photoURL} />
                ) : (
                  <AvatarImage src="https://github.com/shadcn.png" />
                )}
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
                  <Link to={`/${profile.link}`}>{profile.label}</Link>
                </DropdownMenuItem>
              ))}

              {user ? (
                <DropdownMenuItem
                  className={`text-destructive`}
                  onClick={handleLogOut}
                >
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild className={`text-custom-color`}>
                  <Link to={`/auth/login`}>
                    <LogInIcon />
                    Sign in
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile */}
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
                className="w-[80%] bg-chart-2 text-primary-foreground border-r border-white/10"
              >
                <SheetHeader>
                  <SheetTitle className="text-primary-foreground text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <nav className="mt-5 space-y-1">
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
