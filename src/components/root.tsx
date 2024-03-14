import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/auth";

import { Outlet, Link } from "react-router-dom";

export default function Root() {
  const { user, isLogged } = useAuth()


  return (
    <div>
      {isLogged ? (<NavigationMenu>
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
          <NavigationMenuItem>
            <Link to="/recipes">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Recipes
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>) : null}

      <div className="flex h-screen items-center justify-center p-5">
        <div id="detail" style={{ minWidth: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
