import {makeStyles} from "@material-ui/core/styles";

const loginStyles = makeStyles({
  wrapper: {
    width: '350px',
    height: '350px',
    boxShadow: '0px 5px 10px 2px rgba(33, 125, 195, 0.2)',
  },
  field: {
    margin: '0 0 20px 0',
  },
  form: {
    width: '300px',
    textAlign: 'center'
  },
  item: {
    width: '100%',
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
      color: '#1976d2',
    }
  }
});

export default loginStyles;
