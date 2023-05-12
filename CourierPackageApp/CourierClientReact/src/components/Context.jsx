import { useState, useEffect, createContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [token, setToken] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const getPackages = async () => {
    let request = {};
    let url = "";

    if (!filter) {
      url = "https://localhost:44302/api/paketi/";
      request = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
    }

    if (filter) {
      url = "https://localhost:44302/api/pretraga";
      request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.token,
        },
        body: JSON.stringify(filter),
      };
    }

    await fetch(url, request)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPackages(data);
      })
      .catch((e) => alert("Error occurred during fetching data: " + e.message));

    setLoading(false);
  };

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      setToken(userToken);
    } else {
      setToken(null);
    }
  };

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const deleteToken = () => {
    const tokenString = sessionStorage.getItem("token");
    if (tokenString) {
      sessionStorage.removeItem("token");
      setToken(null);
      setFilter(null);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getPackages();
  }, [filter, token, isDeleted, isAdded]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        packages,
        setPackages,
        token,
        saveToken,
        deleteToken,
        setFilter,
        isDeleted,
        setIsDeleted,
        isAdded,
        setIsAdded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
