//the json server's methods
export const StorageCtrl = (function(){
    return{
        //saving new user on the server
        storeUser: async function(url, data){
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const resData = await response.json();
          return resData;
        },

        //fetching all users
        getUsersFromStorage: async function(url){
          const response = await fetch(url);
          const resData = await response.json();
          return resData;
        },

        //updating user data
        updateUsersStorage: async function(url, data){
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          
          const resData = await response.json();
          return resData;
        },

        //deleting user from the server
        deleteUserFromStorage: async function(url){
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json'
            }
          });
      
          const resData = await 'Resource Deleted...';
          return resData;
    }
  }
})();

