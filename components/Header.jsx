import React from "react";
import { BookOpen, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import HandleLogin from "./HandleLogin";

function Header({ isAuthenticated }) {
  return (
    <header className=" backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              prefetch={false}
              className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <BookOpen className="h-6 w-6 text-primary" />

              <span className="text-xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                WebWave
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* <DarkModeToggle /> */}

            {isAuthenticated && (
              <nav className="flex space-x-1">
                <Link
                  prefetch={false}
                  href="/dashboard"
                  className="flex space-x-2 items-center text-md font-medium text-white hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2 mr-2"
                >
                  <LayoutDashboard className="h-5 w-5 text-md" />
                  <span className="hidden md:block">Dashboard</span>
                </Link>
                <Link
                  prefetch={false}
                  href="/deploy"
                  className="flex space-x-2 items-center text-md font-medium text-white hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2 mr-2"
                >
                  <Settings className="h-5 w-5 text-md" />
                  <span className="hidden md:block">Deploy</span>
                </Link>
              </nav>
            )}

            <HandleLogin isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
