import React, { useState, useEffect } from "react";
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
import { FiInstagram } from "react-icons/fi";
import { FcGallery } from 'react-icons/fc'
import { FaBars } from 'react-icons/fa'
import { UserAuth } from "../../contexts/AuthContext";
import { useLocation, Link, useNavigate } from "react-router-dom";
import useClickAway from '../../useClickAway';

function Nav() {
  const [width, setWidth] = useState(window.screen.width);
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isSignInPage = location.pathname === '/login';
  const isSignUppage = location.pathname === '/signup';

  const scrollThreshold = 300; // Adjust this value to your preference
  const [navbarRetracted, setNavbarRetracted] = useState(false);

  // Scroll event listener function
  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      setNavbarRetracted(true);
    } else {
      setNavbarRetracted(false);
    }
  };

  // Attach the scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  window.addEventListener("resize", () => {
    setWidth(window.screen.width);
  });

  const { user, logout } = UserAuth();
  const [sidebar, setSidebar] = useState(false);
  const { ref, isVisible, setIsVisible } = useClickAway(false);

  const showSidebar = () => setIsVisible(!isVisible);

  

  

  

  const SideNavbar = () => {
    
  
    return(
  
        <div >
  
            <Link to='/' onClick={showSidebar} className=" flex items-center border-b-2 border-b-black">
                  <span className="font-bold m-5"> Home </span>
            </Link>
  
            <Link to='/record' onClick={showSidebar} className=" flex items-center  border-b-2 border-b-black">
                <span className="font-bold m-5"> Audio Poetry </span></Link>

            <Link to='/gallery' onClick={showSidebar} className=" flex items-center  border-b-2 border-b-black">
                <SideBarIcon icon={<FcGallery size="28" />} text ='Gallery'/> <span className="font-bold m-5"> Gallery </span>
            </Link>
  
        </div>
    );
  
  
  }
  const SideBarIcon = ({ icon, text = 'tooltip 💡' }) => (
    <div className="sidebar-icon group" >
      {icon}
      <span class="sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
  );

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
      <div className={navbarRetracted ? 'top-Navbar retracted' : 'top-Navbar'}>
        <div className="flex justify-center items-center">
        <FaBars size="28" className="mx-3 sm:mx-5" onClick={showSidebar} />
          <Link
          className="text-3xl font-bold"
            to="/"
          >
            Africana
          </Link>
          <Spacer />
          <div ref={ref} >
      <div className={ !navbarRetracted && isVisible ? 'nav-menu active' : 'nav-menu'}>
      
      <SideNavbar />
     
      </div> 
    
      </div>
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