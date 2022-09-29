//@ts-nocheck
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { selectIsAuth } from '../../redux/auth/selectors';
import { fetchAuthMe, fetchLogin } from '../../redux/auth/asyncActions';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { LoginDto } from '../../redux/auth/types';

import styles from './Login.module.scss'




type LoginProps = {
    setState: (s: string) => void,
}

const Login: React.FC<LoginProps> = (props) => {

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector( selectIsAuth )
  const navigate = useNavigate();
  const location = useLocation()
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting} } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "onBlur"
  })

  const submit = async (args: LoginDto) => {
    try {
      const { payload: token } = await dispatch(fetchLogin(args))
      if ( token ) {
        window.localStorage.setItem('token', `Bearer ${token}`)
        dispatch(fetchAuthMe())
      }
    } catch (err) {
      alert( 'не удалось авторизоваться')
      console.log(err)
    }
  }

  if ( isAuth ) {   
    navigate(-1)
    return <Navigate to='/'/>
  }
  

   return(
      <div className={styles.wrapper}>
        <div className={styles.Login}>
          <form onSubmit={handleSubmit(submit)} className={styles.form} action="Login ">
            <div className={styles.header}>
              <div className={styles.title}>войти</div> 
              <button className={styles.close} onClick={() =>props.setState('')} type='button'>X</button>
            </div>
            <input placeholder='E-mail' type="text" id="n1" 
              error={Boolean(errors.email?.message)}
              // helperText={errors.email?.message}
              {...register('email', {required: true})}
            />
            {errors?.email && <span>❗️укажите почту</span>}

            <input placeholder='пароль' type="text" id="n1" 
              error={Boolean(errors.password?.message)}
              // helperText={errors.password?.message}
              {...register('password', {required: true})}
            />
            {errors?.password && <span>❗️укажите пароль минимум 4 символа</span>}

            <button className={styles.submit} disabled={!isValid || isSubmitting} type='submit'>войти</button>
          </form>
        </div>
      </div>
   )
}

export {Login}