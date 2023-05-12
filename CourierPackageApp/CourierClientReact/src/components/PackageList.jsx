import { useContext } from "react";
import Package from "./Package";
import { AppContext } from "./Context";

function PackageList() {
  const { token, packages, isLoading, setIsDeleted, isDeleted } =
    useContext(AppContext);
  const handleDelete = async (id) => {
    const deleteRequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.token,
      },
    };

    await fetch("https://localhost:44302/api/paketi/" + id, deleteRequest)
      .then((resp) => {
        if (resp.ok) {
          setIsDeleted(!isDeleted);
        }
      })
      .catch((er) =>
        alert("Error occurred during delete process: " + er.message)
      );
  };

  return (
    <section>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <section>
          {!token ? (
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Weight(kg)</th>
                  <th>Courier</th>
                </tr>
              </thead>
              <Package packages={packages} handleDelete={handleDelete} />
            </table>
          ) : (
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Weight(kg)</th>
                  <th>Courier</th>
                  <th>Shipping(RSD)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <Package packages={packages} handleDelete={handleDelete} />
            </table>
          )}
        </section>
      )}
    </section>
  );
}

export default PackageList;
