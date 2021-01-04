import {UICtrl} from './uictrl.js';
import {UserCtrl} from './userctrl.js';


//the methods responsible for user input validation
export const ValidationCtrl = (function(UICtrl, UserCtrl){
    return{
        //validating the email format, invalid email causes error message
        validateEmail: function(e, input){
            let messages = [];
            const errorElement = document.getElementById('erroremail');
            errorElement.innerText = messages.join(', ');
            const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

            if(!re.test(input.email)){
                messages.push('Helytelenül megadott e-mail cím!');
                e.preventDefault();
                errorElement.innerText = messages.join(', ');
                console.log("false");
                return false; 
            }
            else{
                return true;
            }

        },

        //checking if the given email is unique, if not, the user getting an error message
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

        //checking if the 'jelszó' and 'jelszó megerősítése' fields constains the same string, otherwise the user getting error message
        validatePassword: function(e){
            let messages = [];
            const errorElement = document.getElementById('errorpassword');
            errorElement.innerText = messages.join(', ');
            const input = UICtrl.getItemInput();
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