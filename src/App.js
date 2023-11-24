import {Routes, Route} from 'react-router-dom'
import Home from './routes/home/home.components'
import Navigation from './routes/navigation/navigation.component'
import SingIn from './routes/sing-in/sing-in.component'

const Shop =()=>{
  return <h1>I am the shop page</h1>
}

const App = () =>{
  return (
    <Routes>
    <Route path='/' element={<Navigation/>}>
      <Route index element={ <Home/>}/>
      <Route path='shop' element={<Shop/>}/>
      <Route path='sing-in' element={<SingIn/>}/>
    </Route>
      
    </Routes>
  )
   
  
}

export default App;
