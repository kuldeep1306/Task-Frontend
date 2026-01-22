// import { HomeIcon , Plus} from 'lucide-react';
// import React, { useCallback, useMemo, useEffect } from 'react'
// import { ADD_BUTTON, HEADER, ICON_WRAPPER, STAT_CARD, STATS_GRID, STATS, VALUE_CLASS, WRAPPER, LABEL_CLASS, FILTER_WRAPPER, FILTER_LABELS, SELECT_CLASSES, FILTER_OPTIONS, TABS_WRAPPER, TAB_BASE, TAB_ACTIVE, TAB_INACTIVE, EMPTY_STATE } from '../assets/dummy';
// import { useState } from 'react';
// import TaskItem from '../components/TaskItem';
// import { CalendarIcon , Filter } from 'lucide-react';
// import axios from 'axios';
// import TaskModal from '../components/TaskModal';



// const API_BASE ='http://localhost:4000/api/tasks';


// const Dashboard = () => {
  
//     const [showModel , setShowModel] = useState(false);
//     const [ selectedTask , setSelectedTask] = useState (null);
//     const [filter , setFilter] = useState ("all");
//     const [tasks, setTasks] = useState([]);

//     // const refreshTasks = useCallback(async () => {
//     //   try {
//     //     const response = await fetch(API_BASE);
//     //     const data = await response.json();
//     //     setTasks(data);
//     //   } catch (error) {
//     //     console.error('Failed to fetch tasks:', error);
//     //   }
//     // }, []);

//   const refreshTasks = useCallback(async () => {
//   try {
//     const response = await fetch(`${API_BASE}/gp`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     setTasks(Array.isArray(data.tasks) ? data.tasks : []);  // <-- HERE use data.tasks
//   } catch (error) {
//     console.error('Failed to fetch tasks:', error);
//     setTasks([]);
//   }
// }, []);

//     useEffect(() => {
//       refreshTasks();
//     }, []);

//     const stats = useMemo(() => ({
//       total: tasks.length,
//       lowPriority: tasks.filter(t => t.priority?.toLowerCase() === "low").length,
//       mediumPriority: tasks.filter(t => t.priority?.toLowerCase() === "medium").length,
//       highPriority: tasks.filter(t => t.priority?.toLowerCase() === "high").length,
//       completed: tasks.filter(t =>
//   t.completed === true ||
//   t.completed === 1 ||
//   (typeof t.completed === 'string' && t.completed.toLowerCase() === 'yes')
// ).length


//     }),[tasks])

//     const filteredTasks = useMemo(() => tasks.filter(task => {
//       const dueDate = new Date(task.dueDate);
//       const today = new Date();
//       const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7); 
//       switch (filter) {
//         case "today":
//           return dueDate.toDateString() === today.toDateString();
//           case "week":
//             return dueDate >= today && dueDate <= nextWeek
//             case "high":
//               case "medium":
//                 case "low":
//                   return task.priority?.toLowerCase() === filter
//                   default:
//                     return true
//       }

//     }),[tasks,filter])

//     const handleTaskSave = useCallback(async (taskData) => {
      
//       try{
//         if(taskData.id) await axios.put(`${API_BASE}/${taskData.id}/gp`, taskData);
//         refreshTasks();
//         setShowModel(false);
//         setSelectedTask(null);
//       }catch (error) {
//         console.error('Failed to save task:', error);
//       }
//     },[refreshTasks]);


//     return (
//       <div className={WRAPPER}>
//         <div className={HEADER}>
//           <div className='min-w-0'>
//           <h1 className='text-xl md:text-3xl font-bold text-gray-800 flex items-center gap-2'>
//             <HomeIcon className='text-purple-500 w-5 h-5 md:w-6 md:h-6 shrink-0' />
//             <span className='truncate'>Task Progress  </span>
//           </h1>
//           <p className='text-sm text-gray-300 mt-1 ml-7 truncate'>
//             Monitor the progress of your tasks and stay updated with the latest status.
//           </p>
//       </div>
//       <button onClick={() => setShowModel(true)} className={ADD_BUTTON}>
//         + Add New Task
//       </button>
//       </div>

//       <div className={STATS_GRID}>
//         {STATS.map(({ key, value, icon: Icon, iconColor, borderColor = "border-purple-100",
//   valueKey, textColor, gradient }) => (
    
//   <div key={key} className={`${STAT_CARD} ${borderColor}`}>
//     <div className='flex items-center gap-2 md:gap-3'>
//     <div className={`${ICON_WRAPPER} ${iconColor}`}>
//       <Icon className='w-4 h-4 md:w-5 md:h-5' />
//     </div>
//     <div className='min-w-0'>
//       <p
//         className={`${VALUE_CLASS} ${gradient ?
//            "bg-linear-to-r from-fuchsia-500 to-purple-600 bg-clip-text  text-transparent "
//            : textColor}`}
//       >
//         {stats[valueKey]}
//       </p>
//       <p className={LABEL_CLASS}>{value}</p>
//     </div>
//     </div>
//   </div>
// ))}

//       </div> 
//       <div className='space-y-6'>
//         <div className={FILTER_WRAPPER}>
//         <div className='flex items-center gap-2 min-w-0'>
//           <Filter className='w-5 h-5 text-purple-500 shrink-0' />
//           <h2 className='text-base md:text-lg font-semibold text-gray-800 truncate'>
//             {FILTER_LABELS[filter]}
//           </h2>
//           <select value={filter} onChange={(e) => setFilter(e.target.value)}
//           className={SELECT_CLASSES}>
//             {FILTER_OPTIONS.map(opt => <option key={opt} value={opt}>
//               {opt.charAt(0).toUpperCase() + opt.slice(1)}
//             </option>)}
//           </select>

//           <div className={TABS_WRAPPER}>
//             {FILTER_OPTIONS.map(opt => (
//               <button key={opt} onClick={() => setFilter(opt)}
//               className={`${TAB_BASE} ${filter === opt ? TAB_ACTIVE : TAB_INACTIVE}`}>
//                 {opt.charAt(0).toUpperCase() + opt.slice(1)}
//               </button>
//             ))}
//           </div>
//           </div>
//           </div>


//           <div className='space-y-4'>
//             {filteredTasks.length === 0 ? (
//               <div className={EMPTY_STATE.wrapper}>
//                 <div className={EMPTY_STATE.iconWrapper}>
//                   <CalendarIcon className='w-8 h-8 text-purple-500' />
//                   </div>
//                   <h3 className='text-lg font-semibold text-shadow-gray-800 mb-2'>
//                     No tasks found
//                   </h3>
//                   <p className='text-sm text-gray-500 mb-4'>{filter === "all" ?
//                   "create a new task to get started" : `No tasks found for`}</p>
//                   <button onClick={() => setShowModel(true)} className={EMPTY_STATE.btn}>
//                     + Add New Task
//                   </button>
//                   </div>
//             ) : (
//               filteredTasks.map(task => (
//                 <TaskItem key={task._id || task.id}
//                 task={task}
//                 onRefresh={refreshTasks}
//                 showCompleteCheckbox
//                 onEdit={() => {setSelectedTask(task);
//                 setShowModel(true);
//                 }}/>
//               ))
              
//             )}
//           </div>

//           <div 
//   onClick={() => setShowModel(true)}
//   className='hidden md:flex items-center justify-center p-4 border-2 border-dashed border-purple-200
//   rounded-xl hover:border-purple-500 bg-purple-50/50 cursor-pointer transition-colors'>

//             <Plus className='w-5 h-5 text-purple-500 mr-2'/>
//             <span className='text-gray600 font-medium '>Add New Task</span>
//           </div>
//           </div>
//           <TaskModal
//   isOpen={showModel}
//   onClose={() => {
//     setShowModel(false)
//     setSelectedTask(null)
//   }}
//   onSave={handleTaskSave}
//   taskToEdit={selectedTask}
// />

//     </div>
    
//   )
// }

// export default Dashboard




import React, { useCallback, useMemo, useEffect, useState } from "react";
import { HomeIcon, Plus, CalendarIcon, Filter } from "lucide-react";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModal";
import axios from "axios";

const API_BASE = "http://localhost:4000/api/tasks";

const Dashboard = () => {
  const [showModel, setShowModel] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);

  const refreshTasks = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/gp`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setTasks(Array.isArray(data.tasks) ? data.tasks : []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const stats = useMemo(() => ({
    total: tasks.length,
    low: tasks.filter(t => t.priority === "low").length,
    medium: tasks.filter(t => t.priority === "medium").length,
    high: tasks.filter(t => t.priority === "high").length,
    completed: tasks.filter(
      t =>
        t.completed === true ||
        t.completed === 1 ||
        (typeof t.completed === "string" &&
          t.completed.toLowerCase() === "yes")
    ).length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const dueDate = task.dueDate ? new Date(task.dueDate) : null;
      switch (filter) {
        case "today":
          return dueDate && dueDate.toDateString() === today.toDateString();
        case "week":
          return dueDate && dueDate >= today && dueDate <= nextWeek;
        case "high":
        case "medium":
        case "low":
          return task.priority === filter;
        default:
          return true;
      }
    });
  }, [tasks, filter]);

  const handleTaskSave = useCallback(
    async (taskData) => {
      try {
        if (taskData.id) {
          await axios.put(`${API_BASE}/${taskData.id}/gp`, taskData);
        }
        refreshTasks();
        setShowModel(false);
        setSelectedTask(null);
      } catch (error) {
        console.error("Failed to save task:", error);
      }
    },
    [refreshTasks]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-fuchsia-50 p-4 md:p-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4
        bg-white/80 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-sm border border-purple-100">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r
            from-purple-600 to-fuchsia-500 bg-clip-text text-transparent flex items-center gap-2">
            <HomeIcon className="w-6 h-6" />
            Task Progress
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor your tasks and stay productive
          </p>
        </div>

        <button
          onClick={() => setShowModel(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
          bg-gradient-to-r from-purple-600 to-fuchsia-500
          text-white font-semibold shadow-md hover:shadow-lg
          hover:scale-[1.02] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Task
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {[
          { label: "Total", value: stats.total },
          { label: "Completed", value: stats.completed },
          { label: "High", value: stats.high },
          { label: "Medium", value: stats.medium },
          { label: "Low", value: stats.low },
        ].map(item => (
          <div
            key={item.label}
            className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100
            hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <p className="text-2xl font-bold text-purple-600">{item.value}</p>
            <p className="text-sm text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border
        border-purple-100 flex flex-col md:flex-row gap-4
        md:items-center md:justify-between mt-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-purple-500" />
          <h2 className="font-semibold text-gray-800 capitalize">{filter} Tasks</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", "today", "week", "high", "medium", "low"].map(opt => (
            <button
              key={opt}
              onClick={() => setFilter(opt)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition
                ${
                  filter === opt
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TASK LIST */}
      <div className="mt-6 space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-purple-100">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br
              from-purple-100 to-fuchsia-100 flex items-center justify-center">
              <CalendarIcon className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              No tasks found
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Create a task to get started
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onRefresh={refreshTasks}
              showCompleteCheckbox
              onEdit={() => {
                setSelectedTask(task);
                setShowModel(true);
              }}
            />
          ))
        )}
      </div>

      {/* MODAL */}
      <TaskModal
        isOpen={showModel}
        onClose={() => {
          setShowModel(false);
          setSelectedTask(null);
        }}
        onSave={handleTaskSave}
        taskToEdit={selectedTask}
      />
    </div>
  );
};

export default Dashboard;
