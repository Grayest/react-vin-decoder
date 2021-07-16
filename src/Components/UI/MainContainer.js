import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const MainContainer = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false}>
          <Navbar />
          {props.children}
        <Footer />
      </Container>
    </React.Fragment>
  );
};

export default MainContainer;
