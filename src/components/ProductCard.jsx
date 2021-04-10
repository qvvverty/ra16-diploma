import { useEffect, useState } from "react";
import Preloader from "./Preloader";

const emptyProduct = {
  title: '',
  images: [''],
  sizes: [],
  sku: '',
  manufacturer: '',
  color: '',
  material: '',
  season: '',
  reason: ''
}

export default function ProductCard(props) {
  const [product, setProduct] = useState(emptyProduct);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_API
          + 'items/'
          + props.match.params.id
        );
        const product = await response.json();
        setProduct(product);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [props.match.params.id]);

  const incrQtyHandler = () => {
    if (quantity === 10) return;
    setQuantity(quantity + 1);
  }

  const decrQtyHandler = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  }

  const addToCartBtnHandler = event => {
    event.preventDefault();
    props.history.push('/cart');
  }

  if (loading) return (
    <div style={{ margin: '75px auto' }}>
      <Preloader />
    </div>
  )

  return (
    <section className="catalog-item">
      <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            className="img-fluid"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product.reason}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>
              Размеры в наличии:
              {product.sizes
                .filter(size => size.avalible)
                .map(size => {
                  return (
                    <span
                      className={
                        'catalog-item-size'
                        + (size.size === selectedSize ? ' selected' : '')
                      }
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}>
                      {size.size}
                    </span>
                  )
                })
              }
            </p>
            <p>Количество: <span className="btn-group btn-group-sm pl-2">
              <button className="btn btn-secondary" onClick={decrQtyHandler}>-</button>
              <span className="btn btn-outline-primary">{quantity}</span>
              <button className="btn btn-secondary" onClick={incrQtyHandler}>+</button>
            </span>
            </p>
          </div>
          <button
            className="btn btn-danger btn-block btn-lg"
            disabled={!selectedSize}
            onClick={addToCartBtnHandler}>
            В корзину
          </button>
        </div>
      </div>
    </section>
  )
}
