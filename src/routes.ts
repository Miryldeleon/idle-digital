import { createHashRouter as createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import Services from "./pages/Services";
import Plans from "./pages/Plans";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,           Component: Home },
      { path: "how-it-works",  Component: HowItWorks },
      { path: "about",         Component: About },
      { path: "contact",       Component: Contact },
      // Quiz: accessible contextually, not in primary nav
      { path: "quiz",          Component: Quiz },
      // Kept for future use — not in primary nav
      { path: "services",      Component: Services },
      { path: "plans",         Component: Plans },
      { path: "work",          Component: Work },
      { path: "work/:slug",    Component: CaseStudy },
    ],
  },
]);
