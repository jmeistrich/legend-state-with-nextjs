/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";

import { Button } from "../components/ui/button";

import "./index.css";

function ImageDisplay() {
  return (
    <>
      <div>
        <Button>Click me</Button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ImageDisplay />);
