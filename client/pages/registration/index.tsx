import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import Head from "next/head";
import {Alert, Button, Grid, Snackbar, TextField} from "@mui/material";
import {Formik, FormikValues} from "formik";
import Link from "next/link";

import {api} from "../../interceptor";
import {stringToColor} from "../../helpers/createAvatar";
import registrationStyles from "./registration.style"
import ChatIcon from "@mui/icons-material/Chat";

function generateDownload(canvas: any, crop: any) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob: any) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.download = 'cropPreview.png';
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    'image/png',
    1
  );
}

const Registration = () => {
  const classes = registrationStyles();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [regError, setRegError] = useState<string>('error')
  const [photo, setPhoto] = useState<any>()
  const [img, setImg] = useState<any>('')

  const handleClose = ():void => {
    setOpen(false);
  };

  const createError = (error: string):void => {
    setRegError(error)
    setOpen(true);
  }

  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const onSelectFile = (e: { target: { files: string | any[]; }; }) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setUpImg(reader.result);
        console.log(upImg)
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image: any = imgRef.current;
    const canvas: any = previewCanvasRef.current;
    const crop: any = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const register = async (values: FormikValues):Promise<void> => {
    // function saveImage(url: any) {
    //   var img = document.createElement("img");
    //   img.src = url;
    //   img.onload = function() {
    //     var key = encodeURIComponent(url),
    //     canvas = document.createElement("canvas");
    //
    //     canvas.width = img.width;
    //     canvas.height = img.height;
    //     var ctx = canvas.getContext("2d");
    //     ctx?.drawImage(img, 0, 0);
    //     console.log('ctx', ctx)
    //     console.log('canvas', canvas)
    //     // return canvas.toDataURL("image/png");
    //     // localStorage.setItem(key, canvas.toDataURL("image/png"));
    //   }
    // }
    // function getCroppedImg(image: any) {
    //   const canvas = document.createElement("canvas");
    //   const scaleX = image.naturalWidth / image.width;
    //   const scaleY = image.naturalHeight / image.height;
    //   canvas.width = crop.width;
    //   canvas.height = crop.height;
    //   const ctx = canvas.getContext("2d");
    //
    //   // New lines to be added
    //   const pixelRatio = window.devicePixelRatio;
    //   canvas.width = 100;
    //   canvas.height = 100;
    //   ctx?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    //   ctx?.imageSmoothingQuality = "high";
    //
    //   ctx?.drawImage(
    //     image,
    //     0,
    //     0,
    //   );
    //
    //   // As Base64 string
    //   const base64Image = canvas.toDataURL("image/jpeg");
    //   return base64Image;
    //
    // }

    // console.log(getCroppedImg('https://mdn.mozillademos.org/files/5397/rhino.jpg'))
    // console.log(btoa(photo[0]))
    // console.log(Base64.fromByteArray(photo[0]))
    try {
      const response = await api.post('http://localhost:5001/authorization/reg', {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        color: stringToColor(values.name),
        // photo: ,
      })
      if (response.data) {
        router.push(`/login`)
      } else {
        createError('User with this email already exist!')
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      {/*<div>*/}
      {/*  <input type="file" accept="image/*" onChange={onSelectFile} />*/}
      {/*</div>*/}
      {/*<div style={{width: '20px', height: '20px'}}>*/}
      {/*  <ReactCrop*/}
      {/*    src={upImg}*/}
      {/*    onImageLoaded={onLoad}*/}
      {/*    crop={crop}*/}
      {/*    onChange={(c) => setCrop(c)}*/}
      {/*    onComplete={(c) => setCompletedCrop(c)}*/}
      {/*  />*/}
      {/*  <canvas*/}
      {/*    ref={previewCanvasRef}*/}
      {/*    // Rounding is important so the canvas width and height matches/is a multiple for sharpness.*/}
      {/*    style={{*/}
      {/*      // display: 'none',*/}
      {/*      width: Math.round(completedCrop?.width ?? 0),*/}
      {/*      height: Math.round(completedCrop?.height ?? 0)*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<p>*/}
      {/*  Note that the download below  work in this sandbox due to the*/}
      {/*  iframe missing just for your reference.*/}
      {/*</p>*/}
      {/*<button*/}
      {/*  type="button"*/}
      {/*  disabled={!completedCrop?.width || !completedCrop?.height}*/}
      {/*  onClick={() =>*/}
      {/*    generateDownload(previewCanvasRef.current, completedCrop)*/}
      {/*  }*/}
      {/*>*/}
      {/*  Download cropped image*/}
      {/*</button>*/}

      <Grid
        container
        height='100vh'
        width='100%'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          container
          width='350px'
          height='620px'
          justifyContent='center'
          boxShadow='0px 5px 10px 2px rgba(33, 125, 195, 0.2)'
        >
          <h1>Register in a chat <ChatIcon color={'primary'} /></h1>
          <Formik
            initialValues={{name: '', surname: '', email: '', password: '', passwordRepeat: '', photo: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.password === values.passwordRepeat) {
                // console.log(values)
                register(values)
              } else {
                createError('Password mismatch!')
              }
            }}
          >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
              <form
                className={classes.form}
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
              >
                <Grid className={classes.el} mb={1.5}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.el} mb={1.5}>
                  <TextField
                    className={classes.el}
                    label="Surname"
                    variant="outlined"
                    type="text"
                    name="surname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.surname}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.el} mb={1.5}>
                  <TextField
                    className={classes.el}
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.el} mb={1.5}>
                  <TextField
                    className={classes.el}
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.el} mb={1.5}>
                  <TextField
                    className={classes.el}
                    label="Password repeat"
                    variant="outlined"
                    type="password"
                    name="passwordRepeat"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordRepeat}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item className={classes.el} mb={1.5}>
                  <input
                    className={classes.el}
                    type="file"
                    onChange={(e) => setPhoto(e.target.files)}
                  />
                </Grid>
                <Grid item className={classes.el} mb={1.5}>
                  <Button
                    className={classes.el}
                    variant="contained"
                    type="submit"
                  >
                    Register
                  </Button>
                </Grid>
                <Link href='/login'>
                  <a className={classes.link}>Sing in</a>
                </Link>
              </form>
            )}
          </Formik>
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {regError}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default Registration;