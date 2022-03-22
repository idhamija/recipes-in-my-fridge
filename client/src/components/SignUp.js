import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const SignUp = ({ setShowSignin }) => {
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let reqBody = { name, username, email, password };
    axios
      .post("/user/auth/signup", reqBody)
      .then(function (response) {
        reqBody = { username, password };
        axios
          .post("/user/auth/signin", reqBody)
          .then((response) => {
            setUser(response.data.user);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setPassword("");
      });
  };

  return (
    <div className="py-4">
      <div className="d-flex text-center justify-content-center align-items-center">
        <form onSubmit={handleSignup}>
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <input
            type="text"
            className="form-control my-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control my-3"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="form-control my-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control my-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register Now
        </button> */}

          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            disabled={!name || !email || !username || !password || isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border"
                  role="status"
                ></span>
                <span className="visually-hidden">Loading...</span>
              </>
            ) : (
              "Register Now"
            )}
          </button>

          <p className="mt-3 mb-0">Already have an account? </p>
          <p
            className="link-primary pointer"
            onClick={() => setShowSignin(true)}
          >
            Sign-in instead.
          </p>
          <div className="alert alert-danger text-center invisible">
            Incorrect username or password. Try again.
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
