import { createBrowserRouter } from "react-router-dom";
import Home from "@/components/home";
import Root from "@/components/root";
import ListTagsPage from "@/pages/tags/list/ListTags";
import ListRecipe from "./pages/recipes/list/ListRecipe";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "tags", element: <ListTagsPage /> },
      { path: "recipes", element: <ListRecipe /> },
    ],
  },
]);
