//@ts-nocheck
import React from 'react'
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { Header } from './components/Header/Header';
import { Dialogs } from './pages/Dialogs/Dialogs';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { Nav } from './components/Nav/Nav';
import { UsersList } from "./pages/UsersList/UsersList";
import { Auth } from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/auth/slice";
import { Dialog } from './components/Dialog/Dialog';
import { useLocalStorage } from 'hooks'


import './App.scss';



const App: React.FC = () => {
 
  const isAuth = useSelector( selectIsAuth )
  const { logined } = useSelector( (state) => state.auth )
  
  
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchAuthMe())
    
  }, [logined])

 
  return (
    <>
      {!isAuth && !window.localStorage.getItem('token') ? <Auth/> :
        <div className="App-wrapper">
          <Header/>
          <Nav />  
          <Routes>
              <Route path="/profile/:id" element={ <UserProfile />} />

              <Route path="/message*" element={ <Dialogs />}>
                <Route path=":id"  element={ <Dialog/> }/>
              </Route>

              <Route path="/user/" element={ <UsersList />} />
          </Routes>
        </div>
      }
      </>
  );
}

export default App;
