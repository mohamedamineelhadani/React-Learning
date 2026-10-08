import React from 'react';
import './save.css';

const Save = ({ data,display,view }) => {
  return (
    <div className={`save-container ${display ? "active" :""}`}>
      <div className="save-header">
        <h2>Order History</h2>
        <span className="order-count">{data.length} Orders Saved</span>
      </div>

      <div className="orders-grid">
        {data.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-card-header">
              <span className="order-id">ID: #{order.id}</span>
              <span className="order-date">{order.date}</span>
            </div>
            
            <div className="order-body">
              <div className="info-row">
                <span>Items:</span>
                <span className="val">{order.items.length} Items</span>
              </div>
              <div className="info-row">
                <span>Gross:</span>
                <span className="val">${order.payment.gross}</span>
              </div>
              <div className="info-row">
                <span>Tax:</span>
                <span className="val">${order.payment.tax}</span>
              </div>
            </div>

            <div className="order-footer">
              <span className="total-label">Total Amount</span>
              <span className="total-val">${order.payment.total}</span>
            </div>
            
            <button className="view-btn" onClick={()=>view(order)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Save;