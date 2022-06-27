import logo from './logo.svg';
import './css/App.css';
import Header from './components/layout/header'
import Footer from "./components/layout/footer";
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import Navigation from "./components/layout/navigation";
import Homepage from "./pages/homepage";
import Orderpage from "./pages/orderpage";
import Authorizedpage from "./pages/authorizedpage";
import Registerpage from "./pages/registerpage";
import Orderstatuspage from "./pages/orderstatuspage";
import React from "react";
import Ordersearchpage from "./pages/ordersearchpage";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const OrderstatusWrapper = (props) => {
            const params = useParams();
            return <Orderstatuspage {...{
                ...props,
                match: {params}
            }} />
        }

        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigation />}>
                        <Route index element={<Homepage />} />
                        <Route exact path="/order" element={<Orderpage />} />
                        <Route exact path="/order/:orderid" element={<OrderstatusWrapper />} />
                        <Route exact path="/order-search" element={<Ordersearchpage />} />
                        <Route exact path="/auth" element={<Authorizedpage />} />
                        <Route exact path="/register" element={<Registerpage />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        );
    }
}

export default App;