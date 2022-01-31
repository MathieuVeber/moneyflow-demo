import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import AppLayout from "./AppLayout";
import { store } from "./utils/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
