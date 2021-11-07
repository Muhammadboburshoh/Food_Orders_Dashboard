import './App.css'

import { Switch, Route } from "react-router-dom"

import Home from "./Companents/Pages/Home/Home"
import Clients from "./Companents/Pages/Clients/Clients"
import Products from "./Companents/Pages/Products/Products"
import Product from "./Companents/Pages/Products/Product"
import Private from "./Routes/Private"
import Login from "./Companents/Pages/Login/Login"

function App() {
  return (
    <>
    <Switch>

      <Private exact path="/clients">
        <Clients />
      </Private>

      <Route exact path="/signin">
        <Login />
      </Route>

      <Private exact path="/products/product">
        <Product />
      </Private>

      <Private exact path="/products">
        <Products />
      </Private>
      
      <Private exact path="/">
        <Home />
      </Private>

    </Switch>

    </>
  )
}

export default App
