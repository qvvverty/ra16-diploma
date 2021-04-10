import { useState } from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const [isImgHovered, setImgHovered] = useState(false);
  const mouseEnterHandler = () => setImgHovered(true);
  const mouseLeaveHandler = () => setImgHovered(false);

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img 
          src={props.images[isImgHovered ? 1 : 0]}
          className="card-img-top img-fluid"
          alt={props.title}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        />
        <div className="card-body">
          <p className="card-text">{props.title}</p>
          <p className="card-text">{props.price} руб.</p>
          <Link to={'/catalog/' + props.id} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}
