const apiUrl = process.env.REACT_APP_API_URL

const client = async (endpoint: string, { method, ...customConfig }: RequestInit) => {
  const config = {
    method,
    ...customConfig,
  }

  const response = await fetch(`${apiUrl}/${endpoint}`, config)

  const data = await response.json()

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

const read = async <T>(endpoint: string, id: string, filters?: URLSearchParams, signal?: AbortSignal) => {
  const data = await client(`${endpoint}/${id}${filters ? `?${filters}` : ""}`, {
    method: "GET",
    signal,
  })

  return data as T
}

const search = async <T>(endpoint: string, filters?: URLSearchParams, signal?: AbortSignal) => {
  const data = await client(`${endpoint}${filters ? `?${filters}` : ""}`, {
    method: "GET",
    signal,
  })

  return data as T
}

export { read, search }
