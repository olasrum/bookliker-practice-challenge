const list = document.getElementById('list')
const listPanel = document.getElementById('list-panel')
const showPanel = document.getElementById('show-panel')
const currentUser = {id: 1, username: 'pouros'}
const myUser = {'id': 1, 'username': 'pouros'}

fetch('http://localhost:3000/books')
.then(resp => resp.json())
.then(data => {
    //console.log(data)
    displayBooks(data)
})

function displayBooks(books) {
    books.forEach(book => {
        const li = document.createElement('li')
        li.innerHTML = book.title
        list.append(li)

        li.addEventListener('click', () => handleClick(book)) 
        })
    }

handleClick = (e) => {
    showPanel.innerHTML =`<img src=${e.img_url}/> <h3>${e.title}</h3> <h4>${e.subtitle}</h4> <p>${e.description}</p>`

    const like = document.createElement('button')
    like.innerHTML = 'LIKE'

    showPanel.append(like)

    const userList = document.createElement('ul')
    showPanel.append(userList)

    e.users.forEach((user) => {
        let userName = document.createElement('li')
        userName.innerHTML = user.username
        userList.append(userName)
    })

    like.addEventListener('click', () => {
        if (like.innerHTML === 'LIKE') {
            like.innerHTML = 'UNLIKE'
        } else {
            like.innerHTML = 'LIKE'
        }
        e.users.push(myUser)

        fetch(`http://localhost:3000/books/${e.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                users: e.users
            })
        })
        .then(resp => resp.json())
        .then(updatedBook => {
            e.users = updatedBook.users
            let newUserLi = document.createElement('li')
            newUserLi.innerHTML = myUser.username
            userList.append(newUserLi)
        })
    })
}




    

   
    


//https://medium.com/@alicieadawnr/bookliker-lab-a7a1a6e80b91


