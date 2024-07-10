
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Terminal from './components/Terminal';
import Login from './components/login/Login.jsx';
import Mandelbrot from './components/web/Mandelbrot.jsx';
import MandelbrotFractal from './components/web/MandelbrotExplorer.jsx';
import Rain from './components/web/Rain.jsx';
import Noncense from './components/blockchain/Noncense.jsx';
import Intro2 from './components/blockchain/intro2.jsx';
import Window from './components/Window.jsx';
import Result from './components/Result.jsx';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* <Route path="/Level-1(1)" element={<Mandelbrot />} />
                <Route path="/Level-1(2)" element={<MandelbrotFractal />} />
                <Route path="/intro1" element={<Rain />} /> 
                <Route path="/Level-2" element={<Window/>} /> */}
                <Route path="/intro2" element={<Intro2/>} />
                <Route path="/Level-3" element={<Noncense /> } />
                <Route path="/resultPage" element={<Result /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
