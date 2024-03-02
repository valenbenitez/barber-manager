import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useMediaQuery } from '@mui/material';

interface Props {
    open: any;
    setOpen: any;
    title?: string;
    severity?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

Alert.displayName = 'Alert';

export default function SimpleSnackbar({
    open,
    setOpen,
    title = '',
    severity = '',
}: Props) {
    const isMobileScreen = useMediaQuery('(max-width:1199px)');
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Stack spacing={2} sx={{ width: '100%', margin: '0 auto' }}>
            <Snackbar
                anchorOrigin={{
                    vertical: isMobileScreen ? 'top' : 'bottom',
                    horizontal: isMobileScreen ? 'left' : 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity === '' ? 'success' : 'error'}
                    sx={{ width: isMobileScreen ? '80%' : '100%' }}
                >
                    {title === '' ? '¡Listo! Hemos guardado tus datos' : title}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
