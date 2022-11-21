import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import AccueilScreen from './screens/AccueilScreen';
import ConnexionScreen from './screens/ConnexionScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProtectedRoute from './routing/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
            <Route path='/' element={<AccueilScreen />}/>
            <Route path='/connexion' element={<ConnexionScreen />}/>
            <Route path='/inscription' element={<InscriptionScreen />}/>
            <Route element={<ProtectedRoute/>}>
              <Route path='/profile' element={<ProfileScreen />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
