
const handleLogin = async () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const resp = await fetch('http://localhost:4040/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      if(resp.status === 200 ) {
        const data = await resp.json()
        console.log(data)
        localStorage.setItem('token', data.token)
        if (data.user.role === 'admin') {
            location.href='/admin'
        }else{
            location.href='/player'
        }

      }else{
        alert(' WRONG USERNAME OR PASSWORD')
        location.reload()
      }
    

}