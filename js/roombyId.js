// belum berhasil handle view room base on id server, baru api aja 

const getRoomById = async () => {
    console.log('Server Data')
    const data = await Server.findByPk(data.Server.id)
    const resp = await fetch (`http://localhost:4040/room/${data.id}`, {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })

    const dataRoom = await resp.json()
    console.log(datRoom)
    const listRoom = document.getElementById('roombyId')

    let Room = ""
    data.forEach(element => {
        Room = listRoom + 
        `<h1>${element.id}</h1><h1>${element.name}</h1>
        `
    });
    listServer.innerHTML = Room
    
}

getRoomById()

