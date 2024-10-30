import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-yellow-400 px-4 py-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-8">
        <Link
          to="/"
          className="relative inline-block text-sm font-medium text-yellow-400 group active:text-yellow-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-yellow-400 group-hover:translate-y-0 group-hover:translate-x-0" />
          <span className="relative block px-8 py-3 bg-black border border-yellow-400">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
};

export default PageNotFound;
