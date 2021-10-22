import React, { useState } from "react";
import NextLink from "next/link";
import { BiLogOut } from "react-icons/bi";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import router from "next/router";
import { useCurrentUserQuery, useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import DropDownMenu from "./DropDownMenu";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { data } = useCurrentUserQuery({
    skip: typeof window === "undefined", // do not run query on server
  });

  const [logout] = useLogoutMutation();
  const client = useApolloClient();

  const dropdownMenuItems = [
    {
      label: "Post an idea",
      onClick: () => router.push("/create-idea"),
      Icon: BsFillFileEarmarkPostFill,
    },
    {
      label: "Logout",
      onClick: () => logout().then(() => client.resetStore()),
      Icon: BiLogOut,
    },
  ];

  return (
    <header className="text-gray-600 body-font bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NextLink href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Investify</span>
          </a>
        </NextLink>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {data && data.currentUser ? (
            <div className="ml-3 relative">
              <div>
                <button
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-purple-500 focus:ring-white"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={() => setIsUserMenuOpen((old) => !old)}
                >
                  <span className="sr-only">Open user menu</span>
                  <span className="h-10 w-10 rounded-full bg-white text-myPalette-darkBlue font-bold flex items-center justify-center">
                    {data &&
                      `${data.currentUser.username.slice(0, 2).toUpperCase()}`}
                  </span>
                </button>
              </div>

              <DropDownMenu
                isOpen={isUserMenuOpen}
                setIsOpen={setIsUserMenuOpen}
                items={dropdownMenuItems}
              />
            </div>
          ) : (
            <>
              <NextLink href="/register">
                <a className="mr-5 hover:text-gray-900 cursor-pointer">
                  Register
                </a>
              </NextLink>
              <NextLink href="/login">
                <a className="mr-5 bg-indigo-600 text-white p-2 rounded-md hover:text-gray-200 cursor-pointer">
                  Login
                </a>
              </NextLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
