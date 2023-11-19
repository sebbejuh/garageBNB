import { BrowserRouter, Route, Routes } from "react-router-dom";
//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import SearchBar from "./components/SearchBar";
//Auth
import { AuthProvider } from "./context/AuthContext";
//Views
import Home from "./views/Home";
import Car from "./views/Car";
import Motorcycle from "./views/Motorcycle";
import Checkout from "./views/Checkout";
import NotFound from "./views/NotFound"
import ListingDetails from "./views/ListingDetails";
import Payment from "./views/Payment";
import Bookings from "./views/Bookings"
import Login from "./views/Login"
import Register from "./views/Register"
//sass
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar SearchBar={<SearchBar />} /> {/*passes component as prop */}
        <MobileNav />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car" element={<Car />} />
            <Route path="/motorcycle" element={<Motorcycle />} />
            <Route path="/:id" element={<ListingDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
