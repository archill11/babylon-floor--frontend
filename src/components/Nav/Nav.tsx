import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { BestFriends } from "../BestFriends/BestFriends";
import './Nav.scss'


const Nav: React.FC = () => {
  
  const {data} = useSelector((state: RootState) => state.auth)

  const bestFriends = [
    {id:1, name: 'Vlad Trojan', src:"https://sewingadvisor.ru/image/cache/catalog/digital/user_14692/09_03_2021_15_10_29-800x600.jpg" },
    {id:2, name: 'Sasha', src:"https://bipbap.ru/wp-content/uploads/2017/10/117003_530c63ceb769d530c63ceb76d4-640x432.jpeg"},
    {id:3, name: 'Loh', src: "https://interesnyefakty.org/wp-content/uploads/Obezyana-nosach-Samye-smeshnye-zhivotnye.jpg"},
    ]


  const mapedData = bestFriends.map((item) => {
    return <BestFriends name={item.name} id={item.id} src={item.src} key={item.id}/>
  })

  return(
    <nav className='nav'>
      <Link to={data && `/profile/${data.id}`} className="linkBtn nav__el__profile">Profile</Link>
      <Link to='/message' className="linkBtn nav__el__message">Message</Link>
      <Link to='/user' className="linkBtn nav__el__users">Users</Link>
      <Link to='/news' className="linkBtn nav__el__news">News</Link>
      <Link to='/music' className="linkBtn nav__el__music">Music</Link>
      <Link to='/settings' className="linkBtn nav__el__settings">Settings</Link>
      <div className="sideBar">
        {/* <Link to='/friends' className="linkBtn nav__el__friends">Friends</Link> */}
        {/* <div className="sideBar__bestFriends"> */}
          {/* {mapedData} */}
        {/* </div> */}
      </div>
    </nav>
  )
}

export {Nav}
