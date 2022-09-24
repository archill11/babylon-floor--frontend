// @ts-nocheck
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { fethMyDialogs } from '../../redux/dialogs/asyncActions'
import { AppDispatch } from '../../redux/store'
import { fethUsers } from '../../redux/users/asyncActions'
import { folow } from '../../redux/users/slice'
import { io, Socket } from 'socket.io-client'
import spiner from './../../assets/img/spiner.svg'

import './UsersList.scss';





const UsersList: React.FC = () => {        
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, status, folows } = useSelector((state) => state.users)   
  const  { data }  = useSelector((state) => state.auth)
  const dialogs = useSelector((state) => state.dialogs.items)
  const { createdDialogId } = useSelector((state) => state.dialogs)
  const [addMessLoading, setAddMessLoading]  = React.useState(false)
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
    const newSocket = io(`${process.env.REACT_APP_API_URL}`)
    setSocket(newSocket)
  }, [setSocket])

  const chatListener = (chat) => {
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
    setAddMessLoading(true)
    try {
      let thisDialog
      if (dialogs.length) {
        thisDialog = dialogs.find((item) => Number(item.users[0].id) === Number(id))
      }else {
        const { payload } = await dispatch(fethMyDialogs())
        thisDialog = payload.length && payload.find((item) => item.users[0].id === id)
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
          <img src={`${process.env.REACT_APP_API_URL}/${item.avatarUrl}`} height={100} alt="ava" />
          <div className="userName">{item.fullName}</div>
        </Link>
          <button onClick={() => follow(item.id)}>{folows.includes(item.id, 0) ? 'unfollow' : 'follow'}</button>
          <button disabled={addMessLoading} onClick={() => openDialogl(item.id)}>{addMessLoading ? <img src={spiner} height={18} alt="ava" /> : 'send message'}</button>
      </div>
    ) 
     
  })
  
  return(
    <div className="UsersList-wrapper ">
      {status === 'loading' ? <img src={spiner} height={150} alt="search"></img> : usersList}
    </div>
  )
  }


export {UsersList}
