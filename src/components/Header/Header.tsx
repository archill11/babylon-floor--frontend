//@ts-nocheck
// import '../MainProfile/Profile/Profile.scss'
import { LogoSvg } from '../LogoSvg/LogoSvg';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsAuth } from '../../redux/auth/slice';

import styles from './Header.module.scss'

const Header: React.FC = () => {
                                           
  const dispatch = useDispatch()
  const isAuth = useSelector( selectIsAuth )

  const Logout = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  };

    return(
        <header className={styles.header}>
          <Link to='/'>
            <div className={styles.header__logo}>
                <LogoSvg className={ styles.header__logo__img + ' logo__img--anim'} fill={'#FF1493'} />
                <LogoSvg className={ styles.header__logo__img + ' logo-svg--absolute'} fill={'#FF1493'} />
            </div>
          </Link>

            <div className={styles.header__buttons}> 
              <button className={styles.authButton} onClick={Logout}> Выйти </button> 
            </div>
        </header>
    )
}

export {Header}