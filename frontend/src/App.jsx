import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import PandaGuide from './components/PandaGuide'
import MapPage from './pages/MapPage'
import RoutePage from './pages/RoutePage'
import ChallengePage from './pages/ChallengePage'
import CreativePage from './pages/CreativePage'

function AppInner() {
  const [pandaMsg, setPandaMsg] = useState(null)
  const { pathname } = useLocation()

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/"          element={<MapPage onPandaMsg={setPandaMsg} />} />
        <Route path="/map"       element={<MapPage onPandaMsg={setPandaMsg} />} />
        <Route path="/routes"    element={<RoutePage />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/creative"  element={<CreativePage />} />
      </Routes>
      <PandaGuide message={pandaMsg} page={pathname} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
