import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./ticket.css";

const Ticket = ({ data, clear, save, alreadySave }) => {
  const ticketRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: ticketRef,
    documentTitle: `Order_${new Date().getTime()}`,
    onAfterPrint: () => {
      clear();
      if (!alreadySave) save();
    },
  });

  const hasOrder = data.payment.total > 0;

  return (
    <div className="ticket" ref={ticketRef}>
      <div className="ticket__head">
        <h2>RECEIPT</h2>
        <span>{data.date}</span>
        <p>Order #{data.id}</p>
      </div>

      <div className="ticket__items">
        {data.items.map((item, i) => (
          <div className="ticket__item" key={i}>
            <div className="ticket__item-info">
              <span className="ticket__qty">{item.qty}×</span>
              <span className="ticket__name">{item.name}</span>
            </div>
            <span className="ticket__price">
              ${(item.unitPrice * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="ticket__divider" />

      <div className="ticket__summary">
        <div className="ticket__row">
          <span>Gross</span>
          <span>${data.payment.gross}</span>
        </div>
        <div className="ticket__row">
          <span>Tax (5%)</span>
          <span>${data.payment.tax}</span>
        </div>
        <div className="ticket__row ticket__row--total">
          <span>TOTAL</span>
          <span>${data.payment.total}</span>
        </div>
      </div>

      {hasOrder && (
        <div className="ticket__actions">
          <button className="ticket__btn ticket__btn--cancel" onClick={clear}>
            {alreadySave ? "Clear" : "Cancel"}
          </button>
          <button
            className="ticket__btn ticket__btn--print"
            onClick={handlePrint}
          >
            {alreadySave ? "Print" : "Print & Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Ticket;