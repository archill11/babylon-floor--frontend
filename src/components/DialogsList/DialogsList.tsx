// @ts-nocheck
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fethMyDialogs } from '../../redux/dialogs/asyncActions'
import { AppDispatch, RootState } from '../../redux/store'
import { io, Socket } from 'socket.io-client'


import './DialogsList.scss'



const DialogsList: React.FC = () => {

  const dispatch = useDispatch()
  const {id} = useParams()
  const { items } = useSelector((state: RootState) => state.dialogs)
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [chatsList, setChatsList] = React.useState([])

  React.useEffect(() => {
    dispatch(fethMyDialogs())
  }, [])


  React.useEffect(() => {
    setChatsList(items)
  }, [items])


  React.useEffect(() => {
    const newSocket = io('http://localhost:8002')
    setSocket(newSocket)
  }, [setSocket])

  const chatListener = (chat) => {
    // setChatsList([...chatsList, chat])
    dispatch(fethMyDialogs())
  }

  React.useEffect(() => {
    socket?.on('chat', chatListener)
    return () => {
      socket?.off('chat', chatListener)
    }
  }, [chatListener])

  
  const mapedData = items.map((item) => {
    console.log(chatsList);
    
    const active = ( id && id === String(item.id)) ? 'dialogs__item--active' : ''
    return (
      <div className="dialog-item-wrappr" key={item.id}>
        <img className="dialogs__item-avatar" src={item.users[0].avatarUrl} alt="ava" />
        <Link to={`/message/${item.id}`} className={'linkBtn dialogs__item ' + active} >{item.users[0].fullName}</Link>
      </div>
    )
  })


  return(
    <div className="main__dialogs">
      {mapedData}
    </div>
  )
}

export {DialogsList}