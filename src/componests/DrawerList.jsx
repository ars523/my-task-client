import React from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../features/task/taskSlice';
const DrawerList = ({setOpen}) => {
    const [selectedItem, setSelectedItem] = useState(2)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        switch (window.location.pathname) {
            case "/dashboard":
                setSelectedItem(0)
              break;
            case "/addTask":
                setSelectedItem(1)
              break;
              case "/":
                setSelectedItem(2)
                break;
            case "/progress":
                setSelectedItem(3)
              break;
            case "/completed":
                setSelectedItem(4)
              break;
            case "/cancelled":
                setSelectedItem(5)
              break;
            case "/login":
                setSelectedItem(-1)
              break;
         
            default:
                setSelectedItem(2)
              break;
           }
          // eslint-disable-next-line react-hooks/exhaustive-deps
          },[window.location.pathname])
    const lists = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            onclick: () => navigate('/dashboard')
        },
        {
            text: 'Add Task',
            icon: <CreateIcon />,
            onclick: () => {dispatch(reset()); navigate('/addTask')}
        },
        {
            text: 'New Task',
            icon: <ListAltIcon />,
            onclick: () => navigate('/')
        },
        {
            text: 'In Progress',
            icon: <HourglassBottomIcon />,
            onclick: () => navigate('/progress')
        },
        {
            text: 'Completed',
            icon: <FactCheckIcon />,
            onclick: () => navigate('/completed')
        },
        {
            text: 'Canceled',
            icon: <CancelIcon />,
            onclick: () => navigate('/cancelled')
        },
    ]
    return (
        <>
            <List sx={{
                // selected and (selected + hover) states
                '&& .Mui-selected, && .Mui-selected:hover': {
                    bgcolor: 'primary.dark',
                    '&, & .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                    },
                },
                // hover states
                '& .MuiListItemButton-root:hover': {
                    bgcolor: 'primary.light',
                    '&, & .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                    },
                },
            }}>
                {lists.map(({ text, icon, onclick }, index) => (
                    <ListItem key={text} disablePadding selected={selectedItem === index}>
                        <ListItemButton
                            onClick={() => { onclick(); setSelectedItem(index); setOpen && setOpen(false)}}
                        >
                            <ListItemIcon sx={{ color: 'white' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default DrawerList;