import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContextProvider from './Context.js';
import SearchbarComponent from './Components/SearchbarComponent.js';
import HomeScreen from './Components/HomeScreen.js';
import MovieScreen from './Components/MovieScreen.js';
import ProfileScreen from './Components/ProfileScreen';
import RegisterScreen from './Components/RegisterScreen.js';
import SignInScreen from './Components/SignInScreen.js';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <BrowserRouter>
          <SearchbarComponent/>

          <Switch>
            <Route exact path='/' component={HomeScreen}/>

            <Route exact path='/SignIn' component={SignInScreen}/>

            <Route exact path='/Register' component={RegisterScreen}/>

            <Route exact path='/Profile/:user' component={ProfileScreen}/>

            <Route exact path='/:movieTitle' component={MovieScreen}/>
          </Switch>
        </BrowserRouter>
      </ContextProvider>   
    </div>
  );
}

export default App;