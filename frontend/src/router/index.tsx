import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import { publicRoutes } from "./routes";

import NavBar from "../components/base/nav-bar.component";

export const router = createBrowserRouter(
  publicRoutes.map((route) => {
    return {
      path: route.path,
      element: <NavBar component={<route.element />} />
    }
  })
);



// [
//   {
//     path: '/base',
//     element: 
//       <NavBar component={<HomePage />} />
//   }
// ]
// {
//   path: "/",
//   element: (
//     <div>
//       <h1>Hello World</h1>
//       <Link to="about">About Us</Link>
//     </div>
//   ),
// },
// {
//   path: "about",
//   element: <div>About</div>,
// },