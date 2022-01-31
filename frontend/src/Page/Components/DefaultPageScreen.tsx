import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import PageContent from "./PageContent";
import { getPage } from "../actions";
import { currentPageSelector } from "../reducer";

function HomePageScreen() {
  const dispatch = useDispatch();
  const page = useSelector(currentPageSelector);

  useEffect(() => {
    dispatch(getPage({title: 'Wiki'}));
  }, [dispatch]);

  return ( page ?
    <PageContent page={page}/> : <Spinner animation="border"/>
  )
}

export default HomePageScreen;
