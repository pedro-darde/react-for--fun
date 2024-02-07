import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Outlet, Link } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/tags">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tags
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex h-screen items-center justify-center p-5">
        <div id="detail" style={{ minWidth: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
