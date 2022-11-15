import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { editTaskStatus } from '../features/task/taskSlice';
import {toast } from 'react-toastify';
const EditModal = ({ taskId, status: taskStatus }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const dispatch = useDispatch()
    const [status, setStatus] = React.useState(taskStatus);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const handleSubmit = () => {
        handleClose()
        dispatch(editTaskStatus({ taskId, status }))
        .unwrap()
        .then(()=>toast.success('Edited successfully'))
        .catch((error)=>toast.error(error))

    }
    return (
        <>
            <Tooltip title='Edit Status'>
                <IconButton
                    onClick={handleOpen}
                    sx={{ color: 'primary.main', ml: '0.5rem' }}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormControl fullWidth sx={{ mb: '1rem' }}>
                        <InputLabel id="status-label">Select</InputLabel>
                        <Select
                            value={status}
                            label="Select"
                            onChange={handleChange}
                        >
                            <MenuItem value='new'>New</MenuItem>
                            <MenuItem value='pending'>In Progress</MenuItem>
                            <MenuItem value='completed'>Completed</MenuItem>
                            <MenuItem value='cancelled'>Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction='row' justifyContent='flex-end'>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={handleSubmit}
                            sx={{ mr: '0.5rem' }}
                        >
                            Ok
                        </Button>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={handleClose}
                        >
                            close
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default EditModal;