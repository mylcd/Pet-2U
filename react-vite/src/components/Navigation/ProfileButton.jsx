import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);

  const navigate = useNavigate();

  const handleNavigateProfile = () => {
    navigate('/profile');
  }

  const handleNavigateCreateStore = () => {
    navigate('/stores/new');
  }

  const handleLogin = () => {
    navigate('/login');
  }

  const handleSignup = () => {
    navigate('/signup');
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
  };

  return (
    <>
      <div id="profile-button">
        <label className="nav-profile-line1 apple-font">{"Good day, "}
          {user ? (user.username.length <= 12 ?
            user.username : user.username.substring(0, 12)):""}</label>
        <div className="nav-profile-line2 apple-font">Accounts & Profile</div>

        <div className={"profile-dropdown"}>
          {user ? (
            <div className="nav-profile apple-font">
              <div className='nav-button' onClick={handleNavigateProfile}>Profile</div>
              <div className='nav-button' onClick={handleNavigateCreateStore}>Create Store</div>
              <div className='nav-button' onClick={logout}>Log Out</div>
            </div>
          ) : (
            <div className="nav-profile apple-font">
              <div className='nav-button' onClick={handleLogin}>Log In</div>
              <div className='nav-button' onClick={handleSignup}>Sign Up</div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default ProfileButton;
