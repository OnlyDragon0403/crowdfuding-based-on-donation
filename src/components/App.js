import React, { useEffect } from 'react';
import MenuHeader from './MenuHeader';
import CustomHeader from './CustomHeader';
import Content from './Content';
import Footer from './Footer';
import { Container, Divider } from 'semantic-ui-react';

import { useDispatch } from "react-redux";
import { doInitialiseContract } from "../slices/tron";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(doInitialiseContract());
  }, [dispatch]);

  return (
    <>
      <style>
          {`
              body, html {
                background-color: #f7f7f7 !important;
              }
              #main {
                  width : 80% !important;
              }
              .ui.borderless.menu {
                  background-color : #00b5ad;
              }
          `}
      </style>
      <Container textAlign='justified' fluid>
          {/* Heads up! We apply there some custom styling, you usually will not need it. */}
          <MenuHeader />
          <Container textAlign='justified' id="main">
            {/* <CustomHeader /> */}
            <Divider />
            <Content />
            <Footer />
          </Container>
      </Container>
    </>
  );
}

export default App;
