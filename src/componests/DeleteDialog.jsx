import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, reset } from '../features/task/taskSlice';
import {toast} from 'react-toastify'

const DeleteDialog = ({taskId}) => {
    const {isSuccess} = useSelector(state=>state.task)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        dispatch(reset())
    }, [isSuccess, dispatch])
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        handleClose()
        dispatch(deleteTask(taskId))
        .unwrap()
        .then(()=>toast.success('Deleted successfully'))
        .catch((error)=>toast.error(error))
    }
    return (
        <div>
            <Tooltip title='Delete'>
                <IconButton
                    onClick={handleClickOpen}>
                    <DeleteIcon
                        sx={{
                            color: 'warning.main',
                        }}
                    />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Do you want to delete this task permanently?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This task will delete permanently. You can't restore this again.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' size='small'>NO</Button>
                    <Button onClick={handleDelete} variant='contained' size='small' color = 'warning' autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteDialog;