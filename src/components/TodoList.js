import React, { useState, useEffect } from "react";
import "./TodoList.css";
import image from "./note3.jpg";

// get localStorage data
const getLocalData = () => {
  let lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

function TodoList() {
  const [inputData, setInputData] = useState("");
  //   const [items, setItems] = useState([]);
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  // add items function
  const addItems = () => {
    if (!inputData) {
      alert("Plz fill the data");
    } else if (inputData && toggleBtn) {
      setItems(
        items.map((currentElem) => {
          if (currentElem.id === isEditItem) {
            return { ...currentElem, name: inputData };
          } else {
            return currentElem;
          }
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, myNewInputData]);
      setInputData("");
    }
    console.log(inputData);
  };

  // remove single item
  const deleteItem = (id) => {
    const updatedItems = items.filter((currentElem) => currentElem.id !== id);
    setItems(updatedItems);
  };

  // remove all items
  const removeAll = () => {
    setItems([]);
  };

  // edting data
  const editItem = (id) => {
    const todoEdited = items.find((currentElem) => currentElem.id === id);
    setInputData(todoEdited.name);
    setIsEditItem(id);
    setToggleBtn(true);
  };

  // adding to localStorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <div className="main-div container">
      <div className="child-div ">
        <p className="heading">*Add Your List Here*</p>

        <div className="addItems">
          <input
            type="text"
            className="form-control"
            placeholder="✍ Add Item..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggleBtn ? (
            <i className="edit far fa-edit add-btn" onClick={addItems}></i>
          ) : (
            <i className="plus fa fa-plus add-btn" onClick={addItems}></i>
          )}
        </div>

        {/* show all items */}
        <div className="showItems">
          {items.map((currentElem, id) => (
            <div className="eachItem" key={currentElem.id}>
              <li>{currentElem.name}</li>

              <div className="edit-del">
                <i
                  className="edit far fa-edit add-btn"
                  onClick={() => editItem(currentElem.id)}
                ></i>
                <i
                  className="delete fas fa-trash add-btn"
                  onClick={() => deleteItem(currentElem.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>

        {/* remove all button */}
        <div className="remove-btn">
          <button className="btn btn-outline-danger " onClick={removeAll}>
            Remove All
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
