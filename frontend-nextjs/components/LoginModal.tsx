import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEventHandler, useContext, useRef, useState } from 'react';
import config from '../utils/config';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { AuthContext } from '../pages/_app';
import LoadingIndicator from './LoadingIndicator';

export default function LoginModal() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const {changeAuth} = useContext(AuthContext)
    const router = useRouter();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault();
        setError('');
        setProcessing(true);
        try{
            const response = await axios.post(`${config.backendUrl}/login`, {
                phone: phoneRef.current?.value,
                password: passwordRef.current?.value
            })
            localStorage.setItem("userToken", JSON.stringify(response.data.jwtToken.token))
            changeAuth(true);
            router.push('/')
        } catch (err) {
            try{
                setError((err as any).response.data.message)
            } catch (err) {
                setError("An unknown error has occurred")
            }
        }
        setProcessing(false);
        
    }

    return (
        <div> 
            <Button variant="contained" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <form onSubmit={onSubmit}>
                    <DialogContent>
                        { error && (
                            <Alert variant="filled" severity="error">{error}</Alert>
                        )}
                        {/* <DialogContentText>
                            If you are a part of the board and dont have an account, please contact the IT.
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Phone Number"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="phone"
                            inputRef={phoneRef}
                            required
                            inputProps={{
                                minLength: 11,
                                maxLength: 11,
                                pattern: "[0-9]+"
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            name="pass"
                            inputRef={passwordRef}
                            required
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit' disabled={processing}>Login</Button>
                    </DialogActions>
                </form>
                <LoadingIndicator open={processing} />
            </Dialog>
        </div>
    )
}