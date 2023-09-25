import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
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
import { FiGithub } from "react-icons/fi";
import SideBar from "./SideBar";

import { UserAuth } from "../../contexts/AuthContext";
import { useHistory, Link, useNavigate } from "react-router-dom";

function Nav() {
  const [width, setWidth] = useState(window.screen.width);
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
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
      <div className="py-10 px-6 w-[100%] border-b-2 border-b-black">
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
              window.open("https://github.com/arpit2205/medium-clone", "_blank")
            }
            variant="ghost"
            // size="lg"
            icon={<FiGithub />}
          />
          
          

          <div className="ml-2">
            {user ? (
              <Menu placement="bottom-end">
                {width > 768 ? (
                  <MenuButton as={Button} bg={"#5bdfdf"} className="border-2 border-black shadow-custom" rightIcon={<ChevronDownIcon />}>
                    My profile
                  </MenuButton>
                ) : (
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
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
    </>
  );
}

export default Nav;