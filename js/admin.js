
const validateLogin = () => {
    const data = localStorage.getItem('token')
    if(data === null) {
        location.href='/login'
    }
}

validateLogin()

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
        serverList = serverList + `<li>id ${element.id} = ${element.name}</li>`
    });

    listServer.innerHTML = serverList

}

getServerData()

const handleServer = async () => {

    console.log('handleServer')
    const servername = document.getElementById('servername').value
    const resp = await fetch ('http://localhost:4040/server', {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify ({
            name: servername
        })
    })

    if (resp.status !== 201) {
        alert('FAILED TO CREATE SERVER')            
    }else{
        alert('NEW SERVER CREATED')
        location.reload()
    }
}

const handleLogout = () => {
    localStorage.removeItem('token')
    location.href='/login'
}

