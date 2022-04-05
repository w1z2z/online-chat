import React, {useEffect, useState} from 'react';
import Head from "next/head";
import {Grid, Tab, Tabs} from "@mui/material";
import {useRouter} from "next/router";

import UserCard from "./components/userCard/userCard";
import {Users} from "../../types/interfaces";
import {api} from "../../interceptor";
import MainMenu from "../../components/mainMenu/mainMenu";
import Footer from "../../components/footer/footer";
import mainStyles from "./index.style";
import {logOut} from "../../helpers/logOut";
import {Box} from "@mui/system";
import TabChat from "./components/tabs/tabChat";
import {GroupList, UserCardProps} from "./components/interfaces";

const Main = () => {
  const classes = mainStyles()
  const router = useRouter()
  const [allUsers, setAllUsers] = useState<UserCardProps[]>([])
  const [allGroups, setAllGroups] = useState<GroupList[]>([])
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (!localStorage.getItem('userId')
      || !localStorage.getItem('userName')
      || !localStorage.getItem('accessToken')
      || !localStorage.getItem('refreshToken')
    ) {
      localStorage.clear()
      router.push('/login')
    }
    setName(localStorage.getItem('userName') || '')
    getAllUsers()
    getAllGroups()
  }, [])

  const getAllUsers = async (): Promise<void> => {
    try {
      const response = await api.get('http://localhost:5001/users/getAllUsers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setAllUsers(response.data)
    } catch (e) {
      logOut(router)
    }
  }

  const getAllGroups = async (): Promise<void> => {
    try {
      const response = await api.post('http://localhost:5001/rooms/getAllGroups', {
        userId: localStorage.getItem('userId'),
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      setAllGroups(response.data)
    } catch (e) {
      logOut(router)
    }
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Head>
        <title>Dialogs</title>
      </Head>
      <Grid
        container
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
        position='fixed'
        width='100%'
        height='100%'
        overflow='auto'
        wrap='nowrap'
      >
        <MainMenu name={name} />
        <Grid
          className={classes.tabs}
        >
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0, borderColor: 'primary' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Private messages" sx={{ width: '150px'  }}/>
                <Tab label="Group chat" sx={{ width: '150px' }}/>
              </Tabs>
            </Box>
            <TabChat value={value} allUsers={allUsers} allGroups={allGroups}/>
          </Box>
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
};

export default Main;