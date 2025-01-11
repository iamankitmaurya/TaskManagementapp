import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { BACKEND_URI } from "../enviroment";
  import { toast } from "react-toastify";
  
  export type Task = {
    title: string;
    description: string;
    isComplete: string;
    _id: string;
  };
  
  interface TaskContextIf {
    addTask: (title: string, desc: string) => void;
    getAllTasks: () => void;
    tasks: Task[];
    deleteTaskById: (id: string) => void;
    editTaskById: (id: string) => void;
    updateTaskById: (id: string, updatedTask: Partial<Task>) => void;
  }
  
  const AuthContext = createContext<TaskContextIf>({
    addTask: () => {},
    getAllTasks: () => {},
    tasks: [],
    deleteTaskById: () => {},
    editTaskById: () => {},
    updateTaskById: () => {},
  });
  
  export const useTask = () => {
    return useContext(AuthContext);
  };
  
  export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
  
    useEffect(() => {
      getAllTasks();
    }, []);
  
    const addTask = async (title: string, desc: string) => {
      const response = await fetch(BACKEND_URI + "/task/add", {
        body: JSON.stringify({
          title,
          desc,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method: "POST",
      });
  
      const data = await response.json();
      if (data.statusCode === 400) {
        throw new Error(data.message);
      }
      await getAllTasks();
      toast.success(data.msg);
    };
  
    const getAllTasks = async () => {
      const response = await fetch(BACKEND_URI + "/task/get-all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method: "GET",
      });
  
      const data = await response.json();
  
      if (data.statusCode === 400) {
        throw new Error(data.message);
      } else {
        setTasks(data.tasks);
      }
    };
  
    const deleteTaskById = async (id: string) => {
      const response = await fetch(BACKEND_URI + "/task/delete/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method: "DELETE",
      });
  
      const data = await response.json();
      if (data.statusCode === 400) {
        throw new Error(data.message);
      }
      await getAllTasks();
      toast.success(data.msg);
    };
  
    const editTaskById = async (id: string) => {
      const response = await fetch(BACKEND_URI + "/task/edit/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method: "PUT",
      });
  
      const data = await response.json();
      if (data.statusCode === 400) {
        throw new Error(data.message);
      }
      await getAllTasks();
      toast.success(data.msg);
    };
  
    const updateTaskById = async (id: string, updatedTask: Partial<Task>) => {
      const response = await fetch(BACKEND_URI + "/task/update/" + id, {
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method: "PATCH",
      });
  
      const data = await response.json();
      if (data.statusCode === 400) {
        throw new Error(data.message);
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...updatedTask } : task
        )
      );
      toast.success(data.msg);
    };
  
    return (
      <AuthContext.Provider
        value={{
          addTask,
          getAllTasks,
          tasks,
          deleteTaskById,
          editTaskById,
          updateTaskById,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  