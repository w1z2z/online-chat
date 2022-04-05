import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {Grid} from "@mui/material";

import pageNotFound from "./404.style";

const error = () => {
  const classes = pageNotFound();

  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Grid
        container
        justifyContent='center'
        flexDirection='column'
        className={classes.main}
      >
        <h1 className={classes.title}>page not found</h1>
        <p className={classes.link}>
          <Link href="/main">Back to main page</Link>
        </p>
      </Grid>
    </>

  );
};

export default error;