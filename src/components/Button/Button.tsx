import './Button.scss'

type ButtonProps = {
  className: string,
  value: string,
  onClick: () => void,
}

const Button: React.FC<ButtonProps>= (props) => {
    const {className, value, onClick} = props
    const classNames = `Btn ${className}`
    
    return(
        <button onClick={onClick} className={classNames}>{value}</button>
    )
}

export {Button}