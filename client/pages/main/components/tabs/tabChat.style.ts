import {makeStyles} from "@material-ui/core/styles";

export const createGroupChatStyles = makeStyles({
  //Pages
  blockPages: {
    marginTop: '20px',
    maxWidth: '350px',
    height: '600px',
    overflowY: 'auto',
    // backgroundColor: 'rgba(210,229,250,0.17)',
    borderRadius: '5px',
  },
  firstPage: {
    width: '90%',
    height: '600px',
    paddingTop: '10px',
    textAlign: 'center'
  },
  secondPage: {
    width: '90%',
    height: '600px',
  },

  //Modal
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '360px',
    height: '640px',
    border: '2px solid #1976d2',
    // p: 4,
    paddingBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  close: {
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1976d2',
    '&:hover': {
      cursor: 'pointer',
      color: '#ba000d'
    }
  },
  createGroupChat: {
    height: 'auto',
    // border: '1px solid #000',
  },
  form: {
    textAlign: 'center',
    width: '100%',
  },
  checkedUsers: {
    borderBottom: '1px solid #1976d2',
    height: '70px',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    padding: '10px',
    alignItems: 'center',
  },
  userList: {
    height: '300px',
    overflowX: 'auto'
  },
  userCard: {
    height: '60px',
    border: '1px solid #1976d2',
    borderRadius: '5px',
  },
  addUser: {
    color: '#1976d2',
    '&:hover': {
      cursor: 'pointer',
      color: '#fff',
      backgroundColor: '#1976d2',
      borderRadius: '50%'
    }
  }

});

export default createGroupChatStyles;
