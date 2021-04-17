import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import Preloader from "../Preloader";
import StatusMessage from "../StatusMessage";
import CartItem from "./CartItem";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    totalAmount,
    formData,
    updateFormData,
    sendOrder,
    loading,
    statusMessage
  } = useContext(CartContext);

  const formSubmitHandler = event => {
    event.preventDefault();
    sendOrder();
  };

  if (loading) return (
    <div style={{ margin: '75px auto' }}>
      <Preloader />
    </div>
  );

  if (statusMessage.display) return <StatusMessage success={statusMessage.success} />

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
                  removeBtnHandler={() => removeFromCart(item.id)}
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
                onChange={updateFormData}
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
                onChange={updateFormData}
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
                onChange={updateFormData}
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
