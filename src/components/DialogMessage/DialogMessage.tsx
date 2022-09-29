import { borderBGColorDark, borderBGColorLite, messageBGColorDark, messageBGColorLite } from '../../libs/styled_variables'
import styled from 'styled-components'
import './DialogMessage.scss'

const Dialog__message = styled.div`
border-color: ${({ theme }) => theme.theme === 'light' ? borderBGColorLite : borderBGColorDark};
background-color: ${({ theme }) => theme.theme === 'light' ? messageBGColorLite : messageBGColorDark}
`

type DialogMessageProps = {
  name: string,
  message: string,
  src: string,
}

const DialogMessage: React.FC<DialogMessageProps> = (props) => {
    const {name, message, src} = props
    return(
        <div className="Dialog__message">
            <div className="Dialog__message__avatar">
                <img className="Dialog__message__avatar__img" src={src}alt="ava" />
                <div className="Dialog__message__avatar__name">{name}</div>
            </div>
            <Dialog__message className="Dialog__message__text">
                {message}
            </Dialog__message>
        </div>
    )
}

export {DialogMessage}