import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen bg-slate-950 text-white">
      <p className="text-3xl">Opps!!!</p>
      <p className="text-4xl mb-1">404 - Page Not Found</p>
      <p className="text-sm mb-2">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go back to Home
      </Link>
    </div>
  );
};
export default ErrorPage;
