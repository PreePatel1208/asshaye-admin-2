import './App.css';
import Router from './routes/Router';
import 'antd/dist/reset.css'
import './App.css';
import './AppResponsive.css'
import Loader from './components/Loader/Loader';
import CustomCheckboxGroup from './components/form-component/CheckBox';

function App() {
  return (
    <>
      <Router />
      <Loader />
      
      {/* <Demo/> */}
    </>
  )
}
export default App

