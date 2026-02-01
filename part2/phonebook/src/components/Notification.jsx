const Notification = ({ message,color }) => {
    console.log("Notification Renderd. Message is: ", message);
    if (!message) {
        return null;
    }
    if (!color) {
        return (
        <div className="error">
            {message}
        </div>
    )
    }
    return (
        <div className="error red">
            {message}
        </div>
    )
    
}


export default Notification;