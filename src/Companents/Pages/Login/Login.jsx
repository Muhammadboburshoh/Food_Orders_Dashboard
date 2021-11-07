import { useState, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'

import usePost from '../../Hooks/usePost'
import useAuth from '../../Hooks/useAuth'

function SignIn () {

	const {error, loading, data, post } = usePost('/login')

	const [redirect, setRedirect] = useState(false)

	const { setAuth } = useAuth()

	const username = useRef()
	const password = useRef()

	useEffect(() => {

		if(data) {

			setAuth({
				type: 'LOGIN',
				payload: data
			})

			setRedirect(true)
		}
	}, [data, setAuth, error])



	if (redirect) {

		return <Redirect to='/' />
	}


	return (
		<>

			<h1>LOGIN</h1>
			<input ref={username} id='username' type="text" placeholder="Username"/>
			<input ref={password} id='password' type="text" placeholder="Password"/>

			<button onClick={() => {

				post({
					username: username.current.value,
					password: password.current.value
				})

			}}>Sign In</button>

			{error && <h1>{error}</h1>}
			{
				loading && <h1>Loading...</h1>
			}
		</>
	)

	
}

export default SignIn
