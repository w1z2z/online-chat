import React, {useState} from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Popover,
  Snackbar,
  Typography
} from "@mui/material";
import {useRouter} from "next/router";
import QRCode from 'react-qr-code';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

import {Name} from "../../types/interfaces";
import mainMenuStyles from './mainMenu.style'

const MainMenu = ({name}: Name) => {

  const classes = mainMenuStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true)
    setAnchorEl(null)
  };
  const handleCloseModal = () => {
    setOpenModal(false)
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <Grid
      container
      justifyContent='center'
      bgcolor='#1976d2'
    >
      <Button
        onClick={handleClick}
      >
        <span style={{color: '#fff'}}>
           {name}
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpenModal}>Invite your friends</MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>

      <Modal
        keepMounted
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className={classes.box} sx={{bgcolor: 'background.paper', borderRadius: '5px'}}>
          <Grid
            container
            justifyContent='flex-end'
            mb={0}
            width='100%'
          >
            <Grid
              onClick={() => setOpenModal(false)}
              className={classes.close}
            >
              <CloseIcon />
            </Grid>
          </Grid>
          <Grid
            container
            flexDirection='column'
            alignItems='center'
            width='100%'
          >
            <Grid item mb={5}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Invite your friends to our chat!
              </Typography>
            </Grid>
            <Grid item mb={5}>
              <QRCode value={'http://192.168.100.28:3000/login'} />
            </Grid>
            <Grid item width='70%'>
              <Grid
                container
                justifyContent='space-around'
                alignItems='center'
                className={classes.link}
                width='100%'
                mb={2}
                onClick={() => {
                  navigator.clipboard.writeText('http://192.168.100.28:3000/')
                  setOpenSnackbar(true)

                }}
              >
                http://192.168.100.28:3000/
                <ContentCopyTwoToneIcon />
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={3000}
                  onClose={handleCloseSnackbar}
                >
                  <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    Copied in clipboard!
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default MainMenu;