import { useEffect, useState } from "react";
import { taskList } from "../../constant/listTask";
import { Task } from "../../type/home.type";

const ListToDoHandle = () => {
    const [listUI, setListUI] = useState<Array<Object> | any>();
    const [toRemove, setToRemove] = useState<Array<string>>([])
    const [listDB, setListDB] = useState(listUI);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const updateLocalStorage = (list: Array<Object>) => {
        localStorage.setItem("myList", JSON.stringify(list));
    }

    const handleCheckMany = (taskID: string) => {
        if (toRemove.includes(taskID)) {
            setToRemove(toRemove.filter((id: string) => {
                return id.trim() !== taskID.trim()
            }))
        } else {
            setToRemove([...toRemove, taskID])
        }
    }
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

    const handleSearch = (e: any) => {
        e.preventDefault()
        let strSearching = e.target.value.trim().toLowerCase();
        console.log(strSearching)
        if (strSearching.trim()) {
            const listSearchingUI = listUI.filter((task: any) => {
                return task.taskName.toLowerCase().includes(strSearching)
            })
            setListUI(listSearchingUI)
        } else {
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

    console.log('listUI render', listUI);

    return {
        listUI, setListUI, listDB, setListDB,
        selectedItemId, toRemove,
        handleSearch, handleCheckMany,
        showDetailToDo, deleteToDo,
        setSelectedItemId, handleDeleteMany,
        updateLocalStorage
    }
}
export default ListToDoHandle