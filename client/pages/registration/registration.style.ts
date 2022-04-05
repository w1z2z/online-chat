import {makeStyles} from "@material-ui/core/styles";

const registrationStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
  },
  el: {
    width: '100%',
  },
  fileUpload: {
    display: 'flex',
    alignItems: 'baseline',
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
      color: '#1976d2',
    }
  }
});

export default registrationStyles;
