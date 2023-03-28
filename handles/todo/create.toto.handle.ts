import Router from "next/router";
import { useForm } from "react-hook-form";
import { taskList } from "../../constant/listTask";
import { Task } from "../../type/home.type";
import { v4 as uuidv4 } from 'uuid';

const CreateToDoHandle = ()=>{
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
      return {
        handleSubmit,
        onSubmit,
        register,
        errors,
        getToday,
      }
}
export default CreateToDoHandle