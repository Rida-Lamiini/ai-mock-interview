import { Button } from "@/components/ui/button"

import './App.css'
import { Outlet } from "react-router-dom"
import Header from "./components/ui/custom/Header"

function App() {

  return (
    <>
    <Header/>
    <Outlet/>
    
  
    </>
  )
}

export default App
