import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import "./ticket.css";
const Ticket = ({data,clear,save,alreadySave}) => {
    const ticket = useRef(null);

    const handlePrint = useReactToPrint({
        contentRef: ticket, 
        documentTitle: `Order_${new Date().getTime()}`,
        onAfterPrint: () =>{
            clear();
            if(!alreadySave) save();
        },
    });

 
  return (
    <div className='ticket-container' ref={ticket} >
    <div className="title">
        <h2>RECEIPT</h2>
        <span>{data.date}</span>
        <p>Order #{data.id}</p>
    </div>
    <div className="ticket" >
        <div className="items-list">
            {data.items.map((item, index) => (
                <div className="ticket-item" key={index}>
                    <div className="item-info">
                        <span className="qty">{item.qty}x</span>
                        <span className="name">{item.name}</span>
                    </div>
                    <span className="price">${(item.price * item.qty).toFixed(2)}</span>
                </div>
            ))}
        </div>

        <div className="divider"></div>
        <div className="summary">
            <div className="summary-row">
                <span>Gross Amount</span>
                <span>${data.payment.gross}</span>
            </div>
            <div className="summary-row">
                <span>Tax (5%)</span>
                <span>${data.payment.tax}</span>
            </div>
            <div className="summary-row total">
                <span>TOTAL</span>
                <span>${data.payment.total}</span>
            </div>
        </div>
    </div>
    <div className="btns">
        {data.payment.total >  0 && <button className="cancellation" onClick={clear}>{alreadySave ? "Clear" : "Cancel"}</button>}
        {data.payment.total > 0 && <button className="print-save" onClick={handlePrint}>{alreadySave ? "Print" : "Print & Save"}</button>}
    </div>
</div>
  )
}

export default Ticket