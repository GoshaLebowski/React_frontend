import { makeStyles, createStyles } from '@mui/styles';

export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '100vh',
            padding: '20px'
        },
        form: {
            flex: 1
        },
        incitingText: {
            color: '#1900D5 !important',
            marginLeft: '10px',
            cursor: 'pointer',
        },
    })
);

export const globalStyles = {
    '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ffffff !important',
    },
    '.MuiFormLabel-root.Mui-focused': {
        color: '#ffffff !important',
    },
};
