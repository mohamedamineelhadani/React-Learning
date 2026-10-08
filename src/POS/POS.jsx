import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Ticket from "./Ticket";
import Save from "./Save";

const PRODUCTS = [
  { name: "Barbeque Paneer", price: 3.5, category: "BBQ", available: true,
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center" },
  { name: "Bold BBQ Veggie Thin n Crispy", price: 4.2, category: "Pizza", available: true,
    img: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?w=400&h=300&fit=crop&crop=center" },
  { name: "Choco Volcano", price: 2.5, category: "Desserts", available: true,
    img: "https://images.unsplash.com/photo-1623334044303-241021148842?w=400&h=300&fit=crop&crop=center" },
  { name: "Chocolate Brownie", price: 2.0, category: "Desserts", available: true,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIzmbySkOEQSrSvM9BKtzXFoMwyUtxoDA0tg&s" },
  { name: "Chocolate Milkshake", price: 3.0, category: "Beverages", available: true,
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center" },
  { name: "Hara Bhara Kebab", price: 2.8, category: "Continental", available: false,
    img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&crop=center" },
  { name: "Margherita Pizza", price: 2.65, category: "Pizza", available: true,
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&crop=center" },
  { name: "Schezwan Noodle", price: 3.1, category: "Chinese", available: true,
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&crop=center" },
  { name: "Shanghai Noodle", price: 3.15, category: "Chinese", available: true,
    img: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=300&fit=crop&crop=center" },
  { name: "Strawberry Milkshake", price: 2.9, category: "Beverages", available: true,
    img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop&crop=center" },
  { name: "Veg Hot Garlic Steam Momo", price: 2.4, category: "Momos", available: false,
    img: "https://www.yumcurry.com/wp-content/uploads/2021/05/chilli-garlic-momos-feature-image.jpg" },
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
const TAX_RATE = 0.05;
const fmt = (n) => Number(n).toFixed(2);
const now = () => {
  const d = new Date();
  const pad = (v) => String(v).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const emptyTicket = (id = 1) => ({
  id,
  date: "0000-00-00 00:00:00",
  items: [],
  payment: { gross: 0, tax: 0, total: 0 },
});

const POS = () => {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [gross, setGross] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [openTicket, setOpenTicket] = useState(false);

  const [saved, setSaved] = useState([]);
  const [displaySave, setDisplaySave] = useState(false);
  const [alreadySave, setAlreadySave] = useState(false);
  const [ticketData, setTicketData] = useState(emptyTicket());

  /* ========= Totals ========= */
  useEffect(() => {
    const g = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    const t = g * TAX_RATE;
    setGross(g);
    setTax(t);
    setTotal(g + t);
  }, [cart]);

  /* ========= Cart actions ========= */
  const addToCart = (product) => {
    if (!product.available) return;
    setCart((prev) => {
      const exist = prev.find((i) => i.name === product.name);
      if (exist) {
        return prev.map((i) =>
          i.name === product.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1, unitPrice: product.price }];
    });
  };

  const deleteItem = (name) =>
    setCart((prev) => prev.filter((i) => i.name !== name));

  const clear = () => {
    setCart([]);
    setAlreadySave(false);
  };

  /* ========= Pay ========= */
  const pay = () => {
    if (total <= 0 || ticketData.payment.total > 0) return;
    setTicketData({
      id: saved.length + 1,
      date: now(),
      items: cart,
      payment: { gross: fmt(gross), tax: fmt(tax), total: fmt(total) },
    });
    clear();
    toast.success("Order created !");
    setOpenTicket(true);
  };

  /* ========= Save ========= */
  const addToSaved = () => {
    if (alreadySave) return;
    if (saved.some((s) => s.id === ticketData.id)) return;
    setSaved((prev) => [...prev, ticketData]);
    setAlreadySave(true);
  };

  const clearTicket = () => {
    setTicketData(emptyTicket(saved.length + 1));
    setAlreadySave(false);
    setOpenTicket(false);
  };

  /* ========= View details ========= */
  const viewDetails = (order) => {
    setTicketData(order);
    setAlreadySave(true);
    setDisplaySave(false);
    setOpenTicket(true);
  };

  return (
    <div className="pos">
      <ToastContainer autoClose={2000} position="top-right" />

      <Save
        data={saved}
        display={displaySave}
        view={viewDetails}
        onClose={() => setDisplaySave(false)}
      />


      {/* ================= MENU ================= */}
      <section className="pos__menu">
        <header className="pos__menu-header">Menu</header>

        <div className="pos__categories">
          {CATEGORIES.map((c, i) => (
            <button
              key={i}
              className={`cat-btn ${category === c ? "cat-btn--active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="pos__items">
          {PRODUCTS.filter((p) => category === "All" || p.category === category).map(
            (p, i) => (
              <div className="item-card" key={i}>
                <img src={p.img} alt={p.name} />
                <div className="item-name">{p.name}</div>
                <div className="item-price">${fmt(p.price)}</div>
                <button
                  className={`status-badge ${p.available ? "active" : "not"}`}
                  onClick={() => addToCart(p)}
                >
                  {p.available ? "Add" : "Sold out"}
                </button>
              </div>
            )
          )}
        </div>
      </section>



      {openTicket && (
        <Ticket
          data={ticketData}
          clear={clearTicket}
          save={addToSaved}
          alreadySave={alreadySave}
        /> )
      }

      {/* ================= ORDER ================= */}
      {!openTicket && (
        <section className="pos__order">
          <header className="pos__order-header">
            <strong>Order</strong>
            <div className="pos__order-actions">
              <button
                className="btn btn--ghost"
              onClick={() => setDisplaySave(true)}
            >
              History
            </button>
            <button className="btn btn--danger" onClick={clear}>
              Clear
            </button>
          </div>
        </header>

        <div className="pos__order-list">
          <table className="order-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>${fmt(item.unitPrice * item.qty)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => deleteItem(item.name)}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
              {cart.length === 0 && (
                <tr>
                  <td colSpan="4" className="order-empty">
                    No items yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="pos__totals">
          <div className="total-row">
            <span>Gross</span>
            <span>${fmt(gross)}</span>
          </div>
          <div className="total-row">
            <span>Tax (5%)</span>
            <span>${fmt(tax)}</span>
          </div>
          <div className="total-row total-row--final">
            <span>Net Total</span>
            <span>${fmt(total)}</span>
          </div>
        </div>

        <div className="pos__pay">
          {total > 0 && ticketData.payment.total == 0 ? (
            <button className="btn btn--primary btn--block" onClick={pay}>
              Pay
            </button>
          ) : (
            <p className="pos__hint">
              {ticketData.payment.total == 0
                ? "Choose an item to start"
                : alreadySave
                ? "Print or clear the order"
                : "Complete the order"}
            </p>
          )}
        </div>
      </section>
      )}
    </div>
  );
};

export default POS;