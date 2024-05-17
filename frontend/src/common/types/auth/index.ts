import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

export interface IPropsLogin<
    TFieldValues extends FieldValues = FieldValues,
> {
    navigate: (url: string) => void;
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
}

export interface IPropsRegister<
    TFieldValues extends FieldValues = FieldValues,
> {
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
    navigate: (url: string) => void;
}

export interface IAuthState {
    user: IPublicUser,
    isLogged: boolean;
}

interface IPublicUser {
    id: number | null,
    firstName: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    watchlist: [IWatchlist]
}

interface IWatchlist {
    id: number | null,
    name: string,
    assetId: string,
    createdAt: string,
    updatedAt: string,
    user: number | null
}