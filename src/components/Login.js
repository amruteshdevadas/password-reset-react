import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
function Login() {
  const [message,setMessage] = useState("")
  const handleSubmit = async (e) => {
    
    try {
      let user = axios.post('https://password-reset-b251-wd-task.herokuapp.com/users/login',{id:e.email,password:e.password})
    .then((response)=>{
      // console.log(response.data.token)
      window.localStorage.setItem("app_token",response.data.token)
      console.log(response.data.message)
      setMessage(response.data.message)

    })
    } catch (error) {
      console.log(error) 
      setMessage(error.message)
    }
  };


  const initialValues = { email: "", password: "" };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(4, "min 4 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleLogout =()=>{
    window.localStorage.removeItem("app_token")
    setMessage("Logged Out")
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Button
            onClick={handleLogout}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Logout
            </Button>
            <Button
              href ="/forgotPassword"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             forgotPassword
            </Button>
          </Box>
        </Box>
        {message}
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </form>
  );
}

export default Login;
