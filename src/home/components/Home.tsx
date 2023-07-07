import { Outlet } from "react-router-dom"

import { Header } from "./Header"

const Home: React.FC = () => (
  <div className="flex flex-col w-full h-screen">
    <Header />
    <Outlet />
  </div>
)

export { Home }
