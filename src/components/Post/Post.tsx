import styled from 'styled-components'
import { Button } from '../Button/Button';
import { black, white } from '../../libs/styled_variables';

import './Post.scss'

const Wrapper = styled.div`
  color: ${({ theme }) => theme.theme === 'light' ? black : white }
`
type PostProps = {
  value: string,
  id: string,
  likes: number,
  src: string,
}

const Post: React.FC<PostProps> = (props) => {
    const {value, likes, id, src} = props
    return(
        <Wrapper className='post-wrapp'>
            <div className="post" id={id}>
                <div className="post__avatar">
                <img className="post__avatar" src={src} alt="ava" />
                </div>
                <div className="post__note">
                    {value}
                </div>
            </div>
            <div className="post__likes">
                <Button onClick={() => console.log('в разработке')} className='Btn--black' value={'likes: ' + likes}/>
            </div>
        </Wrapper>
    )
}

export {Post}