import { useEffect, useState } from "react";
import Preloader from "./Preloader";
import Product from "./Product";

export default function TopSales() {
  const [loading, setLoading] = useState(false);
  const [salesList, setSalesList] = useState([]);

  useEffect(() => {
    const fetchTopSales = async () => {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_API + 'top-sales');
        const topSalesList = await response.json();
        setSalesList(topSalesList);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopSales();
  }, []);

  if (salesList.length === 0 && !loading) return null;

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading ?
        <Preloader />
        : <div className="row">
          {salesList.map(sale => <Product
            key={sale.id}
            id={sale.id}
            title={sale.title}
            price={sale.price}
            images={sale.images}
          />)}
        </div>
      }
    </section>
  )
}
