import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import HomePageScreen from "./Page/Components/DefaultPageScreen";
import PageScreen from "./Page/Components/PageScreen";
import { errorSelector, resetError } from "./Page/reducer";
import { ErrorEnum } from "./utils/errors";

function AppLayout() {
  const dispatch = useDispatch();
  const error = useSelector(errorSelector);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(error ? true : false);
  }, [error]);

  const errorMessage = () => {
    switch (error) {
      case ErrorEnum.BAD_CONNECTION:
        return "This was not supposed to happen... Did you start the API?";
      case ErrorEnum.SAME_TITLE:
        return "Another page has the same title... Please choose another one";
      default:
        return "This was not supposed to happen...";
    }
  };

  return (
    <>
      <Routes>
          <Route path="/" element={<HomePageScreen/>}/>
          <Route path='/:title' element={<PageScreen/>} />
      </Routes>

      <Modal show={showError} onHide={() => dispatch(resetError())}>
        <Modal.Header closeButton>
          <Modal.Title>{error}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage()}</Modal.Body>
        {error === ErrorEnum.SAME_TITLE ?
          <Modal.Footer>
            <Button
              variant="outline-warning"
              onClick={window.location.reload}
            >
              Refresh
            </Button>
          </Modal.Footer>
        : null }
      </Modal>
    </>
  );
}

export default AppLayout;