const Message = ({text}) => {
  return (
    <div
      className="message"
      style={{
        background: "linear-gradient(to right, pink, rgb(0, 217, 255))",
        padding: "2px",
        borderRadius: "10px",
        width:"90%",
        maxWidth: "650px",
        boxShadow: "0 0 5px white",
        border: "2px solid rgba(255, 255, 255, 0.425)",
        color: "white",
        fontSize: "25px",
        marginBottom:"10px",
        fontWeight:"bold",
        textAlign:"center"        
      }}
    >
      {text}
    </div>
  );
};

export default Message;
