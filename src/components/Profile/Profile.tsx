// @ts-nocheck
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fethOneUser } from '../../redux/users/asyncActions'
import styled from 'styled-components'
import './Profile.scss'
import { black, white } from '../../libs/styled_variables'

const ProfileInfo = styled.div`
color: ${({ theme }) => theme.theme === 'light' ? black : white}
`

const Profile = () => {

  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state.users.user)
  const {id} = useParams()

  React.useEffect(() => {
    dispatch(fethOneUser(id))
  }, [id])


  return(
      <div className="profile">
          <img className="profile__img" src={`${process.env.REACT_APP_API_URL}/${data.avatarUrl}`} alt="ava" />
          <ProfileInfo className="profile__Info">
              <div className="profile__name">{data.fullName}</div>
              <div className="profile__birthday">Date of Birth: 2 januar</div>
              <div className="profile__sity">City: Minsk</div>
              <div className="profile__education">Education: BSU'11</div>
              <div className="profile__web-site">Web Site: http://git-hub.com</div>
          </ProfileInfo>
      </div>
  )
}

export {Profile}