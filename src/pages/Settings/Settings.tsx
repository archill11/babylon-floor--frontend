// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { fethUpdateUser } from '../../redux/users/asyncActions';
import spiner from '../../assets/img/spiner.svg'
import { useMatchMedia } from '../../hooks/use-match-media';

import styles from './Settings.module.scss'
import { black, white } from '../../libs/styled_variables';

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

  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.users)   
  const [drag, setDrag] = React.useState(false)
  const { isMobile } = useMatchMedia()

  const { register, handleSubmit, formState: { errors, isValid} } = useForm({
    defaultValues: {
      fullName: '',
      avatarUrl: '',
    },
    mode: "onBlur"
  })

  const submit = async (args) => {
    try {
      const data = await dispatch(fethUpdateUser(args))
    } catch (err) {
      alert( 'не удалось применить изменения')
      console.log(err);
    }
  }

  
  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }
  const dropHandler = (e) => {
    e.preventDefault()
    let file = [e.dataTransfer.files[0]]
    setDrag(false)
    const formD = new FormData()
    formD.append('avatarUrl', file[0])
    dispatch(fethUpdateUser(formD))
  }

  const submitFile = async (args) => {
    try {
      const formD = new FormData()
      formD.append('avatarUrl', args.avatarUrl[0])
      dispatch(fethUpdateUser(formD))
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
            <input placeholder='Имя' type="text" name="name" id="n1" 
              error={Boolean(errors.email?.message)}
              {...register('fullName')}
            />
            {errors?.FullName && <span>❗️укажите имя </span>}
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
                  onClick={() => filePicker.current.click() }
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
            <input placeholder='file' type="file" name="name" id="n1" 
              accept='img/*,.png,.jpg,.gif,.web'
              error={Boolean(errors.avatarUrl?.message)}
              {...register('avatarUrl', {onChange: (e) => console.log(e.target.files)})}
            />
            {errors?.FullName && <span>❗️укажите файл </span>}
            <button className={styles.submit} type='submit'>изменить</button>
          </form>
        </>
      }

      </div>
    </SettingsWrapper>
   )
}

export {Settings}