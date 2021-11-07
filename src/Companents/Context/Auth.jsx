import { createContext, useReducer } from 'react'

const Context = createContext()

const initialValue = {
	isLoggedIn: false,
	user: null,
	accessToken: null
}

const reducer = (state, { type, payload }) => {

	if (type === 'LOGIN') {

		window.localStorage.setItem('__auth', JSON.stringify({
			isLoggedIn: true,
			user: payload.user,
			accessToken: payload.accessToken
		}))

		return {
			isLoggedIn: true,
			user: payload.user,
			accessToken: payload.accessToken
		}
	}
	else if (type === 'LOGOUT') {

		window.localStorage.removeItem('__auth')

		return initialValue
	}

	return state
}

const fetchInitialValue = () => {

	const state = window.localStorage.getItem('__auth')

	if (state) {
		return JSON.parse(state)
	}
	else {
		return initialValue
	}
}

const Provider = ({ children }) => {

	const [state, setState] = useReducer(reducer, null, fetchInitialValue)

	return (
		<Context.Provider value={{state, setState}}>
			{ children }
		</Context.Provider>
	)
}

export {
	Context,
	Provider,
}
