import { useState, useEffect, useRef } from 'react'

import "./completedOrders.css"
import ArrowNext from "../../../../access/Icons/ArrowNext.svg"
import ArrowPrev from "../../../../access/Icons/ArrowPrev.svg"

import useAuth from '../../../Hooks/useAuth'

function CompletedOrders () {
  const path = "http://localhost:3000"
  const accessToken = useAuth().accessToken

  const [ status, setStatus ] = useState("false")
  const [ statusBtn, setStatusBtn ] = useState(true)
  const [ page, setPage ] = useState(1)
  const falseBtn = useRef()
  const trueBtn = useRef()

  useEffect(() => {

    let trueBTN = trueBtn.current
    let falseBTN = falseBtn.current
    if(status === "true") {
      setPage(1)
      setStatusBtn(false)
      trueBTN.className = "status-color true-status"
      falseBTN.className = "false-status"
    } else {
      setPage(1)
      setStatusBtn(true)
      falseBTN.className = "false-status status-color"
      trueBTN.className = "true-status"
    }

  }, [status])

  const [ finishOrderId, setFinishOrderId ] = useState(null)
  const [ deleteOrderId, setDeleteOrderId ] = useState(null)

  const [ ordersData, setOrdersData ] = useState(null)
  const [ ordersLoading, setOrdersLoading ] = useState(false)
  const [ ordersError, setOrdersError ] = useState(null)

  const [ finishOrderData, setFinishOrderData ] = useState(null)
  const [ finishOrderLoading, setFinishOrderLoading ] = useState(false)
  const [ finishOrderError, setFinishOrderError ] = useState(null)

  const [ deleteOrderData, setDeleteOrderData ] = useState(null)
  const [ deleteOrderLoading, setDeleteOrderLoading ] = useState(false)
  const [ deleteOrderError, setDeleteOrderError ] = useState(null)

  useEffect(() => {

    ;(async() => {

      try {

        setOrdersLoading(true)
        const response = await fetch(path + `/order/admin/${status}?page=${page}`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            access_token: accessToken
          }
        })

        if(response.status >= 200 && response.status <= 299) {
          let data = await response.json()
          setOrdersData(data)
          setOrdersLoading(false)

        }
      } catch(err) {
        console.log(err);
        setOrdersError(err)
        setOrdersLoading(false)
      }


    })()

  }, [accessToken, page, status, finishOrderData, deleteOrderData])

console.log(ordersData, page);

  useEffect(() => {

    if(finishOrderId) {
      ;(async() => {

        try {

          setFinishOrderLoading(true)

          const response = await fetch(path + `/order/admin/true`, {
            method: "POST",
            headers: {
              'Content-Type': "application/json",
              access_token: accessToken
            },
            body: JSON.stringify({orderId: finishOrderId})
          })

          if(response.status >= 200 && response.status <= 299) {
            let data = await response.json()
            setFinishOrderId(null)
            setFinishOrderData(data)
            setFinishOrderLoading(false)
  
          }

        } catch (err) {
          console.log(err);
          setFinishOrderError(err)
          setFinishOrderLoading(false)
        }

      })()
    }

  }, [finishOrderId, accessToken])



  useEffect(() => {

    if(deleteOrderId) {
      ;(async() => {

        try {

          setDeleteOrderLoading(true)

          const response = await fetch(path + `/order/order/${deleteOrderId}`, {
            method: "DELETE",
            headers: {
              'Content-Type': "application/json",
              access_token: accessToken
            }
          })

          if(response.status >= 200 && response.status <= 299) {
            let data = await response.json()
            setDeleteOrderId(null)
            setDeleteOrderData(data)
            setDeleteOrderLoading(false)
  
          }

        } catch (err) {
          console.log(err);
          setDeleteOrderError(err)
          setDeleteOrderLoading(false)
        }

      })()
    }

  }, [deleteOrderId, accessToken])

  return (
    <>
      <div className="orders-btn">
        <div
          ref={falseBtn}
          onClick={() => {
            setStatus("false")
          }}
          className="false-status"
        >Kutilayotgan buyurtmalar</div>
        <div
          ref={trueBtn}
          onClick={() => {
            setStatus("true")
          }}
          className="true-status"
        >Bajarilgan buyurtmalar</div>
      </div>
      <section className="orders-wrapper">
        {
          finishOrderLoading && <h1 className="a">Loading...</h1>
        }
        {
          finishOrderError && <h1>{String(finishOrderError)}</h1>
        }
        {
          deleteOrderLoading && <h1 className="a">Loading...</h1>
        }
        {
          deleteOrderError && <h1>{String(deleteOrderError)}</h1>
        }
        {
          ordersLoading && <h1>Loading...</h1>
        }
        {
          ordersError && <h1>{String(ordersError)}</h1>
        }
        {
          !ordersLoading && !ordersError && ordersData && (
            <ul className="orders">
              {
                ordersData.map(o => (
                  <li className="order_item" key={Math.random()}>
                    <div className="order_header">
                      <p><b>ID: </b>{o.id}</p>
                      <p><b>Stol raqami:</b> {o.table_num}</p>
                      <p><b>Umumiy Qiymati:</b> {o.price - 0} So'm</p>
                      <p>{o.created}</p>
                    </div>
                    <div className="products_wrapper">
                      <div>

                        <div className="products_wrapper">
                          <ul className="products">
                            {
                              o.product.map(p => (
                                <li className="abs" key={Math.random()}>
                                  <span>{p}</span>
                                </li>
                              ))
                            }
                          </ul>
                          <ul className="product_counts">
                            {
                              o.count.map(c => (
                                <li className="abs" key={Math.random()}>
                                  <span>{c} ta</span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>

                      </div>

                      {
                        statusBtn && (
                          <button
                            onClick={() => {
                              setFinishOrderId(o.id)
                            }}
                            className="edit-status"
                          >Buturtmani tamomlash</button>
                        )
                      }
                      <button
                            onClick={() => {
                              setDeleteOrderId(o.id)
                            }}
                        className="delete-order"
                      >O'chirish</button>
                    </div>
                  </li>
                ))
              }
            </ul>
          )
        }

        <div className="tables-controllers__wrapper orders-table__controller">
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
      </section>
    </>
  )
}

export default CompletedOrders