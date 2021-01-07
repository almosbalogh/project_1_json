import {UserCtrl} from './userctrl.js';

export const UICtrl = (function(){
    //declaring the html selectors
    const UISelectors = {
        playfield: '#playfield',
        regBtn: '#reg',
        logBtn: '#login',
        adminBtn: '#admin',
        regConfirmBtn: '#reg-confirm',
        firstNameInput: '#knev',
        lastNameInput: '#vnev',
        emailInput: '#email',
        passwordInput: '#jelszo',
        scndPasswordInput: '#scndjelszo',
        loginEmail: '#lemail',
        logPassword: '#ljelszo',
        editModal: '#add-modal',
        saveBtn: '#save-button',
        cancelBtn: '#cancel-button',
        userListItems: "user-list li",

        editFirstNameInput: '#edit-knev',
        editLastNameInput: '#edit-vnev',
        editEmailInput: '#edit-email',
        editPasswordInput: '#edit-jelszo',
        editScndPasswordInput: '#edit-scndjelszo',
    }

    return {
        //rendering the registration form by dom manipulation
        showRegForm: function(){
            let html = '';
            html += `
            <div class="row">
            <div class="col-md-3 mx-auto" style="width: 300px;" id="regForm">
            <h1>Regisztráció</h1>
            <form>
              <div class="form-group mx-auto">
                <label><strong>Vezetéknév</strong></label>
                <input type="text" class="form-control" id="vnev" placeholder="Vezetéknév">
              </div>
              <div class="form-group mx-auto">
                <label><strong>Keresztnév</strong></label>
                <input type="text" class="form-control" id="knev" placeholder="Keresztnév">
              </div>
              <div class="form-group mx-auto">
                <label><strong>E-mail cím</strong></label>
                <input type="text" class="form-control" id="email" placeholder="E-mail cím">
                <div class="badge bg-danger red" id="erroremail"></div>
              </div>
              <div class="form-group mx-auto">
                <label><strong>Jelszó</strong></label>
                <input type="password" class="form-control" id="jelszo" placeholder="Jelszó">
              </div>
              <div class="form-group mx-auto">
                <label><strong>Jelszó mégegyszer</strong></label>
                <input type="password" class="form-control" id="scndjelszo" placeholder="Jelszó mégegyszer">
                <div class="badge bg-danger red" id="errorpassword"></div>
              </div>
              <input type="hidden" id="id" value="">
            </form>
            <button class="regconfirm-button btn btn-primary blue" id="reg-confirm">Regisztráció</button>
            </div>
            </div>`;
            document.querySelector(UISelectors.playfield).innerHTML = html;
        },

        //message about the successful registration
        showRegistrationSuccess: function(){
            let html = '';
            html += `<h3 class="center-align">Sikeres regisztráció!</h3>`;
            document.querySelector(UISelectors.playfield).innerHTML = html;
            console.log("második");
        },

        //rendering the login form by dom manipulation
        showLogForm: function(){
            let html = '';
            html += `<div class="col-md-3 mx-auto" style="width: 300px;" id="logForm">
            <h1>Bejelentkezés</h1>
            <form>
              <div class="form-group">
                <label><strong>E-mail cím</strong></label>
                <input type="text" class="form-control" id="lemail">
              </div>
              <div class="form-group">
                <label><strong>Jelszó</strong></label>
                <input type="password" class="form-control" id="ljelszo">
                <div class="badge bg-danger red" id="errorlogin"></div>
              </div>
              <button class="loginconfirm-button btn btn-primary blue" id="reg-confirm">Bejelentkezés</button>
            </form>
          </div>
        </div>`;
        document.querySelector(UISelectors.playfield).innerHTML = html; 
        },

        //message about the successful login
        showLoginSuccess: function(){
            let html = '';
            html += `<h3 class="center-align">Sikeres bejelentkezés!</h3>`;
            document.querySelector(UISelectors.playfield).innerHTML = html;
        },

        //error message if the login failed
        showLoginFailed: function(){
            let messages = [];
            const errorElement = document.getElementById('errorlogin');
            messages.push('Hibás felhasználónév vagy jelszó!');
            e.preventDefault();
            errorElement.innerText = messages.join(', ');
        },
        
        //rendering the user list on the admin window by dom manipulation
        showUserList: function(items){
            let html = `<h1>Felhasználók</h1><br>
            `;
            items.forEach(function(item){
                html += `<ul id="user-list" class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center" id="item-${item.id}">
                    <strong>${item.firstName} ${item.lastName} </strong> <em>${item.email}</em> <em>${item.password}</em> 
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil" data-bs-toggle="modal" data-bs-target="#add-modal"></i>
                    <i class="delete-item fa fa-minus-square"></i>
                    </a>
                </li>
                </ul>`;
            });
            document.querySelector(UISelectors.playfield).innerHTML = html;
        },

        //message if the user list is empty
        noUser: function(){
            let html = '';
            html += `<h3 class="center-align">Nincs egy felhasználó sem.</h3>`;
            document.querySelector(UISelectors.playfield).innerHTML = html;
        },

        //reading the user input from the registration form
        getItemInput: function(){
            return{
                firstName:document.querySelector(UISelectors.firstNameInput).value,
                lastName:document.querySelector(UISelectors.lastNameInput).value,
                email:document.querySelector(UISelectors.emailInput).value,
                password:document.querySelector(UISelectors.passwordInput).value,
                scndPassword:document.querySelector(UISelectors.scndPasswordInput).value
            }
        },

        //reading the user inputs from the 'edit user' form
        getEditInput: function(){
            return{
                firstName:document.querySelector(UISelectors.editFirstNameInput).value,
                lastName:document.querySelector(UISelectors.editLastNameInput).value,
                email:document.querySelector(UISelectors.editEmailInput).value,
                password:document.querySelector(UISelectors.editPasswordInput).value,
                scndPassword:document.querySelector(UISelectors.editScndPasswordInput).value
            }
        },

        //reading the user inputs from the login form
        getLoginInput: function(){
            return{
                loginEmail:document.querySelector(UISelectors.loginEmail).value,
                loginPassword:document.querySelector(UISelectors.logPassword).value
            }
        },

        //loading the choosen user's data to the edit modal
        addUserToForm: function(){
            document.querySelector(UISelectors.editFirstNameInput).value = UserCtrl.getCurrentItem().firstName;
            document.querySelector(UISelectors.editLastNameInput).value = UserCtrl.getCurrentItem().lastName;
            document.querySelector(UISelectors.editEmailInput).value = UserCtrl.getCurrentItem().email;
            document.querySelector(UISelectors.editPasswordInput).value = UserCtrl.getCurrentItem().password;
            document.querySelector(UISelectors.editScndPasswordInput).value = UserCtrl.getCurrentItem().password;
        },

        //refreshing the user list after a user was updated/edited
        updateListItem: function(item){
            let listItems = document.querySelectorAll(".list-group-item");
            listItems = Array.from(listItems);
      
            listItems.forEach(function(listItem){
              const itemID = listItem.getAttribute('id');
              if(itemID === `item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.firstName} ${item.lastName} </strong> <em>${item.email}</em> <em>${item.password}</em> 
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil" data-bs-toggle="modal" data-bs-target="#add-modal"></i>
                <i class="delete-item fa fa-minus-square"></i>
                </a>`;
              }
            });
          },

        //cutting the deleted user from the user list
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },

        //the UISelectors's getter
        getSelectors: function(){
            return UISelectors;
        }
    }
})();

