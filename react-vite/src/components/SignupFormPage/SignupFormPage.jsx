import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import LoginLogo from "../LoginFormPage/LoginLogo.svg";

function SignupFormPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      if(location.state) {
        navigate(location.state.origin);
      }
      else {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="middle">
      <div className='apple-font auth-page'>
        <div className='md-element'>
          <img className='md-icon'
            src={LoginLogo}
          />
        </div>

        <div className='md-element'>
          <div className='apple-font md-demo-div middle'>
            <b>Sign Up For Pet2U</b>
          </div>
        </div>

        <form className='md-element-form' onSubmit={handleSubmit}>

          <label>
            <b>Email</b>
          </label>
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Example: example@gmail.com'
              required
            />
            {errors.email && (
              <div className='error'>{errors.email}</div>
            )}
          </div>

          <label>
            <b>Username</b>
          </label>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username needs to be 6 characters or longer'
              required
            />
            {errors.username && (
              <div className='error'>{errors.username}</div>
            )}
          </div>

          <label>
            <b>Password</b>
          </label>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password needs to be 6 characters or longer'
              required
            />
            {errors.password && (
              <div className='error'>{errors.password}</div>
            )}
          </div>

          <label>
            <b>Confirm Password</b>
          </label>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=''
              required
            />
            {errors.confirmPassword && (
              <div className='error'>{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className='apple-font md-button'
            disabled={!email || !password || email.length < 8 || username.length < 6 || password.length < 6}>
              Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
