var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
	.constant('FIREBASE_URL', 'https://dmang.firebaseio.com/');

myApp.run(['$rootScope', '$location', function ($rootScope, $location){
	$rootScope.$on('$routeChangeError', function (event, next, prev, error){
		if(error=='AUTH_REQUIRED'){
			$rootScope.message = 'Sorry you must login to access this page.';
			$location.path('/login');
		}
	});
}]);

myApp.config(['$routeProvider', function ($routeProdiver){
	$routeProdiver
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'			
		})
		.when('/checkins/:uId/:mId', {
			templateUrl: 'views/checkins.html',
			controller: 'CheckInsController'			
		})
		.when('/checkins/:uId/:mId/checkinsList', {
			templateUrl: 'views/checkinslist.html',
			controller: 'CheckInsController'			
		})
		.when('/meetings', {
			templateUrl: 'views/meetings.html',
			controller: 'MeetingsController',
			resolve: {
				currentAuth: function (Authentication){
					return Authentication.requireAuth();
				}
			} 			
		})
		.otherwise({
			redirectTo: '/login'
		});
}]);