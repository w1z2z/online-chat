import React, {useEffect, useState} from 'react';
import {Autocomplete, Avatar, Button, Chip, Grid, Stack, TextField} from "@mui/material";
import {roomInfoStyles} from './roomInfo.style'
import {UserCardProps} from "../../../../pages/main/components/interfaces";
import {stringAvatar} from "../../../../helpers/createAvatar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {api} from "../../../../interceptor";

interface IRoomData {
  id: string,
  name: string,
  surname?: string,
  usersData?: UserCardProps[],
  color?: string,
  otherUser?: UserCardProps[] | null,
  handleClose: Function,
  setRoomData: Function,
}

const RoomInfo = (roomData: IRoomData) => {
  const classes = roomInfoStyles();
  const [editRoomData, setEditRoomData] = useState<string>('none');
  const [searchedUser, setSearchedUser] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<UserCardProps[]>([]);

  const [newRoomName, setNewRoomName] = useState<string>('');
  const [usersList, setUsersList] = useState<UserCardProps[] | null | undefined>([]);

  useEffect((): void => {
    console.log(roomData)
    if (roomData) {
      setUsersList(roomData?.otherUser)
      setNewRoomName(roomData?.name)

    }
  }, [roomData])

  const handleDelete = (user: UserCardProps): void => {
    setSelectedUsers(selectedUsers?.filter((userId: any) => userId.id !== user.id ))
    setUsersList((prev: any) => [...prev, user])
  };
  const addUserToList = (user: UserCardProps): void => {
    setSelectedUsers((prev: any) => [...prev, user])
    setUsersList(usersList?.filter((usId: any) => usId.id !== user.id ))
  }

  const editGroupChat = async (): Promise<void> => {
    if (newRoomName.length > 0) {
      try {
        const response = await api.post('http://localhost:5001/rooms/editGroupChat', {
          groupId: roomData?.id,
          newName: newRoomName,
          newMember: selectedUsers.map((el: UserCardProps) => {
            return el.id
          }),
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })

        roomData?.handleClose()
        console.log(response.data)
        const newRoomData = {
          id: response.data.id,
          name: response.data.name,
          usersId: response.data.usersId,
          usersData: roomData.usersData,
        }

        roomData?.setRoomData(newRoomData)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <Grid
      container
      flexDirection='column'
      className={classes.info}
      sx={{
        width: '350px',
        minHeight: '50px',
        height: 'auto',
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        justifyContent='center'
        className={classes.infoName}
      >
        {
          roomData?.surname ? `${roomData?.name} ${roomData?.surname}` : roomData?.name
        }
      </Grid>
      {
        roomData?.usersData
          ? <Grid
            container
            flexDirection='column'
            className={classes.infoOther}
          >
            <Grid
              container
              justifyContent='space-around'
            >
              <p>
                Members:
              </p>
              <Grid mt={2}>
                {
                  roomData?.usersData.map((item: any) => {
                    return(
                      <Grid key={item.id}>
                        <span style={{color: item.color}}>
                          {item.name} {item.surname}
                        </span><br/>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent='center'
              mt={2}
            >
              <Grid mb={1}>
                <Button
                  variant={editRoomData == 'none' ? 'contained' : 'outlined'}
                  onClick={() => {
                    setEditRoomData(editRoomData == 'none' ? 'flex' : 'none')
                  }}
                >
                  {editRoomData == 'none' ? 'Open edit menu' : 'Close edit menu'}
                </Button>
              </Grid>
              <Grid
                container
                justifyContent='center'
                sx={{
                  display: editRoomData,
                  width: '100%',
                  height: 'auto',
                }}
              >
                <form>
                  <Grid
                    sx={{
                      width: '250px',
                    }}
                    mt={2}
                    container
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Edit group name"
                      placeholder="Enter group name..."
                      name="text"
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      variant="outlined"
                      fullWidth
                      required
                      autoComplete='off'
                    />
                  </Grid>
                  <Grid
                    sx={{
                      width: '250px',
                    }}
                    mt={0.5}
                  >
                    <Grid
                      container
                      width='100%'
                      className={classes.checkedUsers}
                    >
                      <Stack direction="row" spacing={1}>
                        {
                          selectedUsers.length != 0
                            ? selectedUsers?.map((item: any) => {
                              return(
                                <Chip
                                  label={item.name}
                                  variant="outlined"
                                  color='primary'
                                  onDelete={() => handleDelete(item)}
                                  key={item.id}
                                />
                              )
                            })
                            : <span>Add new users on chat</span>
                        }
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid item width='100%'>
                    <Grid
                      container
                      flexDirection='column'
                      alignItems='center'
                      mt={2}
                      width='100%'
                      className={classes.userList}
                    >
                      <Grid
                        container
                        flexDirection='column'
                        alignItems='flex-start'
                        justifyContent='center'
                        width='100%'
                        pt={1}
                      >
                        <Grid
                          width='95%'
                        >
                          <TextField
                            label="Find people"
                            placeholder="Enter name or surname"
                            variant="outlined"
                            type="text"
                            value={searchedUser}
                            onChange={(e) => setSearchedUser(e.target.value)}
                            required
                            autoComplete='off'
                            fullWidth
                          />
                        </Grid>
                        <Grid>
                          {
                            usersList?.map((item: any) => {
                              return (
                                <Grid
                                  container
                                  width='95%'
                                  key={item.id}
                                  className={classes.userCard}
                                  flexWrap='nowrap'
                                  alignItems='center'
                                  justifyContent='left'
                                  mt={2}
                                >
                                  <Grid pl={2}>
                                    <Avatar {...stringAvatar(item.name, item.surname, item.color)} />
                                  </Grid>
                                  <Grid
                                    container
                                    ml={2}
                                    width='140px'
                                    justifyContent='flex-start'
                                    sx={{overflow: 'hidden', textAlign: 'left'}}
                                  >
                                    {item.name} {item.surname}
                                  </Grid>
                                  <Grid pr={1.5}>
                                    <AddCircleOutlineIcon
                                      className={classes.addUser}
                                      fontSize='medium'
                                      onClick={() => {
                                        addUserToList(item)
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              )
                            })
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent='center'
                    mt={2}
                    mb={2}
                    width='100%'
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={editGroupChat}
                    >
                      Save changes
                    </Button>
                  </Grid>
                </form>

              </Grid>
            </Grid>
          </Grid>
          : null
      }
    </Grid>
  );
};

export default RoomInfo;