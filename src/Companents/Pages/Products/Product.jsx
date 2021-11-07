import { useEffect, useState, useRef } from "react"
import useAuth from "../../Hooks/useAuth"

import "./Products.css"

import Sidebar from "../../Sidebar/Sidebar"
import Header from "../Home/Header/Header"
import ArrowPrev from "../../../access/Icons/ArrowPrev.svg"
import ArrowNext from "../../../access/Icons/ArrowNext.svg"

function Product() {
  const URL = "http://localhost:3000"
  const accessToken = useAuth().accessToken
  const [ getCategoryId, setGetCategoryId] = useState(1)
  const [ deleteProductId, setDeleteProductId] = useState(null)
  const [page, setPage] = useState(1)

  const [ catigoryData, setCategoryData ] = useState({
    loading: false, error: null, data: null
  })
  const [ productsData, setProductsData ] = useState({
    loading: false, error: null, data: null
  })
  const [ deleteProductsData, setDeleteProductsData ] = useState({
    loading: false, error: null, data: null
  })
  const [ createProductsData, setCreateProductsData ] = useState({
    loading: false, error: null, data: null
  })

  useEffect(() => {

    ;(async() => {

      try {

        setCategoryData({loading: true})

        const response = await fetch(URL + "/categories")

        if(response.ok) {
          const data = await response.json()
          setCategoryData({data: data, loading: false})
        }

      } catch(err) {
        setCategoryData({error: err, loading: false})
      }
    })()

  }, [URL])

  useEffect(() => {

    ;(async() => {

      try {

        setProductsData({loading: true})

        const response = await fetch(URL + `/products/${getCategoryId}/${page}`)


        if(response.ok) {
          const data = await response.json()
          setProductsData({data: data, loading: false})
        }

      } catch(err) {
        setProductsData({error: err, loading: false})
      }
    })()

  }, [getCategoryId, page, deleteProductsData, createProductsData])

  useEffect(() => {

    if(deleteProductId) {
      ;(async() => {

        try {

          setDeleteProductsData({loading: true})

          const response = await fetch(URL + `/products/del/${deleteProductId}`, {
            method: "DELETE",
            headers: {
              'Content-Type': "application/json",
              access_token: accessToken
            }
          })

          if(response.status >= 200 && response.status <= 299) {
            let data = await response.json()
            setDeleteProductId(null)
            setDeleteProductsData({loading: false, data: data})
  
          }

        } catch (err) {
          console.log(err);
          setDeleteProductsData({error: err, loading: false})
        }

      })()
    }

  }, [deleteProductId, accessToken])

  const func = (e) => {
    setGetCategoryId(e.target.value)
  }

  const productName = useRef()
  const productPrice = useRef()
  const input = document.querySelector('input[type="file"]')
  


  const [ categoryId, setCategoryId ] = useState(0)

  const [ createBtn, setCreateBtn ] = useState(false)

  useEffect( () => {

    if (createBtn) {
      
      if(productName.current.value && productPrice.current.value && input.value && categoryId) {
  
        ;(async() => {
          const myHeaders = new Headers()
          myHeaders.append("access_token", accessToken)
  
          const formdata = new FormData();
          formdata.append("productName", productName.current.value);
          formdata.append("productPrice", productPrice.current.value);
          formdata.append("categoryId", categoryId);
          formdata.append("productImage", input.files[0], input.value);
  
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };
          setCreateProductsData({loding:true})
  
          try { 
  
            const response = await fetch(URL + "/products/addproducts", requestOptions)
  
            if(response.status >= 200 && response.status <= 299) {
              setCreateBtn(true)
              const data = await response.json()
              setCreateProductsData({data: data, loding: false})
            } else {
  
              setCreateProductsData({error: response.statusText || response.status});
              throw new Error(response.statusText || response.status)
            }
    
          } catch(e) {
            setCreateProductsData({loading: false, error:e})
          }
    
        })()
      }
    }


  }, [productName, productPrice, categoryId, URL, accessToken, input, createBtn])

  console.log(createProductsData);

  return(
    <div>
    <div>
    <div className="main-wrapper">
      <div className="sidebar-wrapper"><Sidebar/></div>
      <div className="content-wrapper">
        <Header/>
        <div className="order-wrapper">
          <div className="products-section">
            <ul className="products-section__list">
              <li className="products-section__item">
                <a className="products-section__link" href="/products">Categories</a>
              </li>
              <li className="products-section__item">
                <a className="products-section__link products-section__link-active" href="/products/product">Products</a>
              </li>
            </ul>

            <div className="products__wrapper">
              <form className="products__create-form">
                <div className="products__create-form-left">
                  <div className="products__create-form-inner">
                    <p className="products__create-form-label">Nom
                    </p>
                  <input ref={productName} type="text" placeholder="Mahsulot nomi ..." required className="products__create-input" />
                  </div>

                  <div className="products__create-form-inner">
                    <label htmlFor="product_price" className="products__create-form-label">Narx</label>
                    <input ref={productPrice} type="number" className="products__create-input" id="product_price" placeholder="Mahsulot narxi ..." required/>
                  </div>
                </div>

                <div className="products__create-form-right">

                  <div className="products__create-form-inner">
                    <label htmlFor="product_price_id" className="products__create-form-label">Kategoriya</label>
                    {
                      catigoryData.loading && <h1>Loading...</h1>
                    }
                    {
                      catigoryData.error && <h1>{String(catigoryData.error)}</h1>
                    }
                    {
                      !catigoryData.error && !catigoryData.loading && catigoryData.data && (

                        <select
                          onChange={(e) => {
                            setCategoryId(e.target.value)
                          }}
                          value={categoryId}
                          className="products__create-input"
                          id="product_price_id"
                          required
                        >
                          <option value="0">Tanlang</option>
                          {
                            catigoryData.data.map(c=> (
                              <option key={Math.random()} value={c.category_id}>{c.category_name}</option>
                            ))
                          }
                        </select>
                      )
                    }

                      <div className="products__create-form-inner">
                        <label htmlFor="product_image" className="products__create-form-label">Rasm linki</label>
                        <input type="file" className="products__create-input" id="product_image" required/>
                      </div>
                  </div>


                  <button
                    onClick={() => {
                      setCreateBtn(true)
                    }}
                    className="products__create-btn edit-status"
                  >Yaratish</button>
                </div>
              </form>

              <div className="products__table-wrapper">

                {
                  catigoryData.loading && <h1>loading...</h1>
                }
                {
                  catigoryData.error && <h1>{String(catigoryData.error)}</h1>
                }
                {
                  !catigoryData.error && !catigoryData.loading && catigoryData.data && (

                    <select
                      value={getCategoryId}
                      onChange={func}
                      className="products__create-input"
                      id="product_price_id"
                      required

                    >
                      {
                        catigoryData.data.map(c=> (
                          
                          <option key={Math.random()} value={c.category_id}>{c.category_name}</option>
                        ))
                      }
                    </select>
                  )
                }

                {
                  deleteProductsData.loading && <h1>Loading...</h1>
                }
                {
                  deleteProductsData.error && <h1>{String(deleteProductsData.error)}</h1>
                }

                {
                  createProductsData.loading && <h1>Loading...</h1>
                }
                {
                  createProductsData.error && <h1>{String(createProductsData.error)}</h1>
                }

                {
                  productsData.loading && <h1>Loading...</h1>
                }
                {
                  productsData.error && <h1>{String(productsData.error)}</h1>
                }
                
                {
                  !productsData.loading && !productsData.error && productsData.data && (

                    <table className="products__table">
                      <thead>
                        <tr>
                          <th className="products__thead-th">Name</th>
                          <th className="products__thead-th">Narxi</th>
                          <th className="products__thead-th">O'chirish</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          productsData.data.map(p=> (
                            <tr key={Math.random()}>
                              <td className="products__tbody-td">{p.product_name}</td>
                              <td className="products__tbody-td">{p.product_price - 0} So'm</td>
                              <td className="products__tbody-td products__tbody-td-link-main">
                                <button
                                  onClick={() => {
                                    setDeleteProductId(p.product_id)
                                  }}
                                  className="products__delete-btn delete-table"
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
            </div>
          </div>
        </div>
      </div>

      </div>

    </div >
      <div className="tables-controllers__wrapper orders-table__controller product_pagination">
          <button
            onClick={() => {
              if(page !== 1) {
                setPage(page - 1)
              }
            }}
            className="table-controller__btn table-controller__btn--prev"
          >
            <img src={ArrowPrev} alt="" />
          </button>
          <button
            onClick={() => {
                setPage(page + 1)
            }}
            className="table-controller__btn table-controller__btn--next"
          >
            <img src={ArrowNext} alt="" />
          </button>
        </div>
    </div>
  )
}

export default Product