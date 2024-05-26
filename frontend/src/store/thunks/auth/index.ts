import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginFormValues, RegisterFormValues} from "../../../common/types/auth";
import {instance} from "../../../utils/axios";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: LoginFormValues, {rejectWithValue}) => {
        try {
            const user = await instance.post('auth/login', data);
            sessionStorage.setItem('token', user.data.token);
            sessionStorage.setItem('name', user.data.user.firstName);
            return user.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error);
            }
        }
    }
)

export const registerUser = createAsyncThunk (
    'auth/register',
    async (data: RegisterFormValues, {rejectWithValue}) => {
        try {
            const user = await instance.post('auth/register', data);
            sessionStorage.setItem('token', user.data.token);
            sessionStorage.setItem('name', user.data.user.firstName);
            return user.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error);
            }
        }
    }
)