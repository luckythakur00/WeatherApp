import './App.css'
import Weather from './Components/Weather'

function App() {

  return (
    <div className='h-screen w-screen m-auto bg-gray-400'>
      <h1 className='text-center text-xl font-semibold pt-10' >Weather App</h1>
      <Weather />
    </div>
  )
}

export default App