myApp.factory('Authentication', ['$rootScope','$location','$firebaseAuth','$firebaseObject','FIREBASE_URL', 
	function ($rootScope, $location, $firebaseAuth, $firebaseObject, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function (authUser){
		if(authUser){
			var userRef = new Firebase(FIREBASE_URL+'users/'+authUser.uid);
			var userObj = new $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		} else {
			$rootScope.currentUser = '';
		}
		console.log($rootScope.currentUser);
	});

	var myObj = {
		login: function (user){
			console.log(user);
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			})
			.then(function (response){
				console.log(response);
				$location.path('/meetings')
			})
			.catch(function (error){
				console.log(error);
				$rootScope.message = 'Oops '+ error.message;
			});
		},
		logout: function (){
			return auth.$unauth();
		},
		requireAuth: function (){
			return auth.$requireAuth();
		},
		register: function (user){
			auth.$createUser({
				email: user.email,
				password: user.password
			})
			.then(function(regUser){
				console.log(regUser);
				var regRef = new Firebase(FIREBASE_URL+'users')
					.child(regUser.uid).set({
						date: Firebase.ServerValue.TIMESTAMP,
						regUser: regUser.uid,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
					});
					myObj.login(user);
			})
			.catch(function (error){
				console.log(error);
				$rootScope.message = 'Oops '+ error.message;
			});
		}
	};
	return myObj;

}]);