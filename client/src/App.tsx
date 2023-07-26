import { useEffect, useState } from "react";
import { GithubUser } from "./types";

function App() {
  const [user, setUser] = useState<GithubUser | null>(null);

  function handleLogInClick() {
    window.open(import.meta.env.VITE_SERVER_URL + "/auth/login", "_self");
  }

  function handleLogoutClick() {
    fetch(import.meta.env.VITE_SERVER_URL + "/auth/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(null);
        }
      })
      .catch((error) => {
        console.log("Failed to logout");
        console.log("Error: ", error);
      });
  }

  useEffect(() => {
    // Check if the user is authenticated
    if (!user) {
      fetch(import.meta.env.VITE_SERVER_URL + "/auth/check", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.response) {
            setUser(data.user);
          } else {
            console.log("User is not authenticated");
          }
        })
        .catch(() => {
          console.log("Failed to check");
        });
    }
  }, []);

  console.log(user);

  return (
    <div>
      {!user && <button onClick={handleLogInClick}>Log in</button>}
      {user && <button onClick={handleLogoutClick}>Logout</button>}
      {user && (
        <div>
          <img
            src={user._json.avatar_url}
            alt="Profile picture"
            width={100}
            height={100}
          />
          <h2>Username: {user.username}</h2>
          <h2>Display name: {user.displayName}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
