	
angular.module('app')
.controller('signup', ($scope, $http,$location) => {
      $scope.position;
      console.log('hiiiii')
      $scope.errorMessage;
      $scope.location=function(){
        var x=document.getElementById('map')
        
        console.log('hiiii')
        map = new google.maps.Map(x, {
          center: {lat: -34.397, lng: 150.644},
          zoom: 11
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            $scope.position=pos;
            console.log($scope.position)
            alert('your location added')
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        console.log(x)
        console.log($scope.position)
        
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
	    $scope.image = document.getElementById('image').onchange = function(evt){
        var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
        if(FileReader && files && files.length){
          var fr = new FileReader();
          fr.onload = function(){
                $scope.image.src =  fr.result;
          };
          fr.readAsDataURL(files[0]);

        }
      };
      $scope.image2 = document.getElementById('image2').onchange = function(evt){
        var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
        if(FileReader && files && files.length){
          var fr = new FileReader();
          fr.onload = function(){
                $scope.image2.src =  fr.result;
          };
          fr.readAsDataURL(files[0]);

        }
      };
    $scope.patient=function(){
    	console.log('hiiiii')
		
      console.log("==============", $scope.image.src)
		var username=document.getElementById('name2').value;
		var password=document.getElementById('password2').value;
        var phone=document.getElementById('phone2').value
        
        $http.post("/patient", {username: username, password: password, phoneNumber:phone,myImage:$scope.image2.src}).then(function(data){
            console.log(data)
            console.log("==========")
            console.log(data.data)
            if (data.data === "user name is already taken"){
            $scope.errorMessage = data.data
            console.log($scope.errorMessage)
          } else {window.location = "#/login"}
        });

	// 	$.ajax({
    //     url: '/patient',
    //     method: 'POST',
    //     async: false,
    //     data: {
    //         username:username,
    //         password:password,
    //         phoneNumber:phone,
    //         myImage:$scope.image2.src
    //     },
    //     success: () => {
    //         console.log('sent')
    //         $location.path('login');
    //     }
    // })
	}
	$scope.signup=function(){
		console.log('hiiiii')
		var username=document.getElementById('name').value;
		var password=document.getElementById('password').value;
		var phone=document.getElementById('phone').value
    var specilization=document.getElementById('specilization').value
    var location=$scope.position
        
        $http.post("/signup", {username: username, password: password, phoneNumber:phone, specilization:specilization,image:$scope.image.src,location:location}).then(function(data){
            console.log(data)
            console.log("==========")
            console.log(data.data)
            if (data.data === "user name is already taken"){
            $scope.errorMessage = data.data
            console.log($scope.errorMessage)
          } else {window.location = "#/login"}
        });

	// 	$.ajax({
    //     url: '/signup',
    //     method: 'POST',
    //     async: false,
    //     data: {
    //         username:username,
    //         password:password,
    //         phoneNumber:phone,
    //         specilization:specilization,
    //         image:$scope.image.src
    //     },
    //     success: () => {
    //         console.log('sent')
    //         $location.path('login');
    //     }
    // })
	}

})
.component('signup',{
	controller:"signup",
  templateUrl:`./views/signup.html`
})
