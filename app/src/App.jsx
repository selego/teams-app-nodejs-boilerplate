import { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Home } from '@/pages/home'

import Loader from '@/components/loader'
import api from '@/services/api'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // try {
      //   const res = await api.get('/user/signin_token')
      //   if (res.token) api.setToken(res.token)
      //   setUser(res.user)
      // } catch (e) {
      //   console.log(e)
      // }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
      <Toaster position='top-center' />
    </BrowserRouter>
  )
}