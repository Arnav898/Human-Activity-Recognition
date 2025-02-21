"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, User } from "lucide-react"
import Logo from "./Logo"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/AuthContext"
import { BACKEND_URL } from "@/constants"
import AddBarterItemDialog from "./BarterItem/AddBarterItem"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {logout, user} = useAuth(); 
  const handleLogout = async () => {
    try {
        alert("Logging out");
        await fetch(`${BACKEND_URL}/api/users/logout`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        await logout();
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Logo/>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <AddBarterItemDialog/>
              <Link to="/barter-items" className="text-foreground/60 hover:text-foreground">
                Browse Items
              </Link>
              <Link to="/messages" className="text-foreground/60 hover:text-foreground">
                Messages
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-items">My Items</Link>
                  </DropdownMenuItem>
                 { user ? <DropdownMenuItem onClick = {handleLogout}>Logout</DropdownMenuItem> :
                  <DropdownMenuItem>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link to="/barter-items" className="block rounded-md px-3 py-2 text-base hover:bg-accent">
              Browse Items
            </Link>
            <Link to="/messages" className="block rounded-md px-3 py-2 text-base hover:bg-accent">
              Messages
            </Link>
            <Link to="/profile" className="block rounded-md px-3 py-2 text-base hover:bg-accent">
              Profile
            </Link>
            <Link to="/my-items" className="block rounded-md px-3 py-2 text-base hover:bg-accent">
              My Items
            </Link>
           { user ? <Button onClick={handleLogout} variant="ghost" className="w-full justify-start px-3 text-base font-normal">
              Logout
            </Button> :
            <Link to="/login" className="block rounded-md px-3 py-2 text-base hover:bg-accent">
              Login</Link>}
          </div>
        </div>
      )}
    </nav>
  )
}

