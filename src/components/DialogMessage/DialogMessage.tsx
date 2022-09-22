import './DialogMessage.scss'

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
            <div className="Dialog__message__text">
                {message}
            </div>
        </div>
    )
}

export {DialogMessage}