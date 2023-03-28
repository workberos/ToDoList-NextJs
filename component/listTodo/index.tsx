import Link from "next/link";
import ListToDoHandle from "../../handles/todo/list.todo.handle";
import DetailTodoComponent from "../detailTodo";
import styles from "./index.module.scss";


export default function ListToDoComponent() {
  const {
    listUI, setListUI,
    listDB, setListDB,
    handleSearch, handleCheckMany,
    selectedItemId, toRemove,
    showDetailToDo, deleteToDo, 
    setSelectedItemId, handleDeleteMany
  } = ListToDoHandle()

  console.log('listUIlistUI',listUI);
  
  return (
    <div className={styles.todoListWrapper}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>To Do List</h1>
        <Link href="./todo/create"><button className={styles.addBtn}>Add</button></Link>
        <input type="search" className={styles.searchbox}
          placeholder="Search..." onChange={handleSearch} />
        <div className={styles.todoListContent}>
          {listUI?.length > 0 ?
            listUI?.map((item: any) => {
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
                    {(selectedItemId === item.taskID) && <DetailTodoComponent
                      listUI={listUI} setListUI={setListUI}
                      setSelectedItemId={setSelectedItemId}
                      item={item} listDB={listDB}
                      setListDB={setListDB} />
                    }
                  </div>
                </article>
              )
            }) : <p>Data Not Found</p>}
        </div>
      </div>
      {toRemove?.length > 0 && <div className={styles.bulkBar}>
        <p className={styles.bulkLabel}>Bulk Action:</p>
        <div>
          <input className={styles.doneBulk} type="button" value="Done" />
          <input className={styles.removeBulk} type="button" value="Remove" onClick={handleDeleteMany} />
        </div>
      </div>}
    </div>
  )
}
