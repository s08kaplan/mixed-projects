import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CiMail } from "react-icons/ci";
import logo from "../assets/chat.png";
import { Link } from "react-router-dom";
import { getSessionUserData } from "../helpers/crypto";
import useAxios from "../custom-hooks/useAxios";
import useAuthCalls from "../custom-hooks/useAuthCalls";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Rooms", to: "/rooms", current: false },
  // { name: "New Room", to: "/new-room", current: false },
  // { name: "Login", to: "/login", current: false },
  // { name: "Register", to: "/register", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useAuthCalls();
  console.log("navbar user : ", user);
  const handleLogout = () => {
    logout();
  };
  return (
    <Disclosure as="nav" className="bg-violet-300">
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="relative inline-flex items-center justify-center p-2 text-white rounded-md group hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <img alt="Your Company" src={logo} className="w-auto h-8" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <button
              type="button"
              className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              {user && user?.token && (
                <CiMail aria-hidden="true" className="w-6 h-6" />
              )}
            </button> */}

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {user && user.image ? (
                    <img
                      src={user?.image}
                      alt={`${user?.username} profile-photo`}
                      className="object-cover w-10 rounded-full h-14"
                    />
                  ) : (
                    <img
                      alt="unknown user image"
                      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link
                    to={user && user?.username ? "/profile" : "/login"}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Profile
                  </Link>
                </MenuItem>
                {!user?.username ? (
                  <MenuItem>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Login
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleLogout}>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </Link>
                  </MenuItem>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.to}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
