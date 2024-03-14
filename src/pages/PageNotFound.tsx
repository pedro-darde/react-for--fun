import Lottie from "lottie-react";
import notFound from "@/assets/404.json";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">Page not found</h1>

      <Lottie
        loop
        animationData={notFound}
        style={{
          width: "100vh",
        }}
      />
      <Link to="/" className="text-blue-500">
        {" "}
        Back to Home{" "}
      </Link>
    </div>
  );
}
