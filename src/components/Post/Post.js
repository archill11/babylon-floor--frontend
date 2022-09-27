import styled from 'styled-components'
import { Button } from '../../components/Button/Button';
import { black, white } from '../../libs/styled_variables';

import './Post.scss'

const Wrapper = styled.div`
  color: ${({ theme }) => theme.theme === 'light' ? black : white }
`

const Post = (props) => {
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
                <Button className='Btn--black' value={'likes: ' + likes}/>
            </div>
        </Wrapper>
    )
}

export {Post}