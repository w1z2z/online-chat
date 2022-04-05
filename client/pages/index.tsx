import type { NextPage } from 'next'
import {useRouter} from "next/router";
import {useEffect} from "react";

const Home: NextPage = () => {

  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      router.push('/main')
    } else {
      localStorage.clear()
      router.push('/login')
    }
  }, [])

  return (
    <>
    </>
  )
}

export default Home
