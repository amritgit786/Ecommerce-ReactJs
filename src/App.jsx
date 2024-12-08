import { BrowserRouter } from "react-router-dom";
import RouterComp from "./Routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterComp />
      </BrowserRouter>
    </>
  );
}

export default App;
