import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Home = () => {
  const [showSignin, setShowSignin] = useState(true);

  return (
    <div className="my-5">
      {showSignin ? (
        <SignIn setShowSignin={setShowSignin} />
      ) : (
        <SignUp setShowSignin={setShowSignin} />
      )}
    </div>
  );
};

export default Home;
