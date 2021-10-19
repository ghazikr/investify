import { ApolloQueryResult } from "@apollo/client";
import { Transition } from "@headlessui/react";
import React, { LegacyRef, useRef } from "react";
import { IconType } from "react-icons/lib";
import useOutsideCloser from "../hooks/useOutsideCloser";

interface DropDownMenuItem {
  label: string;
  Icon: IconType;
  onClick: () => Promise<ApolloQueryResult<any>[] | null>;
}

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  items: DropDownMenuItem[];
}

const DropDownMenu = ({ isOpen, items, setIsOpen }: Props) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useOutsideCloser(wrapperRef, setIsOpen);

  return (
    <div ref={wrapperRef}>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref: LegacyRef<HTMLUListElement> | undefined) => (
          <ul
            ref={ref}
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {items.map(({ label, onClick, Icon }, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                onClick={onClick}
              >
                <Icon className="mr-4" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        )}
      </Transition>
    </div>
  );
};
export default DropDownMenu;
