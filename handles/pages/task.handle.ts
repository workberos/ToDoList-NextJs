import { useEffect, useState } from "react";
import { Task } from "../../type/home.type";
import { taskList } from "../../constant/listTask";


const Handle = () => {
    const [toRemove, setToRemove] = useState<Array<string>>([])
    const [data, setData] = useState <Array<object>>([]);
    useEffect(() => {
        if(localStorage.getItem("myList")){
            let temp:any = localStorage.getItem("myList")
            setData(JSON.parse(temp))
        }else setData(taskList)
    },[])

    const updateLocalStorage = (list: Array<Object>) => {
        localStorage.setItem("myList", JSON.stringify(list));
    }
    
    const handleCheckMany = (taskID: string) => {
        if(toRemove.includes(taskID)){            
            setToRemove(toRemove.filter((id:string)=>{
                return id.trim() !== taskID.trim()
            }))
        } else {
            setToRemove([...toRemove, taskID])
        }  
    }


    return {
        handleCheckMany,
        updateLocalStorage,
        toRemove,setToRemove
    }
}
export default Handle