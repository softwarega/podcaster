import { read as clientRead, search as clientSearch } from "../client"

const useClient = () => {
  const read = <T>(endpoint: string, id: string, filters?: URLSearchParams) => clientRead<T>(endpoint, id, filters)

  const search = <T>(endpoint: string, filters?: URLSearchParams, signal?: AbortSignal) =>
    clientSearch<T>(endpoint, filters, signal)

  return { read, search }
}

export { useClient }
