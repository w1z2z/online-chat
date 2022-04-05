import React from 'react';
import {Grid} from "@mui/material";
import moment from "moment";

import {IMessage} from "../../../types/interfaces";
import messageStyle from "./message.style";

const Message = (props: IMessage) => {
  const {currentUserName, message, date, color} = props
  const classes = messageStyle();

  return (
    <Grid item className={classes.main}>
      {
        currentUserName == localStorage.getItem('userName')
          ? <div className={classes.currentUser}>
              <div className={classes.currentUserName}>
                You
              </div>
              <div className={classes.currentUserMessage}>{message}</div>
              <div className={classes.date}>
                <span>{moment(date).format('lll')}</span>
              </div>
            </div>
          : <div className={classes.recipientUser}>
              <div className={classes.recipientUserName}>
                <span style={{color: color}}>
                  {currentUserName}
                </span>
              </div>
              <div
                className={classes.recipientUserMessage}
                style={{border: `1px solid ${color}`}}
              >
                {message}
              </div>
              <div className={classes.date}>
                <span>{moment(date).format('lll')}</span>
              </div>
            </div>
      }
    </Grid>
  );
};

export default Message;