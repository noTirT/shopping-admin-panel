import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { Management } from "./pages/Management";
import { Orders } from "./pages/Orders";
import { ManagementProvider } from "./context/management/ManagementContext";
import { OrderProvider } from "./context/order/OrderContext";

function App() {
    return (
        <ManagementProvider>
            <OrderProvider>
                <NavBar />
                <Container className="mb-4 mt-4">
                    <Routes>
                        <Route path="/" element={<Management />} />
                        <Route path="/orders" element={<Orders />} />
                    </Routes>
                </Container>
            </OrderProvider>
        </ManagementProvider>
    );
}

export default App;
