import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutHome: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    if (document.body) {
      document.body.style.backgroundColor = "black";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    }
  }, []);

  return <div>{children}</div>;
};

export default LayoutHome;
