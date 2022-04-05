import React from 'react';
import {Avatar, Grid} from "@mui/material";
import {useRouter} from "next/router";
import GroupsIcon from '@mui/icons-material/Groups';

import GroupCardStyles from './groupCard.style'
import {stringAvatar} from "../../../../helpers/createAvatar";
import {GroupList} from "../interfaces";
import {blue} from "@mui/material/colors";

const GroupCard = ({name, id}: GroupList) => {
  const classes = GroupCardStyles();
  const router = useRouter()

  return (
    <Grid
      container
      justifyContent='flex-start'
      flexWrap='nowrap'
      alignItems='center'
      className={classes.block}
      onClick={(e) => {
        router.push(`/dialogs/${id} group`)
      }}
    >
      <Grid
        item
        ml={2}
        className={classes.avatar}
      >
        <Avatar sx={{ bgcolor: blue[500] }} >
          <GroupsIcon />
        </Avatar>
      </Grid>
      <Grid
        item
        className={classes.name}
      >
        <p>{ `${name?.split(' ')[0]}` }</p>
      </Grid>
    </Grid>
  );
};

export default GroupCard;