import { useEffect, useState, useRef } from "react"

import useAuth from "../../Hooks/useAuth"

import "./Products.css"

function Categories() {
  const accessToken = useAuth().accessToken

  const catigoryName = useRef()
  const [createCategoryBtn, setCreateCategoryBtn ] = useState(false)
  const [ categoryId, setCategoryId ] = useState(null)

  const [ categoryData, setCategoryData ] = useState(null)
  const [ categoryLoading, setCategoryLoading ] = useState(false)
  const [ categoryError, setCategoryError ] = useState(null)

  const [ createCategoryData, setCreateCategoryData ] = useState(null)
  const [ createCategoryLoading, setCreateCategoryLoading ] = useState(false)
  const [ createCategoryError, setCreateCategoryError ] = useState(null)

  const [ deleteCategoryData, setDeeleteCategoryData ] = useState(null)
  const [ deleteCategoryLoading, setDeeleteCategoryLoading ] = useState(false)
  const [ deleteCategoryError, setDeeleteCategoryError ] = useState(null)



  // get caregories
  useEffect(() => {

    ;(async() => {

      try {

        setCategoryLoading(true)

        const response = await fetch("http://localhost:3000/categories")

        if(response.ok) {
          const data = await response.json()
          setCategoryData(data)
          setCategoryLoading(false)
        }

      } catch(err) {
        setCategoryError(err)
        setCategoryLoading(false)
      }
    })()

  }, [createCategoryData, deleteCategoryData])

  // POST caregories
  useEffect(() => {

    ;(async() => {

      if(catigoryName.current.value.trim() && createCategoryBtn) {
        setCreateCategoryBtn(false)
        try {

          setCreateCategoryLoading(true)
  
          const response = await fetch("http://localhost:3000/categories", {
            method: "POST",
            headers: {
              'Content-Type': "application/json",
                access_token: accessToken
            },
            body: JSON.stringify({categoryName: catigoryName.current.value.trim()})
          })
  
          if(response.ok) {
            const data = await response.json()
            setCreateCategoryData(data)
            setCreateCategoryLoading(false)
          }
  
        } catch(err) {
          setCreateCategoryError(err)
          setCreateCategoryLoading(false)
        }
      }
    })()

  }, [catigoryName, accessToken, createCategoryBtn])

  // delete category
  useEffect(() => {

    ;(async() => {

      if(categoryId) {
        setCategoryId(null)
        try {

          setDeeleteCategoryLoading(true)
  
          const response = await fetch(`http://localhost:3000/categories/del/${categoryId}`, {
            method: "DELETE",
            headers: {
              'Content-Type': "application/json",
                access_token: accessToken
            }
          })
  
          if(response.ok) {
            const data = await response.json()
            setDeeleteCategoryData(data)
            setDeeleteCategoryLoading(false)
          } else {
            setDeeleteCategoryLoading(false)
          }
  
        } catch(err) {
          setDeeleteCategoryError(err)
          setDeeleteCategoryLoading(false)
        }
      }
    })()

  }, [accessToken, categoryId])

  console.log(deleteCategoryError);

  return(
    <>
              <form className="category__create-form">
                <label htmlFor="create-category">Bo'lim qo'shing: </label>
                <input ref={catigoryName} className="category__create-input" type="text" placeholder="Bo'lim nomi..." required/>
                <button
                  onClick={() => {
                    setCreateCategoryBtn(true)
                  }}
                  className="category__create-btn edit-status"
                >Yaratish</button>
              </form>

              <div className="categories__table-wrapper">
                {
                  categoryLoading && <h1>Loading...a</h1>
                }
                {
                  categoryError && <h1>{String(categoryError)}</h1>
                }

                {
                  createCategoryLoading && <h1>Loading...b</h1>
                }
                {
                  createCategoryError && <h1>{String(createCategoryError)}</h1>
                }

                {
                  deleteCategoryLoading && <h1>Loading...c</h1>
                }
                {
                  deleteCategoryError && <h1>{String(deleteCategoryError)}</h1>
                }
                {
                  !categoryLoading && !categoryError && categoryData && (

                    <table className="categories__table">
                      <thead>
                        <tr className="categories__thead-tr">
                          <th className="categories__thead-th">ID</th>
                          <th className="categories__thead-th">Bo'lim nomi</th>
                          <th className="categories__thead-th">O'chirish</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          categoryData.map(c=> (

                            <tr key={Math.random()} className="categories__tbody-tr">
                              <td className="categories__tbody-td">{c.category_id}</td>
                              <td className="categories__tbody-td categories__tbody-td-link-main">
                                {c.category_name}
                              </td>
                              <td className="categories__tbody-td">
                                <button
                                  onClick={() => {
                                    setCategoryId(c.category_id)
                                  }}
                                  className="categories__delete-btn delete-table"
                                >o'chirish</button>
                              </td>
                            </tr>
                          ))
                        }

                      </tbody>
                    </table>
                  )
                }
              </div>
    </>
  )
}

export default Categories