import Link from "next/link"
import { Task } from "../../type/home.type";
import styles from "../styles/Home.module.scss"
import FormDetail from "./todo";
import ListToDoHandle from "../../handles/todo/list.todo.handle"


export default function HomePage() {
  const {
    listUI, setListUI,
    listDB, setListDB,
    handleSearch, handleCheckMany,
    selectedItemId, toRemove,
    showDetailToDo, deleteToDo, 
    setSelectedItemId, handleDeleteMany
  } = ListToDoHandle()


  return (
    <div className={styles.todoListWrapper}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>To Do List</h1>
        <Link href="./todo/create"><button className={styles.addBtn}>Add</button></Link>
        <input type="search" className={styles.searchbox}
          placeholder="Search..." onChange={handleSearch} />
        <div className={styles.todoListContent}>
          {listUI?.length > 0 ?
            listUI?.map((item: Task) => {
              return (
                <article key={item.taskID} className={styles.todo}>
                  <div className={styles.todoItem}>
                    <input type="checkbox" onChange={() => { handleCheckMany(item.taskID) }}
                      className={styles.totoCheckbox} />
                    <p className={styles.todoName}>{item.taskName}</p>
                    <input type="button" onClick={() => showDetailToDo(item.taskID)}
                      value="Detail" className={styles.detailBtn} />
                    <input type="button" onClick={() => deleteToDo(item.taskID)}
                      value="Remove" className={styles.removeBtn} />
                  </div>
                  <div className={styles.todoItemDetail}>
                    {(selectedItemId === item.taskID) && <FormDetail
                      listUI={listUI} setListUI={setListUI}
                      setSelectedItemId={setSelectedItemId}
                      item={item} listDB={listDB}
                      setListDB={setListDB} />
                    }
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
