import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

import { Home } from "home"
import { ErrorContainer, NotFoundView } from "errors"
import { PodcastContainer, PodcastDetailsContainer } from "podcasts"

import "./App.css"

function App() {
  const queryClient = new QueryClient()

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              FallbackComponent={ErrorContainer}
              onReset={reset}
              onError={(error) => {
                console.log(error)
              }}
            >
              <div className="flex h-screen w-full overflow-hidden bg-slate-50">
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route index element={<PodcastContainer />} />
                    <Route path="podcast/:id" element={<PodcastDetailsContainer />} />
                  </Route>
                  <Route path="*" element={<NotFoundView />} />
                </Routes>
              </div>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
