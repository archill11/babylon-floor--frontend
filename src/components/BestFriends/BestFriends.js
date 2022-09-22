import {Link} from "react-router-dom";
import './BestFriends.scss'



const BestFriends = (props) => {
    const {id, name, src} = props
    
    return (
        <div className="bestFriends-item-wrappr">
            <img className="BestFriends-avatar" id={id} name={name} src={src} alt="ava" />
            <Link to={'/friends/' + id} className='linkBtn dialogs__item' id={id}>{name}</Link>
        </div>
    )

}

export {BestFriends}