import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
  const api_key = "cw3rry7v6cra";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isSignupVisible, setIsSignupVisible] = useState(false);
    const [isBackVisible, setIsBackVisible] = useState(false);

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          
          <button  className="logoutbtn" onClick={logOut}> Log Out</button>
        </Chat>
      ) : (
        <>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h3 >Async</h3>

            <h1 >TIC TAC TOE  </h1>
            <h2>BY ABHISHEK AME</h2>
            {!isLoginVisible && !isSignupVisible && (
                <div>
                    <button className="loginbtn"onClick={() => {setIsLoginVisible(true); setIsBackVisible(true)}}>Login</button>
                    <button className="signbtn"onClick={() => {setIsSignupVisible(true); setIsBackVisible(true)}}>Sign Up</button>
                </div>
            )}
            {isLoginVisible && <Login setIsAuth={setIsAuth} />}
            {isSignupVisible && <SignUp setIsAuth={setIsAuth}/>}
            {isBackVisible && <button onClick={() => {setIsLoginVisible(false); setIsSignupVisible(false); setIsBackVisible(false)}}>Back</button>}
        </div>
         
        </>
      )}
    </div>
  );
}

export default App;
