//@ts-nocheck
import Media from "react-media";
import styled from 'styled-components'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMatchMedia } from "../../hooks/use-match-media";
import { RootState } from "../../redux/store";
import './Nav.scss'
import { headerBGColorDark, headerBGColorLite } from "../../libs/styled_variables";

const NavS = styled.div`
background-color: ${({ theme }) => theme.theme === 'light' ? headerBGColorLite : headerBGColorDark}
`

const Nav: React.FC = () => {
  
  const {data} = useSelector((state: RootState) => state.auth)

  const { isMobile } = useMatchMedia()

  return(
    <>
    <NavS className='nav'>
      <Link to={data && `/profile/${data.id}`} className="linkBtn nav__el__profile">{isMobile ? "👤" : "Profile"}</Link>
      <Link to='/message' className="linkBtn nav__el__message">{isMobile ? "✉️" : "Message"}</Link>
      <Link to='/user' className="linkBtn nav__el__users">{isMobile ? "🔍" : "Users"}</Link>
      <Link to='/news' className="linkBtn nav__el__news">{isMobile ? "🔔" : "News"}</Link>
      <Link to='/music' className="linkBtn nav__el__music">{isMobile ? "🎵" : "Music"}</Link>
      <Link to='/settings' className="linkBtn nav__el__settings">{isMobile ? "⚙️" : "Settings"}</Link>

    </NavS>
    </>
  )
}

export {Nav}
