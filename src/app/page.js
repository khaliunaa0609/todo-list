"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue === "") {
      alert("Please enter a task!");
      return;
    }

    setTodos([{ title: inputValue, isDone: false, id: uuidv4() }, ...todos]),
      setInputValue("");
  };

  const handleOnChangeCheckbox = (event, id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) todo.isDone = event.target.checked;
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return !todo.isDone;
    return todo.isDone;
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-[377px] flex flex-col gap-[40px] rounded-md shadow-[0_0_12px_0_rgba(0,0,0,0.16)]">
        <div className="flex flex-col gap-[20px] mt-[20px]">
          <h3 className="text-black font-inter font-semibold text-xl flex justify-center">
            To-Do list
          </h3>
          <div className="flex gap-[20px] justify-center">
            <input
              onKeyDown={(a) => {
                if (a.key === "Enter") {
                  handleAddTodo();
                }
              }}
              value={inputValue}
              onChange={handleOnChange}
              type="text"
              placeholder="Add a new task..."
              className="w-[280px] h-[40px] border-1 border-[#E4E4E7] rounded-md pl-[10px]"
            />
            <button
              onClick={handleAddTodo}
              className={"bg-[#3C82F6] text-white p-2 rounded-md"}
            >
              Add
            </button>
          </div>
          <div className="flex gap-[6px] ml-5">
            <button
              onClick={() => handleFilterStatus("all")}
              className={
                "bg-[#F3F4F6] text-[#363636] p-2 rounded-md " +
                `${filterStatus === "all" ? "!bg-[#3C82F6] text-white" : ""}`
              }
            >
              All
            </button>
            <button
              onClick={() => handleFilterStatus("active")}
              className={
                "bg-[#F3F4F6] text-[#363636] p-2 rounded-md " +
                `${filterStatus === "active" ? "!bg-[#3C82F6] text-white" : ""}`
              }
            >
              Active
            </button>
            <button
              onClick={() => handleFilterStatus("completed")}
              className={
                "bg-[#F3F4F6] text-[#363636] p-2 rounded-md " +
                `${
                  filterStatus === "completed" ? "!bg-[#3C82F6] text-white" : ""
                }`
              }
            >
              Completed
            </button>
          </div>
          {filteredTodos.map((todo, index) => (
            <div
              key={todo.id}
              className="w-[345px] h-[62px] flex justify-between + px-4 items-center ml-[16px] bg-[#F9FAFB] rounded-md"
            >
              <div className="flex gap-[10px]">
                <input
                  onChange={(event) => handleOnChangeCheckbox(event, todo.id)}
                  type="checkbox"
                  defaultChecked={todo.isDone}
                />
                <p className={todo.isDone ? "line-through" : ""}>
                  {todo.title}
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this?")) {
                    handleDeleteTodo(index);
                  }
                }}
                className="bg-[#FEF2F2] text-[#EF4444] p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
          {filteredTodos.length === 0 ? (
            <p className="text-sm text-[#6B7280] font-inter flex justify-center mt-4">
              No tasks yet. Add one above!
            </p>
          ) : (
            <div className="flex flex-row items-center justify-center gap-15 border-t w-[350px] mx-auto border-[#E4E4E7]">
              <p className="text-sm text-[#6B7280] font-inter">
                {filteredTodos.filter((task) => task.isDone).length} of{" "}
                {filteredTodos.length} tasks completed
              </p>

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this?")) {
                    handleDeleteTodo(todos.id);
                  }

                  setTodos(todos.filter((todo) => !todo.isDone));
                }}
                className=" text-[#EF4444] p-2 rounded-md"
              >
                Clear Completed
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-[#6B7280] font-inter flex justify-center gap-[4px] mb-[20px]">
          Powered by<span className="text-[#3B73ED]">Pinecone academy</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
