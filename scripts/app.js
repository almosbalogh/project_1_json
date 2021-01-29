import {UICtrl} from './uictrl.js';
import {UserCtrl} from './userctrl.js';
import {ValidationCtrl} from './validationctrl.js';
import {StorageCtrl} from './storagectrl.js';

//the 'main' js file
const App = (function(UICtrl, UserCtrl, ValidationCtrl, StorageCtrl){
    let overallId;
    //reading EventListeners
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.regBtn).addEventListener('click', showRegFormClick);
        document.querySelector(UISelectors.logBtn).addEventListener('click', showLogFromClick);
        document.querySelector(UISelectors.playfield).addEventListener('click', userAddSubmit);
        document.querySelector(UISelectors.adminBtn).addEventListener('click', showAdminPageClick);
        document.querySelector(UISelectors.playfield).addEventListener('click', userDeleteSubmit);
        document.querySelector(UISelectors.playfield).addEventListener('click', loginSubmit);
        document.querySelector(UISelectors.playfield).addEventListener('click', editUserClick);
        document.querySelector(UISelectors.saveBtn).addEventListener('click',editUserSubmit); 

    }

    //showing the login form
    const showLogFromClick = function(){
        UICtrl.showLogForm();
    }

    //showing the registration form
    const showRegFormClick = function(){
        UICtrl.showRegForm();
    }

    //showing the admin window
    const showAdminPageClick = function(){
        StorageCtrl.getUsersFromStorage('http://localhost:3000/users')
            .then(data => UICtrl.showUserList(data))
            .catch(err => UICtrl.noUser());
    }

    //executing the registration(saving the user)
    const userAddSubmit = function(e){
        if(e.target.classList.contains('regconfirm-button') && ValidationCtrl.checkAll(e) /*&& ValidationCtrl.uniqueEmail(e, input)===true*/){
            let counter = 0;
            const newUser = UserCtrl.addItem(input.firstName, input.lastName, input.email, input.password);
            
            if(counter === 0){
                StorageCtrl.storeUser('http://localhost:3000/users', newUser)
                .then(elek => UICtrl.showRegistrationSuccess());

                window.addEventListener('beforeunload', (event) => {
                    event.preventDefault();
                    event.returnValue = '';
                  });
            }   
        }
    }

    //validating the user input and executing login
    const loginSubmit = function(e){
        if(e.target.classList.contains('loginconfirm-button')){
            const input = UICtrl.getLoginInput();
            const users = UserCtrl.getItems();
            let counter = 0;

            users.then(data =>
                data.forEach(function(user){
                    if(input.loginEmail === user.email && input.loginPassword === user.password){
                        UICtrl.showLoginSuccess();
                        counter = 1;
                    }   
            }));
            if(counter === 0){
                let messages = [];
                const errorElement = document.getElementById('errorlogin');
                messages.push('Hibás felhasználónév vagy jelszó!');
                e.preventDefault();
                errorElement.innerText = messages.join(', ');
            }
        
        }
    }

    //deleting the choosen user
    const userDeleteSubmit = function(e){
        if(e.target.classList.contains('delete-item')){
            const listId = e.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);

            StorageCtrl.deleteUserFromStorage(`http://localhost:3000/users/${id}`)
                .then(data => {
                showAdminPageClick();
                })
                window.addEventListener('beforeunload', (event) => {
                    event.preventDefault();
                    event.returnValue = '';
                  });
        }
        e.preventDefault();
    }

    //opening the edit modal
    const editUserClick = function(e){
        if(e.target.classList.contains('edit-item')){
            const listId = e.target.parentNode.parentNode.id;
            const listIdArr = listId.split('-');
            const id = parseInt(listIdArr[1]);
            overallId = id;
            const itemToEdit = UserCtrl.getItemById(id);
            itemToEdit
            .then(data => UserCtrl.setCurrentItem(data))
            .then(data => console.log(UserCtrl.getCurrentItem().id))
            .then(data => UICtrl.addUserToForm());
        }
    }

    //saving the edited/updated user
    const editUserSubmit = function(e){
        const input = UICtrl.getEditInput();
        if(ValidationCtrl.validateEmail(e, input)===true && ValidationCtrl.validatePassword(e, input)===true /*&& ValidationCtrl.uniqueEmail(e, input)===true*/){
            const updatedUser = UserCtrl.updateUser(input.firstName, input.lastName,input.email, input.password);
            let counter = 0;
            updatedUser.then(
            data =>  StorageCtrl.updateUsersStorage(`http://localhost:3000/users/${overallId}`, data)
                .then(data => {
                    showAdminPageClick();
                    counter = 1;
                    window.addEventListener('beforeunload', (event) => {
                        event.preventDefault();
                        event.returnValue = '';
                    });
                })
                .catch(err => console.log(err))
            );
        }
        else{
            let item = document.querySelector(".modal-footer").childNodes[0];
            item.replaceChild(`<button class="btn btn-success" id="save-button">Mentés</button>`, item.childNodes[0]);
        }
    }

    return{
        init: function(){
            loadEventListeners();
        }
    }
})(UICtrl, UserCtrl, ValidationCtrl, StorageCtrl);

App.init();