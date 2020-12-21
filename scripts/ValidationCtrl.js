import {UICtrl} from './UICtrl.js';
import {UserCtrl} from './UserCtrl.js';


//A regisztrációs mezők validálásáért felelős metódusok
export const ValidationCtrl = (function(UICtrl, UserCtrl){
    return{
        //helyes e-mail formáért felelős metódus, helytelen e-mail megadása esetén hibaüzenet
        validateEmail: function(e){
            let messages = [];
            const errorElement = document.getElementById('erroremail');
            errorElement.innerText = messages.join(', ');
            const input = UICtrl.getItemInput();
            const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

            if(!re.test(input.email)){
                messages.push('Helytelenül megadott e-mail cím!');
                e.preventDefault();
                errorElement.innerText = messages.join(', ');
                return false;
            }
            else{
                return true;
            }

        },

        //az e-mail címek egyediségéért felelős metódus, létező e-mail esetén hibaüzenet
        uniqueEmail: async function(e){
            let messages = [];
            const errorElement = document.getElementById('erroremail');
            errorElement.innerText = messages.join(', ');
            const input = UICtrl.getItemInput();
            const users = UserCtrl.getItems();
            let counter = 0;
            await users.then(data => data.forEach(function(user){
                if(input.email === user.email){
                    counter = 1;
                }
            }));
            
            if(counter === 1) {
                messages.push('A megadott e-mail címmel már regisztráltak!');
                e.preventDefault();
                errorElement.innerText = messages.join(', ');
                return false;
            }
            else{
                return true;
            }
        },

        //a két jelszó mezőben megadott érték egyezését vizsgáló metódus, nem egyezőség esetén hibaüzenet
        validatePassword: function(e){
            let messages = [];
            const errorElement = document.getElementById('errorpassword');
            errorElement.innerText = messages.join(', ');
            const input = UICtrl.getItemInput();
            console.log(input.password);
            console.log(input.scndPassword);
            if(input.password === input.scndPassword){
                return true;
            }
            else{
                messages.push('A két jelszó nem egyezik!');
                e.preventDefault();
                errorElement.innerText = messages.join(', ');
                return false;
            }
        },
    }
})(UICtrl, UserCtrl);