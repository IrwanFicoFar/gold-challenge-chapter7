const getroomById = async () => {
    const resp = await fetch (`http://localhost:4040/room/${Server.id}`)
    console.log(resp)
    //     method: 'GET',
    //     headers: {
    //         Authorization: localStorage.getItem('token')
    //         'Content-Type':'application/json'
    //     },

    //     const data = await resp.json()
    //     console.log(data)
    //     if (data.serverId !== null){
    //         location.href = `/room/${data.serverId}`
    //     }

    // })
}


