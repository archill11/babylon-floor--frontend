//@ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { fethUpdateUser } from '../../redux/users/asyncActions';
import spiner from '../../assets/img/spiner.svg'
import { useMatchMedia } from '../../hooks/use-match-media';
import { black, white } from '../../libs/styled_variables';
import { selectUsersData } from '../../redux/users/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { PachedUser } from '../../redux/users/types';

import styles from './Settings.module.scss'

const SettingsWrapper = styled.div`
color: ${({ theme }) => theme.theme === 'light' ? black : white}
`
const DropAreaT = styled.div`
border-color: ${({ theme }) => theme.theme === 'light' ? black : white}
`
const DropAreaF = styled.div`
border-color: ${({ theme }) => theme.theme === 'light' ? black : white}
`



const Settings: React.FC = () => {

  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectUsersData)   
  const [drag, setDrag] = React.useState(false)
  const { isMobile } = useMatchMedia()

  const { register, handleSubmit, formState: { errors, isValid} } = useForm({
    defaultValues: {
      fullName: '',
      avatarUrl: '',
    },
    mode: "onBlur"
  })

  const submit = async (args: PachedUser) => {
    try {
      const formD = new FormData()
      if ( args.fullName ) {
        formD.append('fullName', args.fullName)
        dispatch(fethUpdateUser(formD))
      }
    } catch (err) {
      alert( 'не удалось применить изменения')
      console.log(err);
    }
  }

  
  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    let file = [e.dataTransfer.files[0]]
    setDrag(false)
    const formD = new FormData()
    formD.append('avatarUrl', file[0])
    dispatch(fethUpdateUser(formD))
  }

  const submitFile = async (args: PachedUser) => {
    try {
      const formD = new FormData()
      if ( args.avatarUrl ) {
        formD.append('avatarUrl', args.avatarUrl[0])
        dispatch(fethUpdateUser(formD))
      }
    } catch (err) {
      alert( 'не удалось применить изменения')
      console.log(err);
    }
  }

  
  return(
    <SettingsWrapper className={styles.settingsWrapper}>
      <div className={styles.profileSettings}>

        { status === 'loading' ? <img src={spiner} height={150} alt="search"></img> :
          <>
            <form onSubmit={handleSubmit(submit)} className={styles.form} action="Login">
              <div className={styles.header}>
                <div className={styles.title}>изменить имя</div> 
              </div>
              <input placeholder='Имя' type="text" id="n1" 
                error={Boolean(errors.fullName?.message)}
                {...register('fullName')}
              />
              {errors?.fullName && <span>❗️укажите имя </span>}
              <button className={styles.submit} type='submit'>изменить</button>
            </form>

            <div className={styles.DND}>
              <div className={styles.title}>изменить аватар</div> 
              {!isMobile && 
              (  drag 
                  ? <DropAreaT
                      className={styles.dropAreaT}
                      onDragStart={e => dragStartHandler(e)}
                      onDragLeave={e => dragLeaveHandler(e)}
                      onDragOver={e => dragStartHandler(e)}
                      onDrop={e => dropHandler(e)}
                    >отпустите файл чтобы загрузить</DropAreaT>
                  : <DropAreaF 
                      className={styles.dropAreaF}
                      onDragStart={e => dragStartHandler(e)}
                      onDragLeave={e => dragLeaveHandler(e)}
                      onDragOver={e => dragStartHandler(e)}
                    >перетащите файл чтобы загрузить</DropAreaF>
                )}
            </div>

            <form onSubmit={handleSubmit(submitFile)} className={styles.form} action="Login ">
              <div className={styles.header}>
                <div className={styles.title}>{!isMobile && 'или нажмите'}</div> 
              </div>
              <input placeholder='file' type="file" id="n1" 
                accept='img/*,.png,.jpg,.gif,.web'
                error={Boolean(errors.avatarUrl?.message)}
                {...register('avatarUrl', {onChange: (e) => console.log(e.target.files)})}
              />
              {errors?.fullName && <span>❗️укажите файл </span>}
              <button className={styles.submit} type='submit'>изменить</button>
            </form>
          </>
        }

      </div>
    </SettingsWrapper>
   )
}

export {Settings}