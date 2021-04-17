import { useEffect, useState } from 'react';
import CartContext from './CartContext';

const formInitial = {
  phone: '',
  address: '',
  rulesAgreement: false
};

const statusMessageInitial = {
  success: true,
  display: false
}

export default function CartProvider(props) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState(formInitial);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(statusMessageInitial);

  useEffect(() => {
    if (cartItems.length > 0) localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setTotalAmount(cartItems.reduce((previous, item) => previous += item.price * item.count, 0));
    setCartCounter(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

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
    const formDataString = localStorage.getItem('formData');
    if (!formDataString) return;

    try {
      setFormData(JSON.parse(formDataString));
    } catch {
      console.error('Error parsing form data JSON');
    }
  }, []);

  const addToCart = newCartItem => {
    const cartItemsUpdated = [...cartItems];
    let itemFound = false;
    for (const item of cartItemsUpdated) {
      if (
        newCartItem.id === item.id
        && newCartItem.size === item.size
        && newCartItem.price === item.price
      ) {
        item.count += newCartItem.count;
        itemFound = true;
      }
    }
    if (!itemFound) cartItemsUpdated.push(newCartItem);
    setCartItems(cartItemsUpdated);
  }

  const removeFromCart = id => {
    const cartItemsUpdated = cartItems.filter(item => item.id !== id);
    setCartItems(cartItemsUpdated);
    localStorage.setItem('cartItems', cartItemsUpdated);
  };

  const updateFormData = event => {
    const formDataUpdated = {
      ...formData,
      [event.target.name]: event.target[event.target.name === 'rulesAgreement' ? 'checked' : 'value']
    };
    setFormData(formDataUpdated);
    localStorage.setItem('formData', JSON.stringify(formDataUpdated));
  };

  const sendOrder = async () => {
    setLoading(true);

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

    setLoading(false);
    setStatusMessage({ success: response.ok, display: true });
    setTimeout(() => setStatusMessage(statusMessageInitial), 5000);

    if (response.ok) {
      setCartItems([]);
      localStorage.setItem('cartItems', '[]');
      setFormData(formInitial);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalAmount,
        cartCounter,
        formData,
        updateFormData,
        sendOrder,
        loading,
        statusMessage
      }}>
      {props.children}
    </CartContext.Provider>
  )
}
