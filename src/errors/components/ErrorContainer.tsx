import { FC } from "react"
import { FallbackProps } from "react-error-boundary"

import { InternalServerErrorView } from "./InternalServerErrorView"
import { UnauthorizedErrorView } from "./UnauthorizedErrorView"
import { CustomError } from "../types"
import { NotFoundErrorView } from "./NotFoundErrorView"
import { BadRequestErrorView } from "./BadRequestErrorView"
import { ManyRequests } from "./ManyRequestsErrorView"

const ErrorContainer: FC<FallbackProps> = ({ error }) => {
  const code = (error as CustomError).cause?.name

  switch (code) {
    case "400":
      return <BadRequestErrorView error={error as CustomError} />
    case "401":
      return <UnauthorizedErrorView />
    case "404":
      return <NotFoundErrorView error={error as CustomError} />
    case "429":
      return <ManyRequests error={error as CustomError} />
    default:
      return <InternalServerErrorView error={error as CustomError} />
  }
}

export { ErrorContainer }
