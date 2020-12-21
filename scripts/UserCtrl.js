import {StorageCtrl} from './StorageCtrl.js';

//A User objektum és a data konstans struktúrája és metódusai
export const UserCtrl = (function(){
    const User = function(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    const testing = StorageCtrl.getUsersFromStorage('http://localhost:3000/users');

    const data = {
        items: testing,
        currentItem: null,
    }

    return{
        //a data-ban szereplő elemek gettere
        getItems: function(){
            return data.items;
        },

        //új user data.items-hez való adása
        addItem: function(lastName, firstName, email, password){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } 
            else{
                ID = 0;
            }
            let newUser = new User(ID, firstName, lastName, email, password);
           /* data.items.push(newUser);*/
            return newUser;
        },

        //az adott user megkeresése id alapján
        getItemById: async function(id){
            let found = null;
            await data.items
                .then(data => data.forEach(function(item){
              if(item.id === id){
                found = item;
              }
            }));
            return found;
        },

        //items-ben szereplő user frissítése
        updateUser: async function(lastName, firstName, email, password){
            let found = null;
            await data.items
            .then(data => data.forEach(function(item){
                if(item.id === UserCtrl.getCurrentItem().id){
                  item.lastName = lastName;
                  item.firstName = firstName;
                  item.email = email;
                  item.password = password;
                  found = item;
                }
              }));
            return found;
        },

        //items-ben szereplő user törlése id alapján
        deleteUser: function(id){
            const ids = data.items.map(function(item){
              return item.id;
            });
            const index = ids.indexOf(id);
            data.items.splice(index, 1);
        },

        //az aktuálisan kiválszott user settere
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        //az aktuálisan kiválszott user gettere
        getCurrentItem: function(){
            return data.currentItem;
        },
    }
})();