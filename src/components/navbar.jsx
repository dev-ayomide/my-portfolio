import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -document.querySelector(".navbar").offsetHeight;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <div className="navbar fixed top-0 z-10 w-full flex items-center justify-between h-16 p-8 md:p-12 md:px-16 bg-gray-950 text-white">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <h2 className="text-2xl hover:text-green-dark">Dev Ayomide</h2>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-md">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="font-medium transition-colors hover:text-green-dark"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
            className="font-medium transition-colors hover:text-green-dark"
          >
            Services
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("portfolio");
            }}
            className="font-medium transition-colors hover:text-green-dark"
          >
            Portfolio
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("experience");
            }}
            className="font-medium transition-colors hover:text-green-dark"
          >
            Experience
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="font-medium transition-colors hover:text-green-dark"
          >
            Contact
          </a>
          <button onClick={toggleTheme} className="ml-4 p-2 bg-gray-800 text-white rounded-md">
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            )}
          </button>
        </nav>
        <button onClick={toggleMenu} className="md:hidden p-2 bg-gray-800 text-white rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-950 text-white transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <h2 className="text-2xl font-semibold">Dev Ayomide</h2>
          <button onClick={toggleMenu} className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
              toggleMenu();
            }}
            className="text-2xl font-medium"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
              toggleMenu();
            }}
            className="text-2xl font-medium"
          >
            Services
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("portfolio");
              toggleMenu();
            }}
            className="text-2xl font-medium"
          >
            Portfolio
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("experience");
              toggleMenu();
            }}
            className="text-2xl font-medium"
          >
            Experience
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
              toggleMenu();
            }}
            className="text-2xl font-medium"
          >
            Contact
          </a>
          <button onClick={toggleTheme} className="mt-4 p-2 bg-gray-800 text-white rounded-md">
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-moon"
              >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
