import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/Picture1.png";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLinks, setFilteredLinks] = useState([]);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Scholarships", path: "/scholarships" },
        { name: "Projects", path: "/projects" },
        { name: "Research", path: "/research" },
        { name: "Alumni", path: "/alumni" },
        { name: "Login", path: "/login" },
        { name: "Jobs", path: "/jobs" }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Search functionality
    useEffect(() => {
        if (searchQuery) {
            const results = menuItems.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredLinks(results);
        } else {
            setFilteredLinks([]);
        }
    }, [searchQuery]);

    // Handle search result click
    const handleSearchSelect = (path) => {
        navigate(path);
        setSearchQuery(""); // Clear search
        setFilteredLinks([]); // Hide results
    };

    return (
        <nav className="bg-primary text-white p-6 w-full">
            <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center flex-wrap px-4">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <Link to='/'>
                        <img src={Logo} alt="Logo" className="h-12 rounded-lg" />
                    </Link>
                    <Link to="/">
                        <span className="text-lg whitespace-nowrap">Project Management Unit <br /> <small className="text-sm text-gray-400">Higher education department KP</small></span>
                    </Link>
                </div>

                {/* Menu Items */}
                <div className="hidden md:flex space-x-4 text-lg flex-grow justify-center">
                    {menuItems.map((item) => (
                        <Link key={item.name} to={item.path} className="hover:underline">
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Search Box */}
                <div className="relative hidden md:flex items-center w-auto justify-end">
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-1 placeholder-white rounded-md border border-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && filteredLinks.length > 0) {
                                handleSearchSelect(filteredLinks[0].path);
                            }
                        }}
                    />
                    <button className="ml-2 bg-white text-primary px-3 py-1 rounded-md">Search</button>

                    {/* Search Results */}
                    {filteredLinks.length > 0 && (
                        <ul className="absolute top-full mt-1 w-48 right-20 bg-white text-black border rounded shadow-md">
                            {filteredLinks.map((item) => (
                                <li
                                    key={item.name}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleSearchSelect(item.path)}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden p-4 flex flex-col space-y-2 text-center">
                    {menuItems.map((item) => (
                        <Link key={item.name} to={item.path} className="block py-2 hover:underline" onClick={() => setIsOpen(false)}>
                            {item.name}
                        </Link>
                    ))}
                    {/* Mobile Search */}
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-1 rounded-md w-full border border-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="bg-white text-primary px-3 py-1 rounded-md mt-2">Search</button>

                        {/* Mobile Search Results */}
                        {filteredLinks.length > 0 && (
                            <ul className="absolute top-full mt-1 w-full bg-white text-black border rounded shadow-md">
                                {filteredLinks.map((item) => (
                                    <li
                                        key={item.name}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handleSearchSelect(item.path)}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </nav>

    );
};

export default Navbar;
