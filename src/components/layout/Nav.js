import React, { useState } from "react";
import {
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { FiGithub, FiInstagram } from "react-icons/fi";
import SideBar from "./SideBar";

import { UserAuth } from "../../contexts/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Nav() {
  const [width, setWidth] = useState(window.screen.width);
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isSignInPage = location.pathname === '/login';
  const isSignUppage = location.pathname === '/signup';
  window.addEventListener("resize", () => {
    setWidth(window.screen.width);
  });

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 5000,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast({
        title: "Failed to logout",
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <>
      {/* <SideBar /> */}
      {!isSignInPage && !isSignUppage && (
      <div className="py-5 sm:py-10 px-6 w-[100%] border-b-2 border-b-black">
        <div className="flex justify-center">
          <Link
          className="text-3xl font-bold"
            to="/"
          >
            Africana
          </Link>
          <Spacer />
          <IconButton
            onClick={() =>
              window.open("https://www.instagram.com/africanaverse", "_blank")
            }
            variant="ghost"
            className="hover:bg-none"
            size={"lg"}
            _hover={{ bg: "none" }}
          
            // size="lg"
            icon={<FiInstagram />}
          />
          
          

          <div className="ml-2">
            {user ? (
              <Menu placement="bottom-end">
                {width > 768 ? (
                  <MenuButton as={Button} bg={"#5bdfdf"} className="border-2 border-black shadow-custom"  _hover={{ bg: '#5bdfdf' }}  _active={{
                    bg: '#5bdfdf',
                    transform: 'scale(0.98)',
                   
                  }} rightIcon={<ChevronDownIcon />}>
                    My profile
                  </MenuButton>
                ) : (
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    bg={"#5bdfdf"} 
                    icon={<HamburgerIcon />}
                    className="border-2 border-black shadow-custom"  _hover={{ bg: '#5bdfdf' }}  _active={{
                      bg: '#5bdfdf',
                      transform: 'scale(0.98)',
                     
                    }}
                    // variant=""
                  />
                )}

                <MenuList>
                  <MenuGroup title="Actions">
                    <MenuItem as={Link} to="/write">
                      Write article
                    </MenuItem>
                    <MenuItem as={Link} to="/my-articles">
                      My articles
                    </MenuItem>
                    {/* <MenuItem>Saved articles</MenuItem> */}
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title={user && user.email}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <Link to="/login" className="px-3 py-3 bg-[#FFD93D] rounded-lg border-2 border-black">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      )}
    </>
  );
}

export default Nav;