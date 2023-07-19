import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view.jsx";
import Container from "react-bootstrap/Container";
import "./index.scss";
import { Provider } from 'react-redux';
// import { store } from 'react-redux';

const MyFlixApplication = () => {
  return( 
    // <Provider store={store}>
      // <Provider >
  <Container>
  <MainView/>
  </Container>
  // </Provider>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);