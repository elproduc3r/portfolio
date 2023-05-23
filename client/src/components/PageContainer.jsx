import { createContext, useState, useRef } from "react";

export const NavContext = createContext({
  isNavOpen: false,
  openNav: () => {},
  closeNav: () => {},
});

const PageContainer = (props) => {
  const {children} = props;
  const [isNavOpen, setIsNavOpen] = useState(false); 
  const elementRef = useRef();

  const openNav = (event) => {
    elementRef?.current.classList.add("menu-is-open");
    setIsNavOpen(true);
    event.stopPropagation();
  };

  const closeNav = (event) => {
    elementRef?.current.classList.remove("menu-is-open");
    setIsNavOpen(false);
    event.stopPropagation();
  };

  return (
    <NavContext.Provider
      value={{isNavOpen, openNav, closeNav}}
    >
      <div
        ref={elementRef}
        onClick={closeNav}
      >
        {children}
      </div>
    </NavContext.Provider>
  );
};

export default PageContainer;
