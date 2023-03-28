import Link from "next/link"
import styles from "./style.module.scss"
import CreateToDoHandle from "../../handles/todo/create.toto.handle";

const CreateTodoComponent = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    getToday,

  } = CreateToDoHandle()

  return <div className={styles.formWrapper}>
    <h1 className={styles.heading}>New task</h1>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
      <Link  href="/todo"><input className={styles.backHome} type="button" value="Home" /></Link>
      </div>
    </form>
  </div>
}

export default CreateTodoComponent;
