var myApp= angular.module('classrooomApp',['ngRoute','ngResource','ui.bootstrap','dialogs']);
	myApp.config(['$routeProvider',
	  function ($routeProvider) {
	        $routeProvider.
	        when('/course/:param',{
	        
                templateUrl: "/sprinklr/resources/static/views/courses.html",
                controller: 'courseController'
            }
            )
            .when('/lesson/:courseid/:lessonid',{
                templateUrl: '/sprinklr/resources/static/views/lessonadd.html',
                controller: 'lessonAddController'
            })
            .when('/',{
                templateUrl: '/sprinklr/resources/static/views/home.html',
                controller: 'homeController'
            })
            .otherwise(
                { redirectTo: '/'}
            );
	  }]);

myApp.config(function($sceDelegateProvider) {
		  $sceDelegateProvider.resourceUrlWhitelist([
		    'self',
		    'https://www.youtube.com/**'
		  ]);
});	
	