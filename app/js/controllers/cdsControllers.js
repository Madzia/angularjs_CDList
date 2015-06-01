'use strict';

var cdsControllers = angular.module('cdsControllers', []);

cdsControllers.controller('cdsCtrl',
  ['$scope', '$routeParams', '$location', 'DataService', 'oninit',
  function( $scope, $routeParams, $location, DataService, oninit ) {
    $scope.query = "";
    $scope.orderProp = "-id";

    oninit($scope, function ()  {
        var user;
        if( isNaN(parseInt($routeParams.userId)) ){
          user = DataService.findUsers( { 'login': $routeParams.userId } );
        }
        else{
          user = DataService.findUsers( { 'id': parseInt( $routeParams.userId ) } );
        }
        var cat = DataService.findCategories( { 'id': parseInt( $routeParams.categoryId ) } );
        if(user.length > 0){
          $scope.user = {
            'id': user[0].id,
            'login': user[0].login
          };
        }
        if(cat.length > 0){
          $scope.category = {
            'id': cat[0].id,
            'owner': cat[0].owner,
            'name': cat[0].name
          };
        }
      });

}]).
controller('addCdCtrl',
  ['$scope', '$routeParams', '$location', 'DataService', 'oninit',
  function( $scope, $routeParams, $location, DataService, oninit ) {
    $scope.addCdFailed = false;
    $scope.addedCd = {
      'name': "",
      'url': ""
    }

    oninit($scope, function () {
        var cat = DataService.findCategories( { 'id': parseInt( $routeParams.categoryId ) } );
        if(cat.length > 0){
          $scope.category = {
            'id': cat[0].id,
            'owner': cat[0].owner,
            'name': cat[0].name
          };
        }
      });

    $scope.addCd = function ( cd ) {
      cd.category = $scope.category.id;
      DataService.addCd( cd ).
        success( function () {
          $scope.addCdFailed = false;
          $location.path( '/user/' + $scope.currentUser + '/category/' + $scope.category.id );
        }).
        error( function ( err, errType ) {
          if( errType.alreadyExists ) {
            $scope.addCdFailed = true;
          }
        });
    }

}]).
controller('editCdCtrl',
  ['$scope', '$routeParams', '$location', 'DataService', 'oninit',
  function( $scope, $routeParams, $location, DataService, oninit ) {
    $scope.editCdFailed = false;
    $scope.editedCd = {
      'name': "",
      'url': ""
    }

    oninit($scope, function () {
        var book = DataService.findCds( { 'id': parseInt( $routeParams.cdId ) } );
        if(book.length > 0){
          $scope.editedCd = {
            'id': book[0].id,
            'owner': book[0].owner,
            'category': book[0].category,
            'name': book[0].name,
            'url': book[0].url
          };
        }
      });

    $scope.editCd = function ( cd ) {
      DataService.editCd( cd ).
        success( function () {
          $scope.editCdFailed = false;
          $location.path( '/user/' + $scope.currentUser + '/category/' + cd.category );
        }).
        error( function ( err, errType ) {
          if( errType.alreadyExists ) {
            $scope.editCdFailed = true;
          }
          else if( errType.notExists ) {
            $location.path( '/user/' + $scope.currentUser + '/category/' + cd.category );
          }
        });
    }

}]).
controller('rmCdCtrl',
  ['$scope', '$routeParams', '$location', 'DataService', 'oninit',
  function( $scope, $routeParams, $location, DataService, oninit ) {
    $scope.rmedCd = {
      'name': "",
      'url': ""
    }

    oninit($scope, function () {
        var book = DataService.findCds( { 'id': parseInt( $routeParams.cdId ) } );
        if(book.length > 0){
          $scope.rmedCd = {
            'id': book[0].id,
            'owner': book[0].owner,
            'category': book[0].category,
            'name': book[0].name,
            'url': book[0].url
          };
        }
      });

    $scope.rmCd = function ( cd ) {
        DataService.rmCd( cd ).
        success( function () {
          $location.path( '/user/' + $scope.currentUser + '/category/' + cd.category );
        }).
        error( function ( err, errType ) {
          if( errType.notExists ) {
            $location.path( '/user/' + $scope.currentUser + '/category/' + cd.category );
          }
        });
    }

}]);
