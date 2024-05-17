import React, {JSX} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsRegister} from "../../../common/types/auth";

const RegisterPage: React.FC<IPropsRegister> = (props: IPropsRegister): JSX.Element => {
    const {
        register,
        errors,
        navigate
    } = props

    return (
        <>
            <Typography
                variant="h2"
                padding={3}
                fontFamily={'Poppins'}
                textAlign={'center'}
            >
                Регистрация
            </Typography>
            <Typography
                variant="body1"
                marginBottom={3}
                fontFamily={'Poppins'}
                textAlign={'center'}
            >
                Введите данные для регистрации
            </Typography>
            <TextField
                fullWidth={true}
                margin={'normal'}
                label="Имя"
                variant="outlined"
                placeholder={'Введите ваш имя'}
                {...register('firstName', {
                    required: 'Это обязательное поле',
                })}
            />
            <TextField
                fullWidth={true}
                margin={'normal'}
                label="Username"
                variant="outlined"
                placeholder={'Введите ваш username'}
                {...register('username', {
                    required: 'Это обязательное поле',
                })}
            />
            <TextField
                fullWidth={true}
                margin={'normal'}
                label="Email"
                variant="outlined"
                placeholder={'Введите ваш email'}
                {...register('email', {
                    required: 'Это обязательное поле',
                })}
            />
            <TextField
                type={'password'}
                fullWidth={true}
                margin={'normal'}
                label="Password"
                variant="outlined"
                placeholder={'Введите ваш пароль'}
            />
            <TextField
                type={'password'}
                fullWidth={true}
                margin={'normal'}
                label="Repeat password"
                variant="outlined"
                placeholder={'Повторите ваш пароль'}
            />
            <Button
                type={'submit'}
                sx={{fontFamily: 'Poppins', marginTop: 2, marginBottom: 2, width: '60%'}}
                variant="contained"
            >
                Регистрация
            </Button>
            <Typography
                variant="body1"
                sx={{fontFamily: 'Poppins'}}>
                У вас есть аккаунт?
                <span className={'incitingText'} onClick={() => navigate('/login')}>
                    Авторизация
                </span>
            </Typography>
        </>
    );
};

export default RegisterPage;