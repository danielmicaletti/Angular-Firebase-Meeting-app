myApp.controller('CheckInsController', ['$scope', '$rootScope', '$firebaseObject', '$firebaseArray', '$routeParams', '$location', 'FIREBASE_URL', 
	function ($scope, $rootScope, $firebaseObject, $firebaseArray, $routeParams, $location, FIREBASE_URL){
	
		$scope.whichmeeting = $routeParams.mId;
		console.log($scope.whichmeeting);
		$scope.whichuser = $routeParams.uId;

		var ref = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins/');

		var checkinsList = $firebaseArray(ref);
		$scope.checkins = checkinsList;
		console.log($scope.checkins);

		$scope.order = 'firstname';
		$scope.direction = null;
		$scope.query = '';
		$scope.recordId = '';

		$scope.addCheckin = function (){
			var checkinsInfo = $firebaseArray(ref);
			var myData = {
				firstname: $scope.user.firstname,
				lastname: $scope.user.lastname,
				email: $scope.user.email,
				date: Firebase.ServerValue.TIMESTAMP
			};
			checkinsInfo.$add(myData).then(function (){
				$location.path('/checkins/'+$scope.whichuser+'/'+$scope.whichmeeting+'/checkinsList');
			});
		};

		$scope.deleteCheckin = function (id){
			console.log(id);
			var refDel = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins/'+id);
			var record = $firebaseObject(refDel);
			record.$remove(id);
		};

		$scope.pickRandom = function (){
			var whichRecord = Math.round(Math.random()*(checkinsList.length-1));
			$scope.recordId = checkinsList.$keyAt(whichRecord);
		};

		$scope.showLove = function (myCheckin){
			myCheckin.show = !myCheckin.show;

			if(myCheckin.userState === 'expanded'){
				myCheckin.userState = '';
			} else {
				myCheckin.userState = 'expanded';
			}
		};

		$scope.giveLove = function (myCheckin, giftText){
			var refLove = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins/'+myCheckin.$id+'/awards');
			var checkinsArray = $firebaseArray(refLove);

			var myData = {
				name: giftText,
				date: Firebase.ServerValue.TIMESTAMP
			};	

			checkinsArray.$add(myData);		
		};

		$scope.deleteLove = function (checkId, award){
			var refLove = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins/'+checkId+'/awards');
			var record = $firebaseObject(refLove);
			record.$remove(award);

		};
}]);