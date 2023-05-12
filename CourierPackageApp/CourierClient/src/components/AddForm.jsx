import { useContext, useState, useEffect } from "react";
import { AppContext } from "./Context";

function AddForm() {
  const [couriers, setCouriers] = useState([]);
  const [courier, setCourier] = useState("");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");

  const { isAdded, setIsAdded, token } = useContext(AppContext);

  const getCouriers = async () => {
    await fetch("https://localhost:44302/api/kuriri")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setCouriers(data);
      })
      .catch((er) => {
        alert("An error has occurred during fetching data: " + er.message);
        setCouriers([]);
      });
  };

  const handleChange = (value) => {
    setCourier(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.token,
      },
      body: JSON.stringify({
        posiljalac: sender,
        primalac: receiver,
        tezina: weight,
        cenaPostarine: price,
        kurirId: courier,
      }),
    };

    await fetch("https://localhost:44302/api/paketi", request)
      .then((res) => {
        if (res.status === 201) {
          setIsAdded(!isAdded);
          setCourier("");
          setSender("");
          setReceiver("");
          setWeight("");
          setPrice("");
        }
      })
      .catch((er) =>
        alert("An error has occurred during adding process: " + er.message)
      );
  };

  const handleCancel = () => {
    setCourier("");
    setSender("");
    setReceiver("");
    setWeight("");
    setPrice("");
  };

  useEffect(() => {
    getCouriers();
  }, []);

  return (
    <div>
      {token ? (
        <form onSubmit={handleSubmit} className="addForm">
          <h3>Add a new package:</h3>
          <div className="form-group">
            <label htmlFor="orgUnit">Courier:</label>
            <select
              id="addCourier"
              className="form-select"
              onChange={(e) => handleChange(e.target.value)}
            >
              {couriers.map((courier) => {
                return (
                  <option value={courier.id} key={courier.id}>
                    {courier.ime}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="role">Sender:</label>
            <input
              type="text"
              id="sender"
              placeholder="Enter sender name:"
              className="form-control"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstAndLastName">Receiver:</label>
            <input
              type="text"
              id="receiver"
              placeholder="Enter receiver name:"
              className="form-control"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthYear">Weight:</label>
            <input
              type="number"
              id="weight"
              placeholder="Enter weight of package:"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="employmentYear">Price:</label>
            <input
              type="number"
              id="price"
              placeholder="Enter price of shipping:"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="filterBtn">
            <button type="submit" className="btn btn-success">
              Add
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

export default AddForm;
