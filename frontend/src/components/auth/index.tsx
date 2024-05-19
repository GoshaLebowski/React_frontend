import React, {JSX} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import './style.scss';
import {Box} from "@mui/material";
import {instance} from "../../utils/axios";
import {useAppDispatch} from "../../utils/hook";
import {login} from "../../store/slice/auth";
import {AppErrors} from "../../common/errors";
import {useForm, SubmitHandler, FieldValues} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {LoginSchema, RegisterSchema} from "../../utils/yup";
import {LoginFormValues, RegisterFormValues} from "../../common/types/auth";
import axios from "axios";

const AuthRootComponent: React.FC = (): JSX.Element => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        resolver: yupResolver(location.pathname === '/login' ? LoginSchema : RegisterSchema),
    });

    const handleSubmitForm: SubmitHandler<FieldValues> = async ({
        email,
        password,
        confirmPassword,
        firstName,
        username
    }) => {
        try {
            if (location.pathname === '/login') {
                const userData: LoginFormValues = {
                    email,
                    password
                };
                const user = await instance.post('auth/login', userData);
                dispatch(login(user.data));
                navigate('/');
            } else {
                if (password === confirmPassword) {
                    const userData: RegisterFormValues = {
                        firstName,
                        username,
                        email,
                        password,
                    };
                    const newUser = await instance.post('auth/register', userData);
                    dispatch(login(newUser.data));
                    navigate('/');
                } else {
                    alert(AppErrors.PasswordDoNotMatch);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    alert(error.response.data.message);
                }
            } else {
                console.error('Unknown error:', error);
            }
        }
    };

    return (
        <div className='root'>
            <form className="form" onSubmit={handleSubmit(handleSubmitForm)}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    maxWidth={640}
                    margin='auto'
                    padding={5}
                    borderRadius={5}
                    boxShadow={'5px 5px 10px #ccc'}
                >
                    {location.pathname === '/login' ? (
                        <LoginPage
                            navigate={navigate}
                            register={register}
                            errors={errors}
                        />
                    ) : location.pathname === '/register' ? (
                        <RegisterPage
                            navigate={navigate}
                            register={register}
                            errors={errors}
                        />
                    ) : null}
                </Box>
            </form>
        </div>
    );
};

export default AuthRootComponent;
