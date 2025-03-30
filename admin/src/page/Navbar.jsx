import React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white fixed top-0 left-0 w-full">
            {/* Logo on the left */}
            <div className="flex items-center">
                {/* <img src="/logo.png" alt="Legal House" className="h-10 w-auto mr-3" /> */}
                <h1 className="text-xl font-semibold">Legal House</h1>
            </div>

            {/* Navigation items on the right */}
            <NavigationMenu>
                <NavigationMenuList className="flex gap-8">
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/" className="hover:text-blue-500">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/create-case" className="hover:text-blue-500">Create Case</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/view-case" className="hover:text-blue-500">View Cases</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="/resolve-case" className="hover:text-blue-500">Resolved Cases</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </nav>
    );
};

export default Navbar;
