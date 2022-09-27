//@ts-nocheck
import React from 'react';
import styled from 'styled-components'
import { black, white } from '../../libs/styled_variables';
import { Button } from '../Button/Button'
import './PostsInput.scss'

type PostsInputProps = {
  title: string,
  placeholder: string,
  btnValue: string,
  className: string,
  inputVal: string,
  setInputVal: () => void
}


const Wrapper = styled.div`
color: ${({ theme }) => theme.theme === 'light' ? black : white}
`


const PostsInput: React.FC<PostsInputProps> = (props) => {

  const { title, placeholder, btnValue } = props


   
    const onChangeTextarea = (e: React.ChangeEvent<HTMLInputElement>) => {
      if ( props.setInputVal ) {
        props.setInputVal(e.target.value)
      }else{
        console.log('эта часть сайта в разработке!!!');
      }
    }

    const send = () => {
      if ( props.fn) {
        props.fn()
      }else{
        console.log('эта часть сайта в разработке!!!');
      }
    }
    
    
    return(
        <Wrapper className={"posts__input " }>
            <div className="posts__input__title">{title}</div>
            <textarea onChange={onChangeTextarea} value={props.inputVal} className="posts__input__text-area" 
                type="textarea" name="input__text-area" placeholder={placeholder} id="input__text-area" />
            <Button onClick={send} className="posts__input__button Btn--greenBg Btn--white" value={btnValue}/>
        </Wrapper>
    )
}

export {PostsInput}