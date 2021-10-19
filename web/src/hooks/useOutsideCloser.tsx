import { useEffect } from "react";

export default function useOutsideCloser(
  ref: React.RefObject<HTMLDivElement>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(ev: MouseEvent) {
      if (ref.current && !ref.current.contains(ev.target as Node))
        setIsOpen(false);
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen]);
}
