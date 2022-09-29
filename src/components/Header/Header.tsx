import styled from 'styled-components'
import { LogoSvg } from '../LogoSvg/LogoSvg';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '../../redux/auth/selectors';
import { changeTheme } from '../../redux/app-context/slice';
import { headerBGColorDark, headerBGColorLite } from '../../libs/styled_variables';
import { logout } from '../../redux/auth/slice';
import { selectAppContext } from '../../redux/app-context/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';

import styles from './Header.module.scss'


const HeaderS = styled.div`
background-color: ${({ theme }) => theme.theme === 'light' ? headerBGColorLite : headerBGColorDark}
`

const Header: React.FC = () => {
                                           
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector( selectIsAuth )
  const { theme } = useAppSelector( selectAppContext )

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