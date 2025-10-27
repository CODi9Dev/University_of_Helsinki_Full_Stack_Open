import { useEffect, useState } from "react"

const Notification = ({ message, type }) => {

  if (message === null) {
    return null
  }

  const typeError = type === 'success' ? 'success' : 'error'

  const style = 'notification ' + typeError

  return (
    <div className={style}>
      {message}
    </div>
  )
}

export default Notification