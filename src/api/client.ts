const apiUrl = process.env.REACT_APP_API_URL
const apiAllOriginsUrl = process.env.REACT_APP_API_ALL_ORIGINS_URL

const client = async (endpoint: string, { method, ...customConfig }: RequestInit, useAllOrigin?: boolean) => {
  const config = {
    method,
    ...customConfig,
  }

  const url = useAllOrigin
    ? `${apiAllOriginsUrl}?url=${encodeURIComponent(`${apiUrl}/${endpoint}`)}`
    : `${apiUrl}/${endpoint}`

  const response = await fetch(url, config)

  const data = await response.json().then((data) => (useAllOrigin ? parseLookup(data.contents) : data))

  if (response.ok) {
    return data
  }

  switch (response.status) {
    case 401:
      throw new Error("Unauthorized", { cause: { name: "401", message: "Unauthorized" } })
    case 403:
      throw new Error("Forbidden", { cause: { name: "403", message: "Forbidden" } })
    case 429:
      throw new Error("Too many requests", { cause: { name: "429", message: data.error.message } })
    default:
      throw new Error("Not supported", {
        cause: { name: "not-supported", message: `Invalid response: ${response.statusText} ${response.status}` },
      })
  }
}

const search = async <T>(endpoint: string, filters?: URLSearchParams, signal?: AbortSignal, useAllOrigin?: boolean) => {
  const data = await client(
    `${endpoint}${filters ? `?${filters}` : ""}`,
    {
      method: "GET",
      signal,
    },
    useAllOrigin,
  )

  return data as T
}

const parseLookup = (lookupResponse: string) => JSON.parse(lookupResponse)

export { search }
