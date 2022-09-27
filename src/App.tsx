//@ts-nocheck
import React from 'react'
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { Header } from './components/Header/Header';
import { Dialogs } from './pages/Dialogs/Dialogs';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { Nav } from './components/Nav/Nav';
import { UsersList } from "./pages/UsersList/UsersList";
import { Auth } from "./pages/Auth/Auth";
import { NotFound } from "./pages/NotFound";
import { fetchAuthMe, selectIsAuth } from "./redux/auth/slice";
import { Dialog } from './components/Dialog/Dialog';
import { MessageNotify } from './components/MessageNotify/MessageNotify';
import { Settings } from './pages/Settings/Settings.tsx';
import { pageBGColorDark, pageBGColorLite } from './libs/styled_variables';
import { ThemeProvider } from 'styled-components'

import './App.scss';

const Wrapper = styled.div`
background-color: ${({ theme }) => theme.theme === 'light' ? pageBGColorLite : pageBGColorDark}
`

const App: React.FC = () => {
  
  const { theme } = useSelector( state => state.appContext )
  const dispatch = useDispatch()
  const isAuth = useSelector( selectIsAuth )
  const { logined, data } = useSelector( (state) => state.auth )

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [logined])

 
  return (
    <ThemeProvider theme={{theme}}>
      <Wrapper>
        {!isAuth && !window.localStorage.getItem('token') ? <Auth/> :
          <div className="App-wrapper">
            <Header/>
            <Nav />  
            <Routes>
                <Route path="/profile/:id" element={ <UserProfile />} />

                <Route path="/message*" element={ <Dialogs />}>
                  <Route path=":id"  element={ <Dialog/> }/>
                </Route>

                <Route path="/user" element={ <UsersList />} />

                <Route path="/settings" element={ <Settings />} />

                <Route path="*" element={ <NotFound/> }/>
            </Routes>
            
            <MessageNotify/>
          </div>
        }
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
