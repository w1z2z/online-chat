import {makeStyles} from "@material-ui/core/styles";

const messageStyle = makeStyles({
  main: {
    width: '100%',
    minHeight: '68px',
    marginTop: '5px',
    height: 'auto',
    borderRadius: '5px',
  },
  currentUser: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: '10px',
    marginBottom: '5px',
  },
  currentUserName: {
    color: '#1976d2',
    textAlign: 'right',
    margin: '5px 0',
  },
  currentUserMessage: {
    width: '90%',
    textAlign: 'left',
    padding: '10px 10px',
    border: '1px solid #1976d2',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '5px',
    wordWrap: 'break-word'
  },
  recipientUser: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: '10px',
    marginBottom: '5px',
  },
  recipientUserName: {
    color: '#1976d2',
    textAlign: 'left',
    margin: '5px 0px',
  },
  recipientUserMessage: {
    width: '90%',
    textAlign: 'left',
    padding: '10px 10px',
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #1976d2',
    borderRadius: '5px',
    wordWrap: 'break-word'
  },
  date: {
    color: '#cbcbcb',
    margin: '0 10px',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '12px'
  }
});

export default messageStyle;
