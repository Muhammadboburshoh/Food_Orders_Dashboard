import { useEffect, useState } from "react"

import useAuth from "./useAuth"

const serviseURL = 'http://localhost:3000'

const usePost = (path) => {

  const { accessToken } = useAuth()

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ data, setData] = useState(null)
  const [ body, setBody] = useState(null)

  useEffect( () => {

    if(body) {

      ;(async() => {
        setLoading(true)

        try { 

          const response = await fetch(serviseURL + path, {
            method: 'POST',
            headers: {
              'Content-Type': "application/json",
              access_token: accessToken ? accessToken : ''
            },
            body: JSON.stringify(body)
          })

          if(response.status >= 200 && response.status <= 299) {

						setLoading(false)
            setData(await response.json())
            setBody(null)
          } else {

						setError(response.statusText || response.status);
            throw new Error(response.statusText || response.status)
          }
  
        } catch(e) {
          setLoading(false)
          setError(e.message)
        }
  
      })()
    }


  }, [body, path, accessToken])

    return {
      loading,
      error,
      data,
      post: setBody
    }
}

export default usePost



