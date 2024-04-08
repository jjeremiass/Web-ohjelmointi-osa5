const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div>
        error {message}
      </div>
    )
  }
  
  export default Notification