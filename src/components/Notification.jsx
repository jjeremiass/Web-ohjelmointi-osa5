const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message === "wrong username or password") 
  return (
    <div className="error">
      {message}
    </div>
  )
  return(
    <div className="added">
      {message}
    </div>
  )
  
}

export default Notification