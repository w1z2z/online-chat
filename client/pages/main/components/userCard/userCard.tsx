import React from 'react';
import {Avatar, Grid} from "@mui/material";

import {useRouter} from "next/router";
import {UserCardProps} from "../interfaces";
import userCardStyles from './userCard.style'
import {stringAvatar} from "../../../../helpers/createAvatar";

const UserCard = ({name, surname, color, id}: UserCardProps) => {

  const classes = userCardStyles();
  const router = useRouter()
  const user = `${name} ${surname}`

  return (
    <Grid
      container
      justifyContent='flex-start'
      flexWrap='nowrap'
      alignItems='center'
      className={classes.block}
      onClick={(e) => {
        router.push(`/dialogs/${id}_${user}`)
      }}
    >
      <Grid
        item
        ml={2}
        className={classes.avatar}
      >
        <Avatar {...stringAvatar(name, surname, color)} />
      </Grid>
      <Grid
        item
        className={classes.name}
      >
        <p>{ `${name} ${surname}` }</p>
      </Grid>
    </Grid>
  );
};

export default UserCard;