//@ts-nocheck
import styled from 'styled-components'
import { LogoSvg } from '../LogoSvg/LogoSvg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsAuth } from '../../redux/auth/slice';
import { changeTheme } from '../../redux/app-context/slice';
import { headerBGColorDark, headerBGColorLite } from '../../libs/styled_variables';

import styles from './Header.module.scss'


const HeaderS = styled.div`
background-color: ${({ theme }) => theme.theme === 'light' ? headerBGColorLite : headerBGColorDark}
`

const Header: React.FC = () => {
                                           
  const dispatch = useDispatch()
  const isAuth = useSelector( selectIsAuth )
  const { theme } = useSelector( state => state.appContext )

  const Logout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  };

    return(
        <HeaderS className={styles.header}>
          <Link to='/'>
            <div className={styles.header__logo}>
                <LogoSvg className={ styles.header__logo__img + ' logo__img--anim'} fill={'#FF1493'} />
                <LogoSvg className={ styles.header__logo__img + ' logo-svg--absolute'} fill={'#FF1493'} />
            </div>
          </Link>

            <div className={styles.header__buttons}> 
              <button className={styles.themeButton} onClick={() => dispatch(changeTheme())}>{theme === 'light' ? '🌜' : '🌞'}</button> 
              <button className={styles.authButton} onClick={Logout}> Выйти </button> 
            </div>
        </HeaderS>
    )
}

export {Header}