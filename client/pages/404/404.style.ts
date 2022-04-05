import {makeStyles} from "@material-ui/core/styles";

const pageNotFound = makeStyles({
  main: {
    width: '300px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    margin: '100px auto',
    textAlign: 'center',
    flexDirection: 'column',
  },
  title: {
    color: '#000',
    textTransform: 'uppercase'
  },
  link: {
    textDecoration: 'underline',
    '&:hover': {
      color: '#1976d2',
    }
  }

});

export default pageNotFound;
