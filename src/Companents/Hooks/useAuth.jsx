import { useContext } from 'react'
import { Context } from '../Context/Auth'

const useAuth = () => {

	const ctx = useContext(Context)

	return { ...ctx.state, setAuth: ctx.setState }
}

export default useAuth
