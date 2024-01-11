import {Routes, Route} from 'react-router-dom'
import Home from './routes/home/home.components'
import Navigation from './routes/navigation/navigation.component'
import CheckOut from './components/check-out/check-out.component'
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'


const App = () =>{
  return (
    <Routes>
    <Route path='/' element={<Navigation/>}>
      <Route index element={ <Home/>}/>
      <Route path='shop/*' element={<Shop/>}/>
      <Route path='auth' element={<Authentication/>}/>
      <Route path='checkout' element={<CheckOut/>}/>
    </Route>
      
    </Routes>
  )
   
  
}

export default App;
