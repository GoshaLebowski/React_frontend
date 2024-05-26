import React, { JSX } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./login";
import RegisterPage from "./register";
import { Box, GlobalStyles } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../utils/hook";
import { AppErrors } from "../../common/errors";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, RegisterSchema } from "../../utils/yup";
import axios from "axios";
import { useStyles, globalStyles } from "./styles";
import {loginUser, registerUser} from "../../store/thunks/auth";

const AuthRootComponent: React.FC = (): JSX.Element => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        resolver: yupResolver(location.pathname === '/login' ? LoginSchema : RegisterSchema),
    });
    const loading = useAppSelector((state) => state.auth.isLoading);

    const handleSubmitForm: SubmitHandler<FieldValues> = async (data: any) => {
        try {
            if (location.pathname === '/login') {
                try {
                    await dispatch(loginUser(data));
                    navigate('/');
                } catch (e) {
                    return e;
                }
            } else {
                if (data.password === data.confirmPassword) {
                    try {
                        await dispatch(registerUser(data));
                        navigate('/');
                    } catch (e) {
                        return e;
                    }
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
        <div className={classes.root}>
            <GlobalStyles styles={globalStyles} />
            <form className={classes.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    maxWidth={640}
                    margin='auto'
                    padding={5}
                    borderRadius={5}
                    boxShadow={'-3px -2px 20px 1px #202020'}
                >
                    {location.pathname === '/login' ? (
                        <LoginPage
                            navigate={navigate}
                            register={register}
                            errors={errors}
                            classes={classes}
                            loading={loading}
                        />
                    ) : location.pathname === '/register' ? (
                        <RegisterPage
                            navigate={navigate}
                            register={register}
                            errors={errors}
                            classes={classes}
                            loading={loading}
                        />
                    ) : null}
                </Box>
            </form>
        </div>
    );
};

export default AuthRootComponent;
