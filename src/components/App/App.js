import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((data) => setOrders(data.orders))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  const handleNewOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm onNewOrder={handleNewOrder} />
        </header>
        <Orders orders={orders} />
      </main>
    );
}

export default App;
