import { useEffect, useState } from "react";
import CartItem from "./CartItem";

const formInitial = {
  phone: '',
  address: '',
  rulesAgreement: false
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState(formInitial);

  useEffect(() => {
    const cartItemsString = localStorage.getItem('cartItems');
    if (!cartItemsString) return;

    try {
      setCartItems(JSON.parse(cartItemsString));
    } catch {
      console.error('Error parsing cart JSON');
    }
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((previous, item) => previous += item.price * item.count, 0);
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    const formDataString = localStorage.getItem('formData');
    if (!formDataString) return;
    try {
      setFormData(JSON.parse(formDataString));
    } catch {
      console.error('Error parsing form data JSON');
    }
  }, []);

  const removeItemBtnHandler = id => {
    const cartUpdated = cartItems.filter(item => item.id !== id);
    setCartItems(cartUpdated);
    localStorage.setItem('cartItems', JSON.stringify(cartUpdated));
  };

  const formInputHandler = event => {
    const formDataUpdated = {
      ...formData,
      [event.target.name]: event.target[event.target.name === 'rulesAgreement' ? 'checked' : 'value']
    };
    setFormData(formDataUpdated);
    localStorage.setItem('formData', JSON.stringify(formDataUpdated));
  };

  const formSubmitHandler = async event => {
    event.preventDefault();

    const response = await fetch(process.env.REACT_APP_API + 'order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          items: cartItems.map(item => {
            return { id: +item.id, price: item.price, count: item.count }
          }),
          owner: {
            phone: formData.phone,
            address: formData.address
          }
        }
      )
    });
    if (response.ok) {
      console.log(response);
    }
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              return (
                <CartItem
                  key={item.id}
                  {...item}
                  tableCount={index + 1}
                  removeBtnHandler={() => removeItemBtnHandler(item.id)}
                />
              )
            })}
            <tr>
              <td colSpan="5" className="text-right">Общая стоимость</td>
              <td>{totalAmount} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <form className="card-body" onSubmit={formSubmitHandler}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Ваш телефон"
                onChange={formInputHandler}
                value={formData.phone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                name="address"
                placeholder="Адрес доставки"
                onChange={formInputHandler}
                value={formData.address}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                name="rulesAgreement"
                checked={formData.rulesAgreement}
                onChange={formInputHandler}
              />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button
              type="submit"
              className="btn btn-outline-secondary"
              disabled={!formData.rulesAgreement || !formData.phone || !formData.address}>
              Оформить
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
