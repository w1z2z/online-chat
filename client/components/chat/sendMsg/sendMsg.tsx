import React, {useEffect, useState} from 'react';
import {Autocomplete, Avatar, Box, Button, Grid, Popover, TextField, Typography} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import {v4 as uuidv4} from "uuid";
import {io} from "socket.io-client";
import {useRouter} from "next/router";
import {Formik} from "formik";
import moment from "moment";

import Message from "../message/message";
import {IMessage} from "../../../types/interfaces";
import {api} from "../../../interceptor";
import sendMsgStyles from './sendMsg.style'
import {stringAvatar} from "../../../helpers/createAvatar";
import {logOut} from "../../../helpers/logOut";
import RoomInfo from "./editRoom/roomInfo";

const socket = io('http://localhost:5001', {transports: ['websocket', 'polling', 'flashsocket']})

const SendMsg = () => {
  const classes = sendMsgStyles();
  const {query} = useRouter();
  const router = useRouter();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [roomId, setRoomId] = useState<string>('');
  const [roomData, setRoomData] = useState<any>({}); //ANY
  const [isGroup, setIsGroup] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (query.id && typeof query.id == "string") {
      if (query.id.split('_')[1] == undefined) {
        connectToGroupRoom(query.id.split(' ')[0])
        setIsGroup(true)
      } else {
        getOneUserData(query.id.split('_')[0]);
        connectToRoom(query.id.split('_')[0]);
        setIsGroup(false)
      }
    }
  }, [query.id])

  useEffect(() => {
    socket.on('connect', () => {
      socket.on('meeting', function(data) {
        // console.log('you have joined the meeting: ', data);
      });
      socket.on("receive-message", (message: IMessage) => {
        receivedMessage(message)
      });
    })
    return () => {
      setMessages([])
    }
  }, [])


  const receivedMessage = (message: IMessage) => {
    setMessages(prev => [...prev, message])
  }

  const getOneUserData = async (userId: string) => {
    try {
      const response = await api.post('http://localhost:5001/users/getOneUserData', {
        userId: userId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setRoomData(response.data)
    } catch (e) {
      logOut(router)
    }
  }

  const connectToGroupRoom = async (groupId: string) => {
    try {
      const response = await api.post('http://localhost:5001/rooms/connectToRoom', {
        groupId: groupId,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setRoomData(response.data)
      setRoomId(response.data.id)
      socket.emit('meeting', { roomId: response.data.id });
      getPrevMessage(response.data.id);
    } catch (e) {
      logOut(router)
    }
  }

  const connectToRoom = async (recipientUserId: string) => {
    try {
      const response = await api.post('http://localhost:5001/rooms/connectToRoom', {
        currentUserId: localStorage.getItem('userId'),
        recipientUserId: recipientUserId
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setRoomId(response.data)
      socket.emit('meeting', { roomId: response.data });
      getPrevMessage(response.data);
    } catch (e) {
      logOut(router)
    }
  }

  const getPrevMessage = async (id: string) => {
    try {
      const response = await api.post('http://localhost:5001/messages/getPrevMessage', {
        roomId: id,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setMessages(response.data)
    } catch (e) {
      logOut(router)
    }
  }

  const sendMsg = (text: string) => {
    moment.locale();
    const message = {
      id: uuidv4(),
      currentUserName: localStorage.getItem('userName'),
      currentUserId: localStorage.getItem('userId'),
      message: text,
      date: new Date(),
      roomId: roomId,
    }
    socket.emit('send-message', message)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      className={classes.main}
      flexDirection='column'
      alignItems='center'
      justifyContent='space-around'
      width='350px'
    >
      <Grid
        item
        className={classes.line}
      >
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          borderBottom='2px solid #1976d2'
          boxShadow='0px 21px 8px -14px rgba(25, 118, 210, 0.2)'
        >
          <h4
            className={classes.back}
            onClick={(e) => {
              router.push('/main')
            }}
          >
            <ArrowBackIosNewIcon
              color={'primary'}
            />
            Back
          </h4>
          {
            isGroup
            ?  <Avatar
                 {...stringAvatar(roomData?.name, ' ', '#1976d2')}
                 onClick={handleClick}
                 style={{cursor: 'pointer'}}
              />
            : <Avatar
                {...stringAvatar(roomData?.name, roomData?.surname, roomData?.color)}
                onClick={handleClick}
                style={{cursor: 'pointer'}}
              />
          }
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            className={classes.info}
          >
            <RoomInfo setRoomData={setRoomData} handleClose={handleClose} id={roomData?.id} name={roomData?.name} usersData={roomData?.usersData} otherUser={roomData?.otherUser} />
          </Popover>
        </Grid>
      </Grid>
      <Grid
        item
        className={classes.messages}
        flexDirection='column-reverse'
        alignItems='center'
        m={1.5}
      >
        <Grid
          container
        >
          {
            messages?.length !== 0
              ? messages?.map((item: IMessage) => {
                return(
                  <Message currentUserName={item.currentUserName} message={item.message} date={item.date} color={'#002884'} key={item.id} />
                )
              })
              : <p className={classes.empty}>The message list is empty. <br/>Write something!</p>
          }
        </Grid>
      </Grid>
      <Formik
        initialValues={{ text: ''}}
        onSubmit={(values, { setSubmitting }) => {
          if (values.text) {
            sendMsg(values.text)
            values.text = ''
          }
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
          <form
              onSubmit={e => {
                e.preventDefault()
                handleSubmit()
              }}
              className={classes.form}>
            <Grid
              container
              className={classes.input}
              flexDirection='column'
              alignItems='center'
            >
              <Grid item width='100%' mb={1.5}>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  placeholder="Enter your message..."
                  sx={{backgroundColor: '#fff'}}
                  name="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.text}
                  variant="outlined"
                  fullWidth
                  required
                  autoComplete='off'
                />
              </Grid>
              <Grid item width='100%'>
                <Button type='submit' variant="contained" fullWidth>Send <SendIcon style={{marginLeft: '10px'}} /></Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default SendMsg;