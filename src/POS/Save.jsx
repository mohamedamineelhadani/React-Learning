import React from "react";
import "./save.css";

const Save = ({ data, display, view, onClose }) => {
  return (
    <div className={`save ${display ? "save--open" : ""}`}>
      <div className="save__header">
        <h2>Order History</h2>
        <div className="save__header-right">
          <span className="save__count">{data.length} saved</span>
          <button className="save__close" onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      <div className="save__grid">
        {data.length === 0 && (
          <p className="save__empty">No orders saved yet.</p>
        )}

        {data.map((order, i) => (
          <div className="save-card" key={i}>
            <div className="save-card__header">
              <span className="save-card__id">Order #{order.id}</span>
              <span className="save-card__date">{order.date}</span>
            </div>

            <div className="save-card__row">
              <span>Items</span>
              <span className="save-card__val">{order.items.length}</span>
            </div>
            <div className="save-card__row">
              <span>Gross</span>
              <span className="save-card__val">${order.payment.gross}</span>
            </div>
            <div className="save-card__row">
              <span>Tax</span>
              <span className="save-card__val">${order.payment.tax}</span>
            </div>

            <div className="save-card__total">
              <span>Total</span>
              <span>${order.payment.total}</span>
            </div>

            <button className="save-card__btn" onClick={() => view(order)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;