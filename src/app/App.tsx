import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { RippleBadge } from './MaterialTheme/styled';
import { orange } from '@mui/material/colors';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { About } from './screens/About';
import { Users } from './screens/Users';
import { HomePage } from './screens/homePage';
import { ProductsPage } from './screens/productsPage';
import { OrdersPage } from './screens/ordersPage';
import { UserPage } from './screens/userPage';
import { HomeNavbar } from './components/headers/HomeNavber';
import { OtherNavbar } from './components/headers/OtherNavbar';
import { Footer } from './components/footer';
import '../css/app.css';
import "../css/navbar.css";
import { HelpPage } from './screens/helpPage';

function App() {
  const location = useLocation();
  console.log("location ", location);
  

  return (
      <>
        {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
        <Switch>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </> 
  );
}



export default App;
