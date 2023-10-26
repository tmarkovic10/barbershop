import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <section>{children}</section>
    </main>
  );
};

export default Layout;
