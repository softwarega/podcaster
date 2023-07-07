import { createElement } from "react"
import { toast } from "react-toastify"

import { NotificationError } from "./components"
import { CustomError } from "./types"

const displayNotificationError = (error: CustomError) => {
  toast.error(createElement(NotificationError, { error }))
}

export { displayNotificationError }
