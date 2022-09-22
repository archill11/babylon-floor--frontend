// @ts-nocheck
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { createDialog, fethMyDialogs } from '../../redux/dialogs/asyncActions'
import { AppDispatch } from '../../redux/store'
import { fethUsers } from '../../redux/users/asyncActions'
import { folow } from '../../redux/users/slice'
import { io, Socket } from 'socket.io-client'

import './UsersList.scss';





const UsersList: React.FC = () => {        
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, status, folows } = useSelector((state) => state.users)
  const  { data }  = useSelector((state) => state.auth)
  const dialogs = useSelector((state) => state.dialogs.items)
  const { createdDialogId } = useSelector((state) => state.dialogs)
  const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [chatId, setChatId] = React.useState(null)

  React.useEffect(() => {
    dispatch(fethUsers())
  }, [])

  const follow = (id) => {
    dispatch(folow(id))
  }

  const openDialoglSocket = (id) => {
    const userId = data.id
    const receiverId = id
    socket?.emit('chat', {userId, receiverId})
  }

  React.useEffect(() => {
    const newSocket = io('http://localhost:8002')
    setSocket(newSocket)
  }, [setSocket])

  const chatListener = (chat) => {
    console.log('chat chat chat =',chat);
    navigate(`/message/${chat.id}`)
    setChatId(chat)
  }

  React.useEffect(() => {
    socket?.on('chat', chatListener)
    return () => {
      socket?.off('chat', chatListener)
    }
  }, [chatListener])

  const openDialogl = async (id) => {
    try {
      let thisDialog
      if (dialogs.length) {
        console.log(id);
        thisDialog = dialogs.find((item) => Number(item.users[0].id) === Number(id))
        console.log(thisDialog);
      }else {
        const { payload } = await dispatch(fethMyDialogs())
        console.log(id);
        thisDialog = payload.length && payload.find((item) => item.users[0].id === id)
        console.log(thisDialog);
      }
      if (thisDialog) {
        navigate(`/message/${thisDialog.id}`); 
      }else{
        (async() => {
          try {

          openDialoglSocket(id)

          } catch (err) {
            alert('ошибка при создании диалога')
            console.log(err);
          }
        })()
      }

    } catch (e) {
      console.log(e);
    }
  }

  

  const usersList = items.map((item, indx) => {
    return data && items && item.id !== data.id && (
      <div className="userList__item" key={item.id}>
        <Link to={`/profile/${item.id}`} key={item.id} >
          <img src={item.avatarUrl} height={100} alt="ava" />
          <div className="userName">{item.fullName}</div>
        </Link>
          <button onClick={() => follow(item.id)}>{folows.includes(item.id, 0) ? 'unfollow' : 'follow'}</button>
          <button onClick={() => openDialogl(item.id)}>{ 'send message'}</button>
      </div>
    ) 
     
  })
  
  return(
    <div className="UsersList-wrapper ">
      {status === 'loading' ? <h2>loding...</h2> : usersList}
    </div>
  )
  }


export {UsersList}
