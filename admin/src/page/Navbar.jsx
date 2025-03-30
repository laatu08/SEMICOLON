import React, {useState} from "react";
import {Menu, Scale, X} from "lucide-react"; // Importing icons from Lucide React
import {Link} from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-white fixed top-0 left-0 w-full z-50">
            {/* Logo */}
            <div className="flex gap-2 items-center">
            <Scale className="h-8 w-8 text-blue-400" />

                <h1 className="text-xl font-semibold">Legal House</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
                <Link to="/" className="hover:text-blue-500">
                    Home
                </Link>
                <Link to="/create-case" className="hover:text-blue-500">
                    Create Case
                </Link>
                <Link to="/view-case" className="hover:text-blue-500">
                    View Cases
                </Link>
                <Link to="/resolve-case" className="hover:text-blue-500">
                    Resolved Cases
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
            >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Navigation Panel (Hidden on md+) */}
            <div
                className={`absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out md:hidden 
                ${isMobileMenuOpen ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col items-center gap-4 py-4">
                    <li>
                        <Link
                            to="/"
                            className="block py-2 hover:text-blue-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/create-case"
                            className="block py-2 hover:text-blue-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Create Case
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/view-case"
                            className="block py-2 hover:text-blue-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            View Cases
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/resolve-case"
                            className="block py-2 hover:text-blue-500"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Resolved Cases
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;