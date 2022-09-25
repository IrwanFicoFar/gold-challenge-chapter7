
const getServerData = async () => {
    console.log('Server Data')

    const resp = await fetch ('http://localhost:4040/server', {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })

    const data = await resp.json()
    console.log(data)
    const listServer = document.getElementById('list-server')

    let serverList = ""
    data.forEach(element => {
        serverList = serverList + 
        `<tr><th id="serverId">${element.id}</th><td>${element.name}</td><td><button onclick="handleRoomId()">go</td><tr/>
        <tr><tr/>
        `
    });
    listServer.innerHTML = serverList
    
}

getServerData()

const handleRoomId = async () => {
    console.log('handle room id')
    location.href = `/fight`
  
}

const handleLogout = () => {
    localStorage.removeItem('token')
    location.href='/login'
}



