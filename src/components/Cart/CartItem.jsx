import { Link } from "react-router-dom";

export default function CartItem(props) {
  return (
    <tr>
      <th scope="row">{props.tableCount}</th>
      <td><Link to={'/catalog/' + props.id}>{props.title}</Link></td>
      <td>{props.size}</td>
      <td>{props.count}</td>
      <td>{props.price} руб.</td>
      <td>{props.price * props.count} руб.</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={props.removeBtnHandler}>
          Удалить
        </button>
      </td>
    </tr>
  )
}
