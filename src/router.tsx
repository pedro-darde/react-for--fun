import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@/components/home";
import Root from "@/components/root";
import ListTagsPage from "@/pages/tags/list/ListTags";
import ListRecipe from "./pages/recipes/list/ListRecipe";
import PrivateRoute from "./components/route/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route index element={<PrivateRoute Component={Home} />} />
      <Route path="tags" element={<PrivateRoute Component={ListTagsPage} />} />
      <Route path="recipes" element={<ListRecipe />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
