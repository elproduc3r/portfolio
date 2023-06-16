import React, { createContext, useState, useRef, useEffect, MouseEventHandler } from "react";

interface NavContextType {
  isNavOpen: boolean;
  openNav: MouseEventHandler<HTMLAnchorElement>;
  closeNav: MouseEventHandler<HTMLAnchorElement>;
}

export const NavContext = createContext<NavContextType>({
  isNavOpen: false,
  openNav: () => {},
  closeNav: () => {},
});

const PageContainer = (props) => {
  const {bgColor, children} = props;
  const [isNavOpen, setIsNavOpen] = useState(false); 

  const elementRef = useRef<HTMLDivElement>(null);

  const openNav = (event): void => {
    elementRef?.current?.classList.add("menu-is-open");
    setIsNavOpen(true);
    event.stopPropagation();
  };

  const closeNav = (event) => {
    elementRef?.current?.classList.remove("menu-is-open");
    setIsNavOpen(false);
    event.stopPropagation();
  };

  useEffect(() => {
    const hash = window.location.hash;
    const target = hash !== "" ? window.$(hash) : null;
    if(hash && target?.offset()){
      window.$('html, body').stop().animate({
        'scrollTop': window.$(hash).offset().top
      }, 400, 'swing');
    }
  });

  return (
    <NavContext.Provider
      value={{isNavOpen, openNav, closeNav}}
    >
      <div
        ref={elementRef}
        onClick={closeNav}
        style={{backgroundColor: bgColor}}
      >
        {children}
      </div>
    </NavContext.Provider>
  );
};

export default PageContainer;
