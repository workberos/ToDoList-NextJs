import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "./style.module.scss"
import ListToDoHandle from "../../handles/todo/list.todo.handle";

const ListToDo = (props: any) => {

  const router = useRouter()
  const { updateLocalStorage } = ListToDoHandle()
  const { listUI, setListUI, listDB, setListDB, item, setSelectedItemId } = props.data;
  const { register, handleSubmit, formState: { errors } } = useForm({ criteriaMode: "all" });
  const onSubmit = (newTask: any) => {
    newTask.taskID = item.taskID
    console.log("Update task", newTask);
    console.log(listUI);
    let tempListUI = listUI;
    for (let i = 0; i < tempListUI.length; i++) {
      if (tempListUI[i].taskID === newTask.taskID) {
        tempListUI[i] = newTask;
        break; // thoát khỏi vòng lặp nếu đã thay thế phần tử
      }
    }
    let tempListDB = listDB;
    for (let i = 0; i < tempListDB.length; i++) {
      if (tempListDB[i].taskID === newTask.taskID) {
        tempListDB[i] = newTask;
        break; // thoát khỏi vòng lặp nếu đã thay thế phần tử
      }
    }
    console.log('tempList', tempListUI);
    updateLocalStorage(tempListDB)
    setListUI(tempListUI)
    setSelectedItemId(null)
    router.push("/")
  }
  return <>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} key={item.taskID}>
      <div>
      <input className={styles.formTaskName} type="text" defaultValue={item.taskName}
        placeholder="Add new task..."
        {...register("taskName", { required: true })}
      />
      <p className={styles.error}>{errors.taskName && <span>Task name is required</span>}</p>
      <h2 className={styles.formLabel}>Description</h2>
      <textarea className={styles.formDesTxt} rows={5}  defaultValue={item.taskDes} {...register("taskDes")} />
      <div className={styles.formRow} >
        <div>
          <h2 className={styles.formLabel}>Due Date</h2>
          <input className={styles.formCalendar} type="date"
            defaultValue={item.taskDate}
            {...register("taskDate", { required: true })}
          />
          <p className={styles.error}>{errors.taskDate && <span>Date is required</span>}</p> 
        </div>
        <div>
          <h2 className={styles.formLabel}>Plority</h2>
          <select className={styles.Dropdown} defaultValue={item.taskPlority}
            {...register("taskPlority")}>
            <option value="Nomal" >Nomal</option>
            <option value="Low">Low</option>
            <option value="Hight">Hight</option>
          </select>
        </div>
      </div>
      <input className={styles.formSubmitBtn} type="submit" value="Update" />
      </div>
    </form>
  </>
}

export default ListToDo