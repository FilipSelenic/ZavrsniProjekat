import { useContext } from "react";
import { AppContext } from "./Context";

function Package({ packages, handleDelete }) {
  const { token } = useContext(AppContext);
  return packages.map((box) => (
    <tbody key={box.id}>
      {token ? (
        <tr>
          <td>{box.posiljalac}</td>
          <td>{box.primalac}</td>
          <td>{box.tezina}</td>
          <td>{box.kurirIme}</td>
          <td>{box.cenaPostarine}</td>
          <td>
            <button
              onClick={() => handleDelete(box.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{box.posiljalac}</td>
          <td>{box.primalac}</td>
          <td>{box.tezina}</td>
          <td>{box.kurirIme}</td>
        </tr>
      )}
    </tbody>
  ));
}

export default Package;
