import {UserCtrl} from './UserCtrl.js';

export const UICtrl = (function(){
    //a html selectotok deklarálása
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
        //a regisztrációs felület létrehozása dom manipulációval
        showRegForm: function(){
            let html = '';
            html += `
            <div class="row">
            <div class="col-md-3 mx-auto" style="width: 300px;" id="regForm">
            <h1>Regisztráció</h1>
            <form>
              <div class="form-group">
                <label><strong>Vezetéknév</strong></label>
                <input type="text" class="form-control" id="vnev" placeholder="Vezetéknév">
              </div>
              <div class="form-group">
                <label><strong>Keresztnév</strong></label>
                <input type="text" class="form-control" id="knev" placeholder="Keresztnév">
              </div>
              <div class="form-group">
                <label><strong>E-mail cím</strong></label>
                <input type="text" class="form-control" id="email" placeholder="E-mail cím">
                <span class="badge bg-danger red" id="erroremail"></span>
              </div>
              <div class="form-group">
                <label><strong>Jelszó</strong></label>
                <input type="password" class="form-control" id="jelszo" placeholder="Jelszó">
              </div>
              <div class="form-group">
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

        //sikeres regisztráció üzenete
        showRegistrationSuccess: function(){
            let html = '';
            html += `<h3 class="center-align">Sikeres regisztráció!</h3>`;
            document.querySelector(UISelectors.playfield).innerHTML = html;
            console.log("második");
        },

        //a bejelentkezési felület létrehozása dom manipulációval
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

        //a sikeres belépés üzenete
        showLoginSuccess: function(){
            let html = '';
            html += `<h3 class="center-align">Sikeres bejelentkezés!</h3>`;
            document.querySelector(UISelectors.playfield).innerHTML = html;
        },

        //hibaüzenet sikertelen bejelentkezésnél
        showLoginFailed: function(){
            let messages = [];
            const errorElement = document.getElementById('errorlogin');
            messages.push('Hibás felhasználónév vagy jelszó!');
            e.preventDefault();
            errorElement.innerText = messages.join(', ');
        },
        
        //az admin felületen található user lista létrehozása dom manipulációval
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

        //üzenet abban az esetben ha még nincs user
        noUser: function(){
            let html = '';
            html += `<h3 class="center-align">Nincs egy felhasználó sem.</h3>`;
            document.querySelector(UISelectors.playfield).innerHTML = html;
        },

        //a regisztrációs formon megadott felhasználói inputok(név, email stb.)
        getItemInput: function(){
            return{
                firstName:document.querySelector(UISelectors.firstNameInput).value,
                lastName:document.querySelector(UISelectors.lastNameInput).value,
                email:document.querySelector(UISelectors.emailInput).value,
                password:document.querySelector(UISelectors.passwordInput).value,
                scndPassword:document.querySelector(UISelectors.scndPasswordInput).value
            }
        },

        //a szerkesztés felületen megadott felhasználói inputok(név, email stb.)
        getEditInput: function(){
            return{
                firstName:document.querySelector(UISelectors.editFirstNameInput).value,
                lastName:document.querySelector(UISelectors.editLastNameInput).value,
                email:document.querySelector(UISelectors.editEmailInput).value,
                password:document.querySelector(UISelectors.editPasswordInput).value,
                scndPassword:document.querySelector(UISelectors.editScndPasswordInput).value
            }
        },

        //a bejelentkezés felületen megadott felhasználói inputok(email és jelszó)
        getLoginInput: function(){
            return{
                loginEmail:document.querySelector(UISelectors.loginEmail).value,
                loginPassword:document.querySelector(UISelectors.logPassword).value
            }
        },

        //a szerkeszteni kívént user adatai automatiksan felvitelre kerülnek a szerkesztési felületre
        addUserToForm: function(){
            document.querySelector(UISelectors.editFirstNameInput).value = UserCtrl.getCurrentItem().firstName;
            document.querySelector(UISelectors.editLastNameInput).value = UserCtrl.getCurrentItem().lastName;
            document.querySelector(UISelectors.editEmailInput).value = UserCtrl.getCurrentItem().email;
            document.querySelector(UISelectors.editPasswordInput).value = UserCtrl.getCurrentItem().password;
            document.querySelector(UISelectors.editScndPasswordInput).value = UserCtrl.getCurrentItem().password;
        },

        //a frissített(szerkesztett) user adatinak frissítése a megjelenített listában
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

        //a törölt user kivétele a listából
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },

        //a UISelectorok gettere
        getSelectors: function(){
            return UISelectors;
        }
    }
})();

