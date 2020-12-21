import {UICtrl} from './UICtrl.js';
import {UserCtrl} from './UserCtrl.js';
import {ValidationCtrl} from './ValidationCtrl.js';
import {StorageCtrl} from './StorageCtrl.js';

//a 'main' js fájl
const App = (function(UICtrl, UserCtrl, ValidationCtrl, StorageCtrl){
    let overallId;
    //eventListenerek beolvasása
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

    //a bejeletnkezési ablak mutatása
    const showLogFromClick = function(){
        UICtrl.showLogForm();
    }

    //a regisztrációs ablak mutatása
    const showRegFormClick = function(){
        UICtrl.showRegForm();
    }

    //az admin ablak mutatása
    const showAdminPageClick = function(){
        StorageCtrl.getUsersFromStorage('http://localhost:3000/users')
            .then(data => UICtrl.showUserList(data))
            .catch(err => UICtrl.noUser());
    }

    //a regisztráció végrehajtása
    const userAddSubmit = function(e){
        if(e.target.classList.contains('regconfirm-button') && ValidationCtrl.validateEmail(e)===true && ValidationCtrl.validatePassword(e)===true && ValidationCtrl.uniqueEmail(e)===true){
            const input = UICtrl.getItemInput();
            let counter = 0;
            const newUser = UserCtrl.addItem(input.firstName, input.lastName, input.email, input.password);
            const users = UserCtrl.getItems();
            users.then(data =>
                data.forEach(function(user){
                    if(counter === 0){
                        console.log("what the fuck");
                        StorageCtrl.storeUser('http://localhost:3000/users', newUser)
                        .then(elek => UICtrl.showRegistrationSuccess());
                        counter = 1;
                        window.addEventListener('beforeunload', (event) => {
                            // Cancel the event as stated by the standard.
                            event.preventDefault();
                            // Chrome requires returnValue to be set.
                            event.returnValue = '';
                          });
                    }   
            }));
            e.preventDefault();
        }
    }

    //a bejelentkezési adatok ellenőrzése és a bejelentkezés végrehajtása
    const loginSubmit = function(e){
        if(e.target.classList.contains('loginconfirm-button')){
            const input = UICtrl.getLoginInput();
            const users = UserCtrl.getItems();
            let counter = 0;
            users.then(data =>
                data.forEach(function(user){
                    if(input.loginEmail === user.email && input.loginPassword === user.password){
                        console.log("what the fuck");
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

    //felhasználó törlés végrehajtása
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
                    // Cancel the event as stated by the standard.
                    event.preventDefault();
                    // Chrome requires returnValue to be set.
                    event.returnValue = '';
                  });
        }
        e.preventDefault();
    }

    //a szerkesztőfelület megnyitása
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

    //szerkesztésfelületen keresztül történő változtatások mentése
    const editUserSubmit = function(e){
        const input = UICtrl.getEditInput();
        const updatedUser = UserCtrl.updateUser(input.firstName, input.lastName,input.email, input.password);
        console.log(updatedUser);
        let counter = 0;
        updatedUser
        .then(
        data =>  StorageCtrl.updateUsersStorage(`http://localhost:3000/users/${overallId}`, data)
            .then(data => {
                showAdminPageClick();
                counter = 1;
                window.addEventListener('beforeunload', (event) => {
                    // Cancel the event as stated by the standard.
                    event.preventDefault();
                    // Chrome requires returnValue to be set.
                    event.returnValue = '';
                });
            })
            .catch(err => console.log(err))
        );
        /*UICtrl.cancelUserEdit();*/
    }

    return{
        init: function(){
            loadEventListeners();
        }
    }
})(UICtrl, UserCtrl, ValidationCtrl, StorageCtrl);

App.init();