// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div className="text-teal-600 dark:text-teal-300">
            <svg
              className="h-8"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
            </svg>
          </div>

          {/* Glavni grid */}
          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            {/* Sekcija za newsletter */}
            <div className="col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Get the latest news!
                </h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae
                  nam molestias.
                </p>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  Email
                </label>
                <div className="border border-gray-100 p-2 focus-within:ring-3 sm:flex sm:items-center sm:gap-4 dark:border-gray-800">
                  <input
                    type="email"
                    id="UserEmail"
                    placeholder="john@rhcp.com"
                    className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm dark:bg-gray-900 dark:text-white"
                  />
                  <button className="mt-1 w-full bg-teal-500 px-6 py-3 text-sm font-bold tracking-wide text-white uppercase transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>

            {/* Link sekcije */}
            {[
              {
                title: "Services",
                items: [
                  "1on1 Coaching",
                  "Company Review",
                  "Accounts Review",
                  "HR Consulting",
                  "SEO Optimisation",
                ],
              },
              {
                title: "Company",
                items: ["About", "Meet the Team", "Accounts Review"],
              },
              {
                title: "Helpful Links",
                items: ["Contact", "FAQs", "Live Chat"],
              },
              {
                title: "Legal",
                items: ["Accessibility", "Returns Policy", "Refund Policy", "Hiring-3 Statistics"],
              },
              {
                title: "Downloads",
                items: ["Marketing Calendar", "SEO Infographics"],
              },
            ].map((section, index) => (
              <div key={index} className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900 dark:text-white">{section.title}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Ikonice društvenih mreža */}
            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              {["Facebook", "Instagram", "Twitter", "GitHub", "Dribbble"].map((name, i) => (
                <li key={i}>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                  >
                    <span className="sr-only">{name}</span>
                    {/* SVG možeš zameniti stvarnim ikonama po potrebi */}
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Donji deo footera */}
        <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2022. Company Name. All rights reserved.
            </p>

            <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
              {["Terms & Conditions", "Privacy Policy", "Cookies"].map((link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-75 dark:text-gray-400"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
