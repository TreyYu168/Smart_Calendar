import Clock from "./components/Clock";
import {Container} from "react-bootstrap";
import Weather from "./components/Weather";

function App() {
    return (
        <div className="body text-center">
            <div className='row'>
                <div className='col'><Clock/></div>
                <div className='col'><Weather/></div>
            </div>
        </div>
    )
}

export default App;