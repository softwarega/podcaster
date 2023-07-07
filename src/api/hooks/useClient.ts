import { search as clientSearch } from "../client"

const useClient = () => {
  const search = <T>(endpoint: string, filters?: URLSearchParams, signal?: AbortSignal, useAllOrigin?: boolean) =>
    clientSearch<T>(endpoint, filters, signal, useAllOrigin)

  return { search }
}

export { useClient }
