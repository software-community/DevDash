import Blockchain from "./blockchain";
import TransactionMine from "./transactionMine";
import BlockMine from "./blockMine";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Mandelbrot from "./components/Mandelbrot";
import MandelbrotFractal from "./components/MandelbrotExplorer";
import Rain from "./components/Rain";
import Terminal from "./components/Terminal";
import Window from "./components/Window";
import HelpBot from "./components/HelpBot.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Window />

              <div className="flex-grow overflow-hidden relative">
                <HelpBot
                level={2}
                />
              </div>
            </>
          }
        />
        <Route path="/Level-1(1)" element={<Mandelbrot />} />
        <Route path="/Level-1(2)" element={<MandelbrotFractal />} />
        <Route path="/intro1" element={<Rain />} />
        <Route path="/Level-2" element={<Terminal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
