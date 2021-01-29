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
            const regForm = document.getElementById("registration");
            const logForm = document.getElementById("logForm");
            if (regForm.style.display === "none") {
              regForm.style.display = "block";
              logForm.style.display = "none";
            } else {
              regForm.style.display = "none";
            }
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
            const regForm = document.getElementById("registration");
            const logForm = document.getElementById("logForm");
            if (logForm.style.display === "none") {
              logForm.style.display = "block";
              regForm.style.display = "none";
            } else {
              logForm.style.display = "none";
            }
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
                    <button class="collapsible">
                    <li class="list-group-item d-flex justify-content-between align-items-center" id="item-${item.id}">
                    <strong>${item.firstName} ${item.lastName} </strong> <em>${item.email}</em>
                </li>
                </button>
                <div class="content" id="item-${item.id}">
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil" data-bs-toggle="modal" data-bs-target="#add-modal"></i>
                    <i class="delete-item fa fa-minus-square"></i>
                    </a>
                </div>
                </ul>`;
            });
            document.querySelector(UISelectors.playfield).innerHTML = html;

            let coll = document.getElementsByClassName("collapsible");
            console.log(coll);
            let i;
            
            for (i = 0; i < coll.length; i++) {
              coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                if (content.style.maxHeight){
                  content.style.maxHeight = null;
                } else {
                  content.style.maxHeight = content.scrollHeight + "px";
                } 
              });
            }
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

