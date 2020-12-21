//a json szerver metódusai
export const StorageCtrl = (function(){
    return{
        //új user tárolása a szerveren
        storeUser: async function(url, data){
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          console.log("első");
          const resData = await response.json();
          return resData;
        },

        //az összes user lekéredezése és visszaadása a szerverről
        getUsersFromStorage: async function(url){
          const response = await fetch(url);
          const resData = await response.json();
          return resData;
        },

        //az adott user frissített adatinak tárolása
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

        //user törlése a szerverről
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

