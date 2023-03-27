import Link from "next/link"
import { useForm } from "react-hook-form";
import styles from "./style.module.scss"
import { v4 as uuidv4 } from 'uuid';
import { taskList } from "../../../constant/listTask";
import Router from "next/router";
import { Task } from "../../../type/home.type";

const AddToDo = () => {
  
  const addNewToDo = (newTask:Task)=>{
    let data:any;
    if(localStorage.getItem('myList')){
      let dataStorage:any = localStorage.getItem('myList')
      data = JSON.parse(dataStorage);
    }else data = taskList;
    data.push(newTask)
    localStorage.setItem('myList', JSON.stringify(data));
  }
  // Lấy chuỗi ngày hôm nay
  const getToday = () => {
    let date = new Date();
    const year = date.getFullYear()
    let month: number | string = date.getMonth() + 1
    let day: number | string = date.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    return `${year}-${month}-${day}`
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({  criteriaMode: "all"});
  const resetForm = () => {
    reset({
      taskName: '',
      taskDes: '',
      taskDate: getToday(),
      taskPlority: 'Nomal'
    })
  }
  const onSubmit = (newTask: any) => {
    // Thêm ID cho task
    newTask['taskID'] = uuidv4();
    console.log("newTask", newTask);
    addNewToDo(newTask)
    // resetForm(); //option
    Router.push("/") //option
  }

  return <div className={styles.formWrapper}>
    <h1 className={styles.heading}>New task</h1>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    {/* className={styles.formContent} */}
      <div > 
      <input className={styles.formTaskName}  type="text" placeholder="Add new task..." {...register("taskName", { required: true })} />
      <p className={styles.error}>{errors.taskName && <span>Task name is required</span>}</p>
      <h2 className={styles.formLabel}>Description</h2>
      <textarea className={styles.formDesTxt} rows={10} {...register("taskDes")}></textarea>
      <div className={styles.formRow} >
        <div>
        <h2 className={styles.formLabel}>Due Date</h2>
          <input className={styles.formCalendar} type="date"
            defaultValue={getToday()}
            min={getToday()}
            {...register("taskDate", { required: true })}
          />
          <p className={styles.error}>{errors.taskDate && <span>Date is required</span>}</p> 
        </div>
        <div>
        <h2 className={styles.formLabel}>Plority</h2>
          <select className={styles.Dropdown} defaultValue="Nomal" {...register("taskPlority")}>
            <option value="Nomal" >Nomal</option>
            <option value="Low">Low</option>
            <option value="Hight">Hight</option>
          </select>
        </div>
      </div>
      <input className={styles.formSubmitBtn} type="submit"/>
      <Link  href="/"><input className={styles.backHome} type="button" value="Home" /></Link>
      </div>
    </form>
  </div>
}

export default AddToDo;
