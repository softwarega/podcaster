import { Outlet } from "react-router-dom"

import { PodcastContainer } from "podcasts"

import { Header } from "./Header"

const Home: React.FC = () => (
  <div className="flex flex-col w-full h-screen">
    <Header />
    <PodcastContainer />
  </div>
)

export { Home }
