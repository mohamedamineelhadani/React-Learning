import React, { useEffect, useState } from "react";
import "./style.css";
import Ticket from "./Ticket";
import Save from "./Save";
import { ToastContainer , toast } from "react-toastify";
const POS = () => {
  const products = [
    {
      name: "Barbeque Paneer",
      price: 3.5,
      category: "BBQ",
      available: true,
      img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Bold BBQ Veggie Thin n Crispy",
      price: 4.2,
      category: "Pizza",
      available: true,
      img: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w-400&h=300&fit=crop&crop=center",
    },
    {
      name: "Choco Volcano",
      price: 2.5,
      category: "Desserts",
      available: true,
      img: "https://images.unsplash.com/photo-1623334044303-241021148842?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Chocolate Brownie",
      price: 2.0,
      category: "Desserts",
      available: true,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIzmbySkOEQSrSvM9BKtzXFoMwyUtxoDA0tg&s",
    },
    {
      name: "Chocolate Milkshake",
      price: 3.0,
      category: "Beverages",
      available: true,
      img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Hara Bhara Kebab",
      price: 2.8,
      category: "Continental",
      available: false,
      img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Margherita Pizza",
      price: 2.65,
      category: "Pizza",
      available: true,
      img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Schezwan Noodle",
      price: 3.1,
      category: "Chinese",
      available: true,
      img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Shanghai Noodle",
      price: 3.15,
      category: "Chinese",
      available: true,
      img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Strawberry Milkshake",
      price: 2.9,
      category: "Beverages",
      available: true,
      img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop&crop=center",
    },
    {
      name: "Veg Hot Garlic Steam Momo",
      price: 2.4,
      category: "Momos",
      available: false,
      img: "https://www.yumcurry.com/wp-content/uploads/2021/05/chilli-garlic-momos-feature-image.jpg",
    },
  ];
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  const [gross, setGros] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [displaySave,setDisplaySave] = useState(false);

  const [saved,setSaved]=useState([]);
  const [alreadySave,setAlreadySave]=useState(false);

  const [ticketData, setTicketData] = useState({
    id:saved.length + 1,
    date:"0000-00-00 00:00:00",
    items: [],
    payment: {
      gross: 0,
      tax: 0,
      total: 0,
    },
  });


  useEffect(() => {
    let newGross = 0;
    cart.forEach((item) => {
      newGross += item.price;
    });
    setGros(interval(newGross, 2));
    let newTax = newGross * 0.05;
    let newTotal = newGross + newTax;
    setTax(interval(newTax, 2));
    setTotal(interval(newTotal, 2));
  }, [cart]);

  function interval(number, n) {
    return number.toFixed(n);
  }
  function deleteItem(name) {
    setCart(cart.filter((item) => item.name != name));
  }
  function clear() {
    setCart([]);
    setAlreadySave(false);
  }
  function toggleSave(){
    setDisplaySave(!displaySave);
  }
  function dateTime(){
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  function clearTicket() {
    setTicketData({
      id:saved.length +1,
      date:"0000-00-00 00:00:00",
      items: [],
      payment: {
        gross: 0,
        tax: 0,
        total: 0,
      },
    });
  }

  function pay() {

    let newTicket = {
      id:saved.length +1,
      date:dateTime(),
      items: cart,
      payment: {
        gross: gross,
        tax: tax,
        total: total,
      },
    };

    if(total > 0 && ticketData.payment.total == 0 ){
      setTicketData(newTicket);
      clear();
      toast.success("the order is add");
      setAlreadySave(false);
    }
  }

  function addToSaved(){
    const exist = saved.find(save => save.id === ticketData.id);
    if(!exist && !alreadySave){
      setSaved([...saved,ticketData]);
    }
  }

  function viewDetails(obj){
    setTicketData(obj)
    toggleSave();
    setAlreadySave(true);
  }

  return (
    <div className="container">
      <ToastContainer autoClose={2000} />
      <Save data={saved} display={displaySave} view={viewDetails} />
      <Ticket data={ticketData} clear={clearTicket} save={addToSaved} alreadySave={alreadySave} />
      <div className="menu-section">
        <div className="header-bar">Item</div>
        <div className="category-filters">
          {categories.map((category, i) => (
            <button
              className="cat-btn"
              key={i}
              onClick={() => setCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="item-grid" id="menu-grid">
          {products
            .filter((product) => category === "All" || category === product.category)
            .map((product, i) => (
              <div className="item-card" key={i}>
                <img src={product.img} alt={product.name} />
                <div class="item-name">{product.name}</div>
                <button
                  class={`status-badge ${product.available ? "active" : "not"}`}
                  onClick={() => {
                    if (product.available) {
                      setCart((cart) => {
                        const isExist = cart.find((item) => item.name === product.name);
                        if (isExist) {
                          return cart.map((item) =>
                            item.name === product.name
                            ? {
                                ...item,
                                qty: item.qty + 1,
                                price: item.price + item.price / item.qty,
                              }
                            : item
                          );
                        }
                        return [...cart, { ...product, qty: 1 }];
                      });
                    }
                  }}
                >
                  {product.available ? "available" : "not available"}
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="order-section">
        <div className="order-header">
          <strong>Order</strong>
          <button className="new-order-btn" onClick={toggleSave}>Show All Orders</button>
          <button className="clear-order-btn" onClick={clear}>
            Clear
          </button>
        </div>

        <div className="order-display">
          <table className="order-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="cart-items">
              {cart.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{interval(item.price, 2)}</td>
                  <td>
                    <button
                      class="remove-btn"
                      onClick={() => deleteItem(item.name)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="totals-section">
          <div className="total-row">
            <span>Gross Total</span>
            <span id="gross-total">${gross}</span>
          </div>
          <div className="total-row">
            <span>Taxes (5%)</span>
            <span id="tax-amount">${tax}</span>
          </div>
          <hr />
          <div className="total-row" style={{ fontSize: "1.1em" }}>
            <span>Net Total</span>
            <span id="net-total">${total}</span>
          </div>
        </div>
        <div className="pay-footer">
          {(total > 0 && ticketData.payment.total == 0) 
            ? 
            <button className="pay-btn" onClick={pay}>Pay</button>
            :
            <p>{(ticketData.payment.total == 0 ) ? "Please shoose a meal" :`${alreadySave ? "print or clear the saved order"  : "Complet the order"}`}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default POS;
