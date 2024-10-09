import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const navigate = useNavigate();

  const handleNavigateProfile = () => {
    navigate('/profile');
  }

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <div onClick={toggleMenu} id="profile-button">
        <label className="nav-profile-line1 apple-font">{"Good day, "}
          {user ? (user.username.length <= 12 ?
            user.username : user.username.substring(0, 12)):""}</label>
        <div className="nav-profile-line2 apple-font">Accounts & Profile</div>

        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="nav-profile apple-font">
              <div className='nav-button' onClick={handleNavigateProfile}>Profile</div>
              <div className='nav-button' onClick={logout}>Log Out</div>
            </div>
          ) : (
            <div className="nav-profile apple-font">
              <div className='nav-button'>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div className='nav-button'>
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default ProfileButton;
