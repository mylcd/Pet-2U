import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginLogo from "./LoginLogo.svg";

function LoginFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // if already logged in, go to main page
  if (sessionUser) return <Navigate to="/" replace={true} />;

  // submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
        navigate("/");
      }
    }
  };

  // login as demo user
  const handleDemoSubmit = () => {
    return dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }))
      .then(() => {
        if(location.state) {
          navigate(location.state.origin);
        }
        else {
          navigate("/");
        }
      }
    );
  }

  // navigate to signup page
  const handleSignup = () => {
    if(location.state) {
      // pass down the previous location
      navigate("/signup",
        {state: {
          origin : location.state.origin
        }}
      );
    }
    else {
      navigate("/signup");
    }
  }

  return (
    <div className="middle">
      <div className='apple-font auth-page'>
        <div className='md-element'>
          <img className='md-icon'
            src={LoginLogo}
          />
        </div>

        <div className='md-element'>
          <button
            className='apple-font md-demo-button'
            onClick={handleDemoSubmit}>
              Log in as Demo User
          </button>
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
            <b>Password</b>
          </label>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
            {!errors.email && errors.password && (
              <div className='error'>{errors.password}</div>
            )}
          </div>



          <button type="submit" className='apple-font md-button'
            disabled={!email || !password || email.length < 8 || password.length < 6}>
              Log In
          </button>

          <div>
            Don’t have an account? <label onClick={handleSignup}>Sign up</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
