import { useState, useEffect, useRef } from "react"

import "./Clients.css"
import useAuth from "../../Hooks/useAuth"
import Sidebar from "../../Sidebar/Sidebar"
import Header from "../Home/Header/Header"
import ArrowNext from "../../../access/Icons/ArrowNext.svg"
import ArrowPrev from "../../../access/Icons/ArrowPrev.svg"

function Clients() {
  const accessToken = useAuth().accessToken
  const [ page, setPage ] = useState(1)
  const tableNumberInput = useRef()

  const [ cretaeTableBtn, setCreateTableBtn ] = useState(false)
  const [ deleteTableId, setDeleteTableId ] = useState(null)

  const [ tableData, setTableData ] = useState(null)
  const [ tableLoading, setTableLoading ] = useState(false)
  const [ tableError, setTableError ] = useState(null)

  const [ createTableData, setCreateTableData ] = useState(null)
  const [ createTableLoading, setCreateTableLoading ] = useState(false)
  const [ createTableError, setCreateTableError ] = useState(null)

  const [ deleteTableData, setDeleteTableData ] = useState(null)
  const [ deleteTableLoading, setDeleteTableLoading ] = useState(false)
  const [ deleteTableError, setDeleteTableError ] = useState(null)

  // get tables
  useEffect(() => {
    ;(async () => {

      try {
        setTableLoading(true)

        const response = await fetch("http://localhost:3000/tables/admin?page=" + page)

        if(response.ok) {
          const data = await response.json()
          setTableLoading(false)
          setTableData(data)
        }
      } catch(err) {
        setTableLoading(false)
        setTableError(err)
      }
    })()
  }, [page, createTableData, deleteTableData])

  // post table
  useEffect(() => {

    ;(async() => {

      if(cretaeTableBtn) {
        setCreateTableBtn(false)
        try {
          setCreateTableLoading(true)

          const response = await fetch("http://localhost:3000/tables", {
            method: "POST",
            headers: {
              'Content-Type': "application/json",
              access_token: accessToken
            },
            body: JSON.stringify({tableNumber: tableNumberInput.current.value.trim()})
          })

          if(response.ok) {
            setCreateTableLoading(false)
            const data = await response.json()
            setCreateTableData(data)
            
            tableNumberInput.current.value = ""
          }

        } catch(err) {
          setCreateTableError(err)
          setCreateTableLoading(false)
        }
      }

    })()
  }, [cretaeTableBtn, accessToken])

  // delete table
  useEffect(() => {

    ;(async() => {

      if(deleteTableId) {
        setDeleteTableId(null)
        try {
          setDeleteTableLoading(true)

          const response = await fetch(`http://localhost:3000/tables/del/${deleteTableId}`, {
            method: "delete",
            headers: {
              'Content-Type': "application/json",
              access_token: accessToken
            }
          })

          if(response.ok) {
            
            const data = await response.json()
            setDeleteTableData(data)
            setDeleteTableLoading(false)
            tableNumberInput.current.value = ""
          }

        } catch(err) {
          setDeleteTableError(err)
          setDeleteTableLoading(false)
        }
      }

    })()

  }, [deleteTableId, accessToken])
  return(
    <>
    <div className="main-wrapper">
      <div className="sidebar-wrapper"><Sidebar/></div>
      <div className="content-wrapper">
        <Header/>
        <div className="order-wrapper">
        <section className="orders-table__wrapper">

        <div className="cretae-table">
          <label htmlFor="new-table">Stol qo'shish: </label>
          <input ref={tableNumberInput} className="category__create-input" id="new-table" type="number" />
          <button
            onClick={() => {
              if(tableNumberInput.current.value.trim()) {
                setCreateTableBtn(true)
              }
            }}
            className="edit-status create-tablebtn"
          >Qo'shish</button>
        </div>

        {
          tableLoading && <h1>Loading...</h1>
        }
        {
          tableError && <h1>{String(tableError)}</h1>
        }

        {
          createTableLoading && <h1>Loading...</h1>
        }
        {
          createTableError && <h1>{String(createTableError)}</h1>
        }

        {
          deleteTableLoading && <h1>Loading...</h1>
        }
        {
          deleteTableError && <h1>{String(deleteTableError)}</h1>
        }
        {
          !tableLoading && !tableError && tableData && (
            
            <table className="orders-table">
              <thead className="orders-table__head">
                <tr className="orders-table__head-tr">
                  <th className="orders-table__head-th">ID</th>
                  <th className="orders-table__head-th">Srol raqami</th>
                  {/* <th className="orders-table__head-th">Tahrirlash</th> */}
                  <th className="orders-table__head-th">O'chirish</th>
                </tr>
              </thead>
              <tbody className="orders-table__body">
                {
                  tableData.map(t => (
                    <tr key={Math.random()} className="orders-table__body-tr">
                      <td className="orders-table__body-td">{t.table_id}</td>
                      <td className="orders-table__body-td">
                        <p className="orders-table__body-td-name">
                          <span className="orders-table__body-td-name-link" >{t.table_number}</span>
                        </p>
                      </td>
                      {/* <td className="orders-table__body-td">
                        <div className="orders-table__body-td-link edit-table" >Tahrirlash</div>
                      </td> */}
                      <td className="orders-table__body-td ">
                        <span
                          onClick={() => {
                            setDeleteTableId(t.table_id)
                          }}
                          className="delete-table"
                        >O'chirish</span>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
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
        </div>
      </div>
    </div>
    </>
  )
}

export default Clients