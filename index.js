const form = document.getElementById('userForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    event.preventDefault();
    const formdata = new FormData(event.target);
    const user = Object.fromEntries(formdata.entries());
    dispalyUser(user);
    saveToLocalStorage(user);
    event.target.reset();
}

function saveToLocalStorage(user){
    localStorage.setItem(user.description, JSON.stringify(user));
}

function dispalyUser(user){
    const userlist = document.getElementById('userList');
    const li = createUserListItem(user);

    userlist.appendChild(li);
}


function createUserListItem(user){
    //create user list item

    const li = document.createElement('li');
    li.textContent = `${user.expense} - ${user.description} - ${user.category}`;

    //create delete button
    const dlt = document.createElement('button');
    dlt.textContent = "Delete Expense";
    dlt.addEventListener( 'click', ()=> deleteUser(li, user));

    //create edit button
    const edt = document.createElement('button');
    edt.textContent = "Edit Expense";
    edt.addEventListener('click', ()=> editUser(user));

    li.appendChild(dlt);
    li.appendChild(edt);

    return li;
}


function deleteUser(li, user){
    li.remove();
    localStorage.removeItem(user.description);
}

function editUser(user){
    const userlist = document.getElementById('userList');
    const liToRemove = [...userlist.children].find(li => li.textContent.includes(user.description));

    if(liToRemove){
        deleteUser(liToRemove, user);
    }

    // Populate form fields with existing values
    const form = document.getElementById('userForm');
    for (const key in user) {
        if (Object.hasOwnProperty.call(user, key)) {
            const input = form.elements[key];
            if (input) {
                input.value = user[key];
            }
        }
    }
}

//display saved users from local
for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    let user;
    try{
        user = JSON.parse(localStorage.getItem(key));
    }
    catch(error){
        console.error(`Error ${key} :`, error);
        continue;
    }
}