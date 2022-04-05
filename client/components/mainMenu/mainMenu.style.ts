import {makeStyles} from "@material-ui/core/styles";

export const mainMenuStyles = makeStyles({
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '360px',
    height: '530px',
    border: '2px solid #1976d2',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
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
  link: {
    border: '1px solid #1976d2',
    borderRadius: '5px',
    height: '40px',
    color: '#1976d2',
    '&:hover': {
      cursor: 'pointer',
      color: '#fff',
      backgroundColor: '#1976d2',
      boxShadow: '0px 5px 10px 2px rgba(114, 194, 255, 0.2) inset',
    }
  },
});

export default mainMenuStyles;
