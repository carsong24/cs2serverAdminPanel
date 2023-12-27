'use client'

import { Card, CardContent, Typography, CardActions, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Box } from "@mui/material";
import { use, useEffect, useState } from "react";
import CreateUser from "./api/create";
import { DisplayUser, User, loginUser } from "../../prismaclient/dbtypes";
//@ts-ignore
import Cookies from 'js-cookie'
import { addDays, format } from "date-fns";
import { Posts } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import { useSession } from "next-auth/react";


export default function Today() {
  const [user, setUser] = useState<DisplayUser>()
  const {data: session, status} = useSession()
  const fetcher: Fetcher<Posts, string> = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(`/api/getUserPosts?email=${session?.user?.email}`, fetcher)

  if (status === 'loading') {
    return (
      <>
      <Typography color={"white"}>
        Loading
      </Typography>
      </>
    )
  }

  if (status === 'unauthenticated') {
    return (
    <>
    </>  
    )
    
  }

  //@ts-ignore
  return data?.message?.posts.map((post: Posts) => {
    return (
      <Grid item key={post.id} xs={4} paddingLeft={2}>
        <Typography>{post.title}</Typography>
        <Typography>{post.Note}</Typography>
        <Typography>{format(new Date(post.time * 1000), "MM/dd/yyyy")}</Typography>
        <Typography>{post.userId}</Typography>
      </Grid>
    )
  })
}