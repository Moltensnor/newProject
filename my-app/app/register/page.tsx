'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '../lib/types'
import { addUser } from '../lib/addUser'

function RegisterPage() {
  const [username, setUsername] = useState('Email')
  const [password, setPassword] = useState('Password')
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault() // Prevent default form submission
    console.log("Checking user")

    try {
    //   const user: User = 
      await addUser(username, password)
      router.push("../protected")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default RegisterPage