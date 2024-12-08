import "./App.css";
import Authform from "./Authform";
import { BrowserRouter , Router , Route , Routes} from 'react-router-dom'
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authform/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
