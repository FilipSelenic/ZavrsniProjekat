import { Link } from "react-router-dom";
import CourierList from "./PackageList";
import { AppContext } from "./Context";
import { useContext } from "react";
import Navbar from "./Navbar";
import PackageList from "./PackageList";
import AddForm from "./AddForm";
import SearchForm from "./SearchForm";
function Home() {
  const { token } = useContext(AppContext);

  return (
    <div className="container">
      <SearchForm />
      <PackageList />
      <AddForm />
    </div>
  );
}

export default Home;
