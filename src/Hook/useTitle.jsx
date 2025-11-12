import { useEffect } from "react";

export default function useTitle(title) {
   useEffect(() => {
     if (title) {
       document.title = `Cleanify | ${title}`;
     } else {
       document.title = "Cleanify";
     }
   }, [title]);

}
