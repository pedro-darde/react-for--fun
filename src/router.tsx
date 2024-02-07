import { createBrowserRouter } from "react-router-dom";
import Home from "@/components/home";
import Root from "@/components/root";
import { loader as tagsLoader } from "@/pages/tags/list/loader";
import ListTagsPage from "@/pages/tags/list/ListTags";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "tags", element: <ListTagsPage />, loader: tagsLoader },
    ],
  },
]);
