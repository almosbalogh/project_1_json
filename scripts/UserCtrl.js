import {StorageCtrl} from './storagectrl.js';

//the User object and data constant 
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
        //the getters of the elements in data
        getItems: function(){
            return data.items;
        },

        //adding new user to data.items
        addItem: function(lastName, firstName, email, password){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } 
            else{
                ID = 0;
            }
            let newUser = new User(ID, firstName, lastName, email, password);
            return newUser;
        },

        //searching a user by id
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

        //updating the user in data.items
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

        //deleting a user from data.items by id
        deleteUser: function(id){
            const ids = data.items.map(function(item){
              return item.id;
            });
            const index = ids.indexOf(id);
            data.items.splice(index, 1);
        },

        //the setter of the choosen user
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        //the getter of the choosen user
        getCurrentItem: function(){
            return data.currentItem;
        },
    }
})();