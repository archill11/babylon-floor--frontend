import React from 'react'
import { useParams } from 'react-router-dom'
import { fethOneUser } from '../../redux/users/asyncActions'
import styled from 'styled-components'
import { black, white } from '../../libs/styled_variables'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import './Profile.scss'

const ProfileInfo = styled.div`
color: ${({ theme }) => theme.theme === 'light' ? black : white}
`

const Profile = () => {

  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.users.user)
  const {id} = useParams()

  React.useEffect(() => {
    if ( id ) {
      dispatch(fethOneUser(id))
    }
  }, [id])


  return(
      <div className="profile">
          <img className="profile__img" src={`${process.env.REACT_APP_API_URL}/${data?.avatarUrl}`} alt="ava" />
          <ProfileInfo className="profile__Info">
              <div className="profile__name">{data?.fullName}</div>
              <div className="profile__birthday">Date of Birth: 2 januar</div>
              <div className="profile__sity">City: Minsk</div>
              <div className="profile__education">Education: BSU'11</div>
              <div className="profile__web-site">Web Site: http://git-hub.com</div>
          </ProfileInfo>
      </div>
  )
}

export {Profile}