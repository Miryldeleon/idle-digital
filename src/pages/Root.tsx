import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-full">
      <Cursor />
      <Nav />
      <main className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
