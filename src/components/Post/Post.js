import './Post.scss'
import { Button } from '../../components/Button/Button';


const Post = (props) => {
    const {value, likes, id, src} = props
    return(
        <div className='post-wrapp'>
            <div className="post" id={id}>
                <div className="post__avatar">
                <img className="post__avatar" src={src} alt="ava" />
                </div>
                <div className="post__note">
                    {value}
                </div>
            </div>
            <div className="post__likes">
                <Button className='Btn--black' value={'likes: ' + likes}/>
            </div>
        </div>
    )
}

export {Post}