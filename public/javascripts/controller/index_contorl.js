 app.controller('item', ['$scope', 'indexFactory', ($scope, indexFactory) => {

    $scope.messages = []


     $scope.init = () => {
         const username = prompt('Ismingizni yozing')
         if (username) {
             initSocket(username)
             
         } else {
             return false
         }
     }



     function initSocket(username) {
         const connectionOption = {
             reconnectionAttemps: 3,
             reconnectionDelay: 600
         }

         indexFactory.connectSocket('http://localhost:3000', connectionOption)
             .then((socket) => {
                 console.log('boglanish amalga oshdi', socket)
                 socket.emit('newUser' ,  {username})
                 socket.on('newUser' , (data) => {
                     
                    const messageData = {
                        type: 0,
                        username: data.username
                    }
                    $scope.messages.push(messageData)
                    $scope.$apply();
                 })
             }).catch((err) => {
                 console.log(err)
             })
     }


 }])