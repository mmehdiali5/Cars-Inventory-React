import './App.css';
import CarData from './CarData'
import background from './images/mainPage.jpg'

function App() {
  return (
    <div style={{backgroundImage:`url(${background})`,backgroundRepeat: 'no-repeat',backgroundSize: "cover",height:"100vh"}}>
      <CarData/>
    </div>
  );
}

export default App;
