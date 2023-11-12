const getBtn = document.getElementById("get-btn")
const createBtn = document.getElementById("create-btn")
const updateBtn = document.getElementById("update-btn")
const deleteBtn = document.getElementById("delete-btn")
const searchBtn = document.getElementById("search-btn")
const outputData = document.getElementById("output-data")



const getTask = () => {
  // reset status message
  document.getElementById("err-message").innerHTML = ""
  document.getElementById("success-message").innerHTML = ""

  axios.get('http://localhost:3000/api/tasks')
  .then(res => {
    outputData.innerHTML = JSON.stringify(res.data.data)
    document.getElementById("success-message").innerHTML = "Success!"
  })
}
const createTask = () => {
  // reset status message
  document.getElementById("err-message").innerHTML = ""
  document.getElementById("success-message").innerHTML = ""

  const title = document.getElementById("title").value
  const body = document.getElementById("body").value
  const image = document.getElementById("image").value
  const completed = document.getElementById("completed").value

  if(title || body || image || completed ) {
    axios.post('http://localhost:3000/api/tasks', {
      title:title,
      body:body,
      image:image,
      // completed:completed,
    })
    .then(res => {
      outputData.innerHTML = JSON.stringify(res.data.data)
      document.getElementById("success-message").innerHTML = "Success!"
    })
  } else {
    document.getElementById("err-message").innerHTML = "Task cannot be blank!"
  }
  
}
const updateTask = () => {
  // reset status message
  document.getElementById("err-message").innerHTML = ""
  document.getElementById("success-message").innerHTML = ""

  const title = document.getElementById("title").value
  const body = document.getElementById("body").value
  const image = document.getElementById("image").value
  const id = document.getElementById("id").value
  const completed = document.getElementById("completed").value
  
  if(id) {
    if(title||body||image||completed) {
      axios.put(`http://localhost:3000/api/tasks/${id}`, {
        title:title,
        body:body,
        image:image,
        // completed:completed,
      }).then(res => {
        outputData.innerHTML = JSON.stringify(res.data.data)
        if(res.data.data === null) {
          document.getElementById("err-message").innerHTML = "Cannot find that task!"
        } else {
          document.getElementById("success-message").innerHTML = "Success!"
        }
        
      })
    } else {
    document.getElementById("err-message").innerHTML = "Task cannot be blank"
    }
    
  } else {
    document.getElementById("err-message").innerHTML = "ID is required!"
  }

}

const deleteTask = () => {
  // reset status message
  document.getElementById("err-message").innerHTML = ""
  document.getElementById("success-message").innerHTML = ""

  const id = document.getElementById("id").value
  if(id) {
    axios.delete(`http://localhost:3000/api/tasks/${id}`)
    .then(res => {
      outputData.innerHTML = JSON.stringify(res.data.data)
      document.getElementById("success-message").innerHTML = "Success!"
    })
  } else {
    document.getElementById("err-message").innerHTML = "ID is required!"
  }
  

}
const searchTask = () => {
  // reset status message
  document.getElementById("err-message").innerHTML = ""
  document.getElementById("success-message").innerHTML = ""

  const title = document.getElementById("title").value
  
  if(title) {
    axios.get(`http://localhost:3000/api/tasks/${title}`)
    .then(res => {
        outputData.innerHTML = JSON.stringify(res.data.data)
        document.getElementById("success-message").innerHTML = "Success!"
      })
  } else {
    document.getElementById("err-message").innerHTML = "Title is required!"
  }
  
}

getBtn.addEventListener('click', getTask)
createBtn.addEventListener('click',createTask)
deleteBtn.addEventListener('click',deleteTask)
searchBtn.addEventListener('click',searchTask)
updateBtn.addEventListener('click',updateTask)


