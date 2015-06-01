'use strict';

/* App Module */

var App = angular.module('App', [
  'ngRoute',
  'appControllers',
  'categoriesControllers',
  'cdsControllers',
  'appFilters',
  'appServices',
  'appDataServices'
]);

App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/index', {
        templateUrl: 'partials/index.html',
        controller: 'indexCtrl'
      }).
      when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'signupCtrl'
      }).
      // categories
      when('/user/:userId', {
        templateUrl: 'partials/category/categories.html',
        controller: 'categoriesCtrl'
      }).
      when('/addcategory', {
        templateUrl: 'partials/category/addcategory.html',
        controller: 'addCategoryCtrl'
      }).
      when('/editcategory/:categoryId', {
        templateUrl: 'partials/category/editcategory.html',
        controller: 'editCategoryCtrl'
      }).
      when('/rmcategory/:categoryId', {
        templateUrl: 'partials/category/rmcategory.html',
        controller: 'rmCategoryCtrl'
      }).
      // cds
      when('/user/:userId/category/:categoryId', {
        templateUrl: 'partials/cd/cds.html',
        controller: 'cdsCtrl'
      }).
      when('/addcd/:categoryId', {
        templateUrl: 'partials/cd/addcd.html',
        controller: 'addCdCtrl'
      }).
      when('/editcd/:cdId', {
        templateUrl: 'partials/cd/editcd.html',
        controller: 'editCdCtrl'
      }).
      when('/rmcd/:cdId', {
        templateUrl: 'partials/cd/rmcd.html',
        controller: 'rmCdCtrl'
      }).
      // ---
      otherwise({
        redirectTo: '/index'
      });
  }]);
