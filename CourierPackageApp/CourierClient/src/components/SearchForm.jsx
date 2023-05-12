import { useState, useContext } from "react";
import { AppContext } from "./Context";

function SearchForm() {
  const [minWeight, setMinWeight] = useState("");
  const [maxWeight, setMaxWeight] = useState("");
  const { setFilter, token } = useContext(AppContext);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilter({ najmanje: minWeight, najvise: maxWeight });
  };

  const handleCancel = () => {
    setMinWeight("");
    setMaxWeight("");
    setFilter(null);
  };

  return (
    <div>
      {token ? (
        <form onSubmit={handleFilter} className="searchForm">
          <h4>Search packages by weight:</h4>
          <div className="form-group">
            <label htmlFor="minWeight">Minimum weight:</label>
            <input
              type="number"
              id="minWeight"
              placeholder="Enter minimum weight"
              className="form-control"
              value={minWeight}
              onChange={(e) => setMinWeight(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxWeight">Maximum weight:</label>
            <input
              type="number"
              id="maxWeight"
              placeholder="Enter maximum weight"
              className="form-control"
              value={maxWeight}
              onChange={(e) => setMaxWeight(e.target.value)}
            />
          </div>
          <div className="filterBtn">
            <button type="submit" className="btn btn-success">
              Search
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default SearchForm;
