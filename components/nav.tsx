'use client'

import { useState, useEffect } from "react"
//@ts-ignore
import Cookies from 'js-cookie'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { DisplayUser, User, loginUser } from "../prismaclient/dbtypes"
import router, { useRouter } from "next/router"
import handleLogin from "@/pages/api/login"
import { addDays } from "date-fns"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Navbar() {
    const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [pass, setPass] = useState("")
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [errorLogin, setErrorLogin] = useState<{color: string, message: string}>({color: "red", message: ""})
  const [user, setUser] = useState<DisplayUser>()
  const {data: session, status} = useSession()

  const handleAddOpen = () => {
    setOpen(true)
  }

  const handleAddClose = () => {
    setOpen(false)
  }

  const handleLoginOpen = () => {
    setOpenLogin(true)
  }
  const handleLoginClose = () => {
    setOpenLogin(false)
  }

  const handleCreate = async () => {
    try {
     const user: User = {
      name: name,
      email: email,
      password: pass
    }
    const create = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const test = await create.json()

    if (await test.success == true) {
      setOpen(false)
      setOpenLogin(true)
    } else if (await test.success == false) {
      console.log("error creating user")
    }

    } catch (err) {
      console.log(err)
    }
    
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const user: {username: string, password: string} = {
      username: email,
      password: pass
    }
    try {
     signIn('credentials', {
      ...user,
      redirect: false
     })
     router.push('/')
     setOpenLogin(false)
    } catch (err) {
      console.log(err)
    }
    
  }

  const handleCreatePost = async (values: {}) => {
    try {
      
    } catch {

    }
  }

  const handleLogOut = async () => {
    router.push('/')
    signOut()
  }

  const router = useRouter()
    return (
        <>
            <Box display={"flex"}>
                <Button variant="outlined" onClick={handleAddOpen} sx={{padding: 1, margin: 2}}>
                    Add User
                </Button>
                {status !== "authenticated" && (
                <Button variant="outlined" onClick={handleLoginOpen} sx={{padding: 1, margin: 2}}>
                    Login
                </Button>  
                )}
                {status === "authenticated" && (
                    <>
                    <Button variant="contained" sx={{padding: 1, margin: 2, position: "fixed", top: 2, right: 15}} onClick={() => router.push('/profile')}>
                        {session.user?.email ? session.user?.email : ""}
                    </Button>
                    <Button variant="outlined"  sx={{padding: 1, margin: 2}}>
                        Create Post
                    </Button>
                    <Button variant="outlined" onClick={handleLogOut}  sx={{ padding: 1, margin: 2 }}>
                        LogOut
                    </Button>
                    </>
                )}
            </Box>
            <Dialog open={openLogin} onClose={handleLoginClose}>
        <Box display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
          <DialogTitle>Login</DialogTitle>
          <Typography color={errorLogin.color} variant="subtitle2">
            {errorLogin.message}
          </Typography>
        </Box>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose}>Close</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleAddClose}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to create a user
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}