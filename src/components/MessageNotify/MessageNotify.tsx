// @ts-nocheck
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { selectAuthData } from '../../redux/auth/selectors'
import { fethMyDialogs } from '../../redux/dialogs/asyncActions'
import { selectDialogsData } from '../../redux/dialogs/selectors'

import styles from  './MessageNotify.module.scss'


// type MessageNotifyProps = {
//     imageUrl: string,
//     id: string,
//     size: number,
// }

const MessageNotify: React.FC = () => {

  const dispatch = useAppDispatch()
  const { data } = useAppSelector( selectAuthData )
  const [state, setState] = React.useState(styles.hideNotify)
  const [message, setMessage] = React.useState(null)
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const { pathname } = useLocation();
  
  const close = () => {
    setState(styles.hideNotify)
  }

  React.useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_API_URL}`)
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = async(mess) => {
    
    const data2 = await dispatch(fethMyDialogs())

    
    if ( !data2.payload.find(item => item.id === mess.chat.id) ) {
      return
    }

    setMessage(mess)

    if ((mess.user.id !== data.id) && (!pathname.includes(`message/${mess.chat.id}`))) {
      console.log(styles.notification);
      
      setState(styles.notification)
    }
  }

  React.useEffect(() => {
    socket?.on('message', messageListener)
    return () => {
      socket?.off('message', messageListener)
    }
  }, [messageListener])

  if (!message) return
console.log(message);

  return(
    <div className={state}>
        <div className={styles.content}>
          <span onClick={close} className={styles.closeSpan}>X</span>
          <Link onClick={close} to={`/message/${message.chat.id}`}>
          <div className={styles.identifier}><img height={25} className={styles.Notify__message__avatar} src={`${process.env.REACT_APP_API_URL}/${message.avatarUrl}`} alt="ava" /></div>
          <div className={styles.text}>{`${message.text.slice(0, 22)}...`}</div>
          </Link>
        </div>
    </div>
  )
}

export {MessageNotify}