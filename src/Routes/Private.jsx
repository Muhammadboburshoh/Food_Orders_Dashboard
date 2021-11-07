import { Route, Redirect } from 'react-router-dom'
import useAuth from "../Companents/Hooks/useAuth"

const Private = ({ children, ...props }) => {

	const { isLoggedIn } = useAuth()

	return <Route {...props} render={({ location }) => {

		if (isLoggedIn) {

			return children
		}
		else {

			return <Redirect to={
				{
					pathname: '/signin',
					state: { from: location }
				}
			} />
		}

	}} />
}

export default Private
