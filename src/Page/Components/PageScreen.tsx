import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import PageContent from "./PageContent";
import { getPage } from "../actions";
import { currentPageSelector } from "../reducer";

function PageScreen() {
  const dispatch = useDispatch();
  const params = useParams();
  const page = useSelector(currentPageSelector);

  useEffect(() => {
    if(params.title){
      dispatch(getPage({title: params.title}));
    }
    else {
      dispatch(getPage({title: 'Moneyflow Wiki'}));
    }
  }, [dispatch, params.title]);

  return ( page ?
    <PageContent page={page}/> : <Spinner animation="border"/>
  )
}

export default PageScreen;