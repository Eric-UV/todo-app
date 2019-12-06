(function () {
    'use strict';

    const validate = () => {                
        let name = document.getElementById('nameInput');
        let date = document.getElementById('dateInput');
        let time = document.getElementById('timeInput');

        if (name == null || name == undefined) {
            console.log(new Error('name is null or undefined'));
        }
        if (date == null || date == undefined) {
            console.log(new Error('date is null or undefined'));
        }
        if (time == null || time == undefined) {
            console.log(new Error('time is null or undefined'));
        }

        let todo = {
            name: name.value,
            date: `${date.value} ${time.value}`
        };

        return todo;
    }

    const clearFields = () => {
        let name = document.getElementById('nameInput');
        let date = document.getElementById('dateInput');
        let time = document.getElementById('timeInput');

        name.value = '';
        date = new Date();
        time = null;
    };

    const addItemToList = function(todo) {
        let todoList = document.getElementById('todos-list');
        let string = `
                        <li>
                            <button data-id="${todo.id}" class="btn-close">X</button>
                            <p><b>Todo: </b> ${ todo.name }</p>
                            <p><b>Date and time: </b> ${ todo.date }</p>
                            <p><b>Created at: </b> ${ todo.createdAt }</p>
                        </li>`;
        todoList.insertAdjacentHTML('beforeend', string);
    }

    const setEvents = function() {
        let items = document.querySelectorAll('.btn-close');
        items.forEach(item => {
            item.addEventListener('click', deleteTodo);
        });
    }

    const loadData = function() {
        fetch('http://localhost:3000/api/todos')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                data.forEach(todo => {                    
                    addItemToList(todo);
                    setEvents();
                });
            })
            .catch(err => {
                console.error(err);
            }
        );
    }    

    const addTodo = e => {
        e.preventDefault();

        let todo = validate();

        fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify(todo)
        }).then(res => {
            return res.json();
        }).then(data => {
            addItemToList(data);
            setEvents();
            clearFields();
        }).catch(err => {
            console.error(err);
        });
    }

    const deleteTodo = e => {
        e.preventDefault();        
        fetch('http://localhost:3000/api/todos', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify({id: e.target.getAttribute('data-id')})
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);            
        }).catch(err => {
            console.error(err);
        });

        let li = e.target.parentNode;
        li.parentNode.removeChild(li);
    }

    document.getElementById('btnSave').addEventListener('click', addTodo);        

    loadData();
})();