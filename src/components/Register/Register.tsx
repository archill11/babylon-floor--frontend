//@ts-nocheck
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { selectIsAuth } from '../../redux/auth/selectors';
import { fetchRegister } from '../../redux/auth/asyncActions';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';

import styles from './Register.module.scss'


type FormValues = {
  fullName: string;
  email: string;
  password: string;
};

type RegisterProps = {
  setState: (s: string) => void,
}

const Register: React.FC<RegisterProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const isAuth = useAppSelector( selectIsAuth )
  const { register, handleSubmit, setError, formState: { errors, isValid, isSubmitting} } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: "onBlur"
  })

  const submit = async (args: FormValues) => {
    try {
      const { payload } = await dispatch(fetchRegister(args))
      if ( payload.token ) {
        window.localStorage.setItem('token', `Bearer ${payload.token}`)
      }
    } catch (err) {
      console.log(errors);
      alert( 'не удалось зарегистрироватья')
      console.log(err);
    }
  }

  if ( isAuth ) {
    navigate(-1)
    return <Navigate to='/'/>
  }

   return(
    <div className={styles.wrapper }>
      <div className={styles.Register }>
        <form onSubmit={handleSubmit(submit)} className={styles.form} action="Register ">
          <div className={styles.header }>
            <div className={styles.title}>зарегистрироватья</div> 
            <button className={styles.close} onClick={() =>props.setState('')} type='button'>X</button>
          </div>
          <input placeholder='имя' type="text" id="n1" 
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', {required: true})}
          />
          {errors?.fullName && <span>❗️укажите имя</span>}

          <input placeholder='E-mail' type="text" id="n1" 
            error={Boolean(errors.email?.message)}
            helperText={errors?.email?.message}
            {...register('email', {required: "укажите почту"})}
          />
          {errors?.email && <span>❗️укажите почту</span>}

          <input placeholder='пароль' type="text" id="n1" 
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', {required: true})}
          />
          {errors?.password && <span>❗️укажите пароль минимум 4 символа</span>}

          <button className={styles.submit} disabled={!isValid || isSubmitting} type='submit'>зарегистрироватья</button>
        </form>
      </div>
    </div>
   )
}

export {Register}
