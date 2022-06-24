import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import TaskCreator from "./Components/addTask";
import Footer from "./Components/Footer";
import About from "./Components/About";


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:4000");
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Delete Task

  const deleteTask = async (id) => {
    await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const tasksFromServer = await fetchTasks();
    setTasks(tasksFromServer);
  };

  // Show Task Creator

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {showAddTask && <TaskCreator onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
          />
        ) : (
          "There is no tasks to show"
        )}
        <Route path="/about" component={About} />
        <Route path="/" exact render={() => <></>} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
