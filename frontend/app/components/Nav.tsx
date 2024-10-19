import Link from "next/link";

const Nav = () => (
  <nav className="bg-gray-800 p-4 mb-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white text-lg">EasyGen</div>
      <div className="hidden md:flex space-x-4">
        <Link href="/" className="text-gray-300 hover:text-white">
          Home
        </Link>
        <Link href="/" className="text-gray-300 hover:text-white">
          About
        </Link>
        <Link href="/" className="text-gray-300 hover:text-white">
          Services
        </Link>
        <Link href="#" className="text-gray-300 hover:text-white">
          Contact
        </Link>
      </div>
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          {/* Hamburger icon for mobile */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
);

export default Nav;
