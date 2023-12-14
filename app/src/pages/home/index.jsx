import api from '@/services/api'
import { useEffect, useState } from 'react'

export const Home = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get('/message')
        setMessage(res.message)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <section className='flex items-center justify-center text-4xl my-20'>Hello! This is a Microsoft Teams App</section>
      <p className='flex items-center justify-center text-4xl my-20'>{message}</p>
    </>
  )
}
