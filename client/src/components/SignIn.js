import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const SignIn = ({ setShowSignin }) => {
  const { setUser } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let t;
    if (showAlert) {
      t = setTimeout(() => setShowAlert(false), 3000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [showAlert]);

  const handleSignin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let reqBody = { username, password };
    axios
      .post("/user/auth/signin", reqBody)
      .then((response) => {
        setUsername("");
        setUser(response.data.user);
      })
      .catch(() => {
        setShowAlert(true);
      })
      .finally(() => {
        setPassword("");
        setIsLoading(false);
      });
  };

  return (
    <div className="py-4">
      <div className="d-flex text-center justify-content-center">
        <form onSubmit={handleSignin}>
          <h1 className="h3 mb-3 fw-normal">Sign-in</h1>

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

          <button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            disabled={!username || !password || isLoading}
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
              "Sign-in"
            )}
          </button>

          <p className="mt-3 mb-0">Don't have an account?</p>
          <p
            className="link-primary pointer"
            onClick={() => setShowSignin(false)}
          >
            Register now.
          </p>

          <div
            className={`alert alert-danger text-center ${
              !showAlert && "invisible"
            }`}
          >
            Incorrect username or password. Try again.
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
