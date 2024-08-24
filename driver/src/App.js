import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailOrder from "./detailOrder";
import Home from "./home";
import Order from "./Order";
import Phananh from './PhanAnh'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} /> {/* Use element instead of component */}
        <Route exact path="/createOrder" element={<Order />} /> {/* Use element instead of component */}
        <Route path="/detail-order/:orderId/:driverId" element={<DetailOrder />} />
        <Route path="/phananh" element={<Phananh />} />
      </Routes>
    </Router>
  );
}

export default App;
