import React, { Fragment, useState } from "react";
import "./App.css";
import { Typography } from "@material-ui/core";

import MainContainer from "./Components/UI/MainContainer";
import VINSearch from "./Components/UI/VINSearch";
import DecodedList from "./Components/UI/DecodedList";

function App() {
  const [values, setValues] = useState(null);
  const [isDetailedChecked, setIsDetailedChecked] = useState(false);

  const getValues = (data) => {
    setValues(data);
  };

  const detailedHandler = (selected) => {
    setIsDetailedChecked(selected);
  };

  return (
    <Fragment>
      <MainContainer>
        <Typography variant="h5" gutterBottom>
          <VINSearch
            onFetch={getValues}
            isDetailedChecked={isDetailedChecked}
            isDetailed={detailedHandler}
          />
          {values !== null && (
            <DecodedList values={values} isSelected={isDetailedChecked} />
          )}
        </Typography>
      </MainContainer>
    </Fragment>
  );
}

export default App;
