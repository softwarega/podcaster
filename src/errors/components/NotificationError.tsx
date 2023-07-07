import { FC } from "react"

import { CustomError } from "errors"

const NotificationError: FC<Props> = ({ error: { message, cause } }) => (
  <div className="flex flex-col">
    <p className="font-bold">{message}</p>
    <p>{cause?.message}</p>
  </div>
)

type Props = { error: CustomError }

export { NotificationError }
