import Link from "next/link"
import Form from "../../component/form.Todo";
import { taskList } from '../../constant/listTask'
import { Task } from "../../type/home.type";
import { useEffect, useState } from "react";
import Handle from "../../handles/pages/task.handle";
import styles from "../styles/Home.module.scss"


export default function HomePage() {
  const [listUI, setListUI] = useState<Array<Object> | any>();
  const {
    handleCheckMany,
    updateLocalStorage,
    toRemove, setToRemove
  } = Handle()
  useEffect(() => {
    const dataStorage = localStorage.getItem("myList");
    // console.log('dataStorage', dataStorage);
    if (dataStorage) {
      setListUI(JSON.parse(dataStorage))
      setListDB(JSON.parse(dataStorage))

    } else {
      updateLocalStorage(taskList)
      setListUI(taskList)
      setListDB(taskList)
    }
  }, [])
  const [listDB, setListDB] = useState(listUI);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchString, setSearchString] = useState(null);

  const handleSearch = (e: any) => {
    e.preventDefault()
    let strSearching = e.target.value.trim().toLowerCase();
    console.log(strSearching)
    // setSearchString(e.target.value)
    if (strSearching.trim()) {
      const listSearchingUI = listUI.filter((task: any) => {
        return task.taskName.toLowerCase().includes(strSearching)
      })
      setListUI(listSearchingUI)
    } else {
      // let data:any = localStorage.getItem("myList");
      setListUI(listDB)
    }
  }
  const deleteToDo = (id: string) => {
    //everytime u remove a To do, u need to update localstorage
    let newListUI = listUI.filter((item: Task) => item.taskID !== id)
    let newListDB = listDB.filter((item: Task) => item.taskID !== id)
    setListUI(newListUI)
    setListDB(newListDB)

    updateLocalStorage(newListDB)
  }
  const handleDeleteMany = () => {
    if (!toRemove.length) {
      return;
    }
    let dataTempUI: any = listUI;
    dataTempUI = dataTempUI.filter((item: Task) => !toRemove.includes(item.taskID))
    let dataTempDB: any = listDB;
    dataTempDB = dataTempDB.filter((item: Task) => !toRemove.includes(item.taskID))
    // console.log(dataTempUI, 'dataTempUI');
    setListUI(dataTempUI)
    setListDB(dataTempDB)
    setToRemove([])
    updateLocalStorage(dataTempDB)
  }
  const showDetailToDo = (id: string) => {
    // Tuyền vào id và set giá trị của setSelectedItemId = chính id đó
    selectedItemId === id ? setSelectedItemId(null) : setSelectedItemId(id)
  }
  // console.log('toRemove',toRemove);
  console.log('listUI render', listUI);

  return (
    <div className={styles.todoListWrapper}>
      {/* listUI &&  */}
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>To Do List</h1>
        <Link  href="./addToDo"><button className={styles.addBtn}>Add</button></Link>
        <input type="search" className={styles.searchbox}
          placeholder="Search..." onChange={handleSearch} />
       <div className={styles.todoListContent}>
       {listUI?.length > 0 ?
          listUI?.map((item: Task) => {
            return (
              <article key={item.taskID} className={styles.todo}>
                <div className={styles.todoItem}>
                <input type="checkbox" onChange={() => { handleCheckMany(item.taskID) }} className={styles.totoCheckbox}/>
                <p className={styles.todoName}>{item.taskName}</p>
                  <input type="button" onClick={() => showDetailToDo(item.taskID)}
                    value="Detail" className={styles.detailBtn} />
                  <input type="button" onClick={() => deleteToDo(item.taskID)}
                    value="Remove" className={styles.removeBtn} />
                </div>
               <div className={styles.todoItemDetail}>
               {
                  (selectedItemId === item.taskID) && 
                  <Form listUI={listUI}
                    setListUI={setListUI} item={item}
                    setSelectedItemId={setSelectedItemId}
                    setListDB={setListDB} listDB={listDB} />}
               </div>
              </article>
            )
          }) : <p>Results don't appear</p>}
       </div>
      </div>
      {!!toRemove.length && <div className={styles.bulkBar}>
          <p className={styles.bulkLabel}>Bulk Action:</p>
          <div> 
            <input className={styles.doneBulk} type="button" value="Done" />
            <input className={styles.removeBulk} type="button" value="Remove" onClick={handleDeleteMany} />
          </div>
        </div>}
    </div>
  )
}
