import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import {IoIosLogIn} from 'react-icons/io'
import toast, {} from 'react-hot-toast'
import { useAuth } from "../context/AuthContext"


function Login() {

  const auth = useAuth()
  const handelSubmit = async (e:React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", {id: "login"})
      await auth?.login(email, password)
      toast.success("Signing In Successfully", { id: "login" });
    } catch (error) {
      console.log(error)
      toast.error("Signing In Failed", { id: "login" });
      
    }
  }
  return (
    <Box
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "#f5f5f5" }} // light background for contrast
    >
      <form
      onSubmit={handelSubmit}
        style={{
          padding: "40px 30px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
          borderRadius: "15px",
          backgroundColor: "#ffffff",
          minWidth: "350px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            sx={{ color: "#333" }}
          >
            Login
          </Typography>

          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />

          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1.5,
              mt: 1,
              width: "100%", // full width for better look
              borderRadius: 3,
              bgcolor: "#00fffc",
              color: "#000",
              fontWeight: 600,
              transition: "0.3s",
              ":hover": {
                bgcolor: "#00d6d6",
                color: "#fff",
              },
            }}
            endIcon={<IoIosLogIn/ >}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
