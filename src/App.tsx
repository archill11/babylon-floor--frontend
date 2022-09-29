import React from 'react'
import {Routes, Route} from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components'
import { useAppDispatch, useAppSelector } from './hooks/use-redux';
import { Header } from './components/Header/Header';
import { Dialogs } from './pages/Dialogs/Dialogs';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { Nav } from './components/Nav/Nav';
import { UsersList } from "./pages/UsersList/UsersList";
import { Auth } from "./pages/Auth/Auth";
import { NotFound } from "./pages/NotFound";
import { selectAuthData, selectIsAuth } from "./redux/auth/selectors";
import { Dialog } from './components/Dialog/Dialog';
import { MessageNotify } from './components/MessageNotify/MessageNotify';
import { Settings } from './pages/Settings/Settings';
import { pageBGColorDark, pageBGColorLite } from './libs/styled_variables';
import { fetchAuthMe } from './redux/auth/asyncActions';
import { selectAppContext } from './redux/app-context/selectors';

import './App.scss';

const Wrapper = styled.div`
background-color: ${({ theme }) => theme.theme === 'light' ? pageBGColorLite : pageBGColorDark}
`

const App: React.FC = () => {
  
  const { theme } = useAppSelector( selectAppContext )
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector( selectIsAuth )
  const { logined } = useAppSelector( selectAuthData )

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
              <Route path="/profile/:id" element={ <UserProfile /> } />

              <Route path="/message*" element={ <Dialogs /> }>
                <Route path=":id"  element={ <Dialog/> } />
              </Route>

              <Route path="/user" element={ <UsersList /> } />
              <Route path="/settings" element={ <Settings /> } />
              <Route path="*" element={ <NotFound/> } />
            </Routes>
            <MessageNotify/>
          </div>
        }
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
