//getting all the required elements
const inputBox=document.querySelector(".inputField input");
const addBtn=document.querySelector(".inputField button");
const todoList=document.querySelector(".todoList");
const deleteAllBtn=document.querySelector(".footer button");

inputBox.onkeyup= ()=>{
let userEnteredValue=inputBox.value;//getting user entered value
if(userEnteredValue.trim() != 0){//if user values aren't only spaces
    addBtn.classList.add("active");//active the add button

}
else{
    addBtn.classList.remove("active");//unactive the add button
}
}
showTask();//calling showTask function
//if user click on the add button 
addBtn.onclick=()=>{
    //whenever user click on Add button
    let userEnteredValue=inputBox.value;//getting input field value
    let getLocalStorageData=localStorage.getItem("New ToDo");//getting localStorage
    if(getLocalStorageData==null){
        //if localStorage has no data
        listArray=[];//create a blank array;

    }
    else{
        listArray=JSON.parse(getLocalStorageData);//transforming json string into a js object
    }
    listArray.push(userEnteredValue);//pushing or adding new value in array
    localStorage.setItem("New ToDo", JSON.stringify(listArray));//transforming js object into a json string
    showTask();//calling showTask function
    addBtn.classList.remove("active");//unactive the add button once the task added

}
//function to add task list inside ul
function showTask(){
    let getLocalStorageData=localStorage.getItem("New ToDo");//getting localStorage
    if(getLocalStorageData==null){
        //if localStorage has no data
        listArray=[];//create a blank array;

    }
    else{
        listArray=JSON.parse(getLocalStorageData);//transforming json string into a js object
    }
    const pendingNumb=document.querySelector(".pendingNumb");
    pendingNumb.textContent =listArray.length;//passing the length value in pendingNumb
    if(listArray.length>0){//if array length is greater than0
        deleteAllBtn.classList.add("active");//active the clear all button
    }else{
        deleteAllBtn.classList.remove("active");//unactive the clear all button
    }
    let newLiTag='';
    listArray.forEach((element,index)=>{
        newLiTag += `<li>${element} <span onclick ="deleteTask(${index})";><button>delete</button></span>
        </li>`;
    });
    todoList.innerHTML=newLiTag;//adding new li tag inside ul tag
    inputBox.value="";//once task is added leave the input field blank

}

//delete  task fucntion
function deleteTask(index){
    let getLocalStorageData=localStorage.getItem("New ToDo");//getting localStorage
    listArray=JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);//delete or remove the particular indexed li
    //after remove the li again update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArray));//transforming js object into a json string
    showTask();//calling showTask function
}

//delete all task function
deleteAllBtn.onclick=()=>{
    listArray=[];//empty the array
    //after delete all task again update the local storage
    localStorage.setItem("New ToDo", JSON.stringify(listArray));//transforming js object into a json string
    showTask();//calling showTask function

}
