'use strict';

var listsControllers = angular.module('listsControllers', []);

listsControllers.controller('addListCtrl',
  ['$scope', '$location', 'DataService',
  function( $scope, $location, DataService ) {
    $scope.addListFailed = false;
    $scope.addedList = {
      "name": ""
    };
    //add list
    $scope.addList = function ( list ) {
      DataService.addList( list ).
        success( function () {
          $scope.addListFailed = false;
          $location.path( '/user/' + $scope.currentUser );
        }).
        error( function ( err, errType ) {
          if( errType.alreadyExists ) {
            $scope.addListFailed = true;
          }
        });
    };

}]).
controller('editListCtrl',
  ['$scope', '$location', '$routeParams', 'DataService', 'oninit',
  function( $scope, $location, $routeParams, DataService, oninit ) {
    console.log($scope.currentUser);
    $scope.editListFailed = false;
    $scope.editedList = {
      "name": ""
    };

    oninit($scope, function () {
        var id = parseInt($routeParams.listId);
        var cat = DataService.findLists( { 'id': id } );
        if(cat.length > 0){
          $scope.editedList = {
            'id': cat[0].id,
            'owner': cat[0].owner,
            'name': cat[0].name
          };
        }
      });

    //edit list
    $scope.editList = function ( list ) {
      DataService.editList( list ).
        success( function () {
          $scope.editListFailed = false;
          $location.path( '/user/' + $scope.currentUser );
        }).
        error( function ( err, errType ) {
          if( errType.alreadyExists ) {
            $scope.editListFailed = true;
          }
          else if( errType.notExists ) {
            $location.path( '/user/' + $scope.currentUser );
          }
      });
    };

}]).
controller('rmListCtrl',
  ['$scope', '$location', '$routeParams', 'DataService', 'oninit',
  function( $scope, $location, $routeParams, DataService, oninit ) {
    console.log($scope.currentUser);
    $scope.rmedList = {
      "name": ""
    };

    oninit($scope, function () {
        var id = parseInt($routeParams.listId);
        var cat = DataService.findLists( { 'id': id } );
        if(cat.length > 0){
          $scope.rmedList = {
            'id': cat[0].id,
            'owner': cat[0].owner,
            'name': cat[0].name
          };

        }
      });

    //edit list
    $scope.rmList = function ( list ) {
      DataService.rmList( list ).
        success( function () {
          $location.path( '/user/' + $scope.currentUser );
        }).
        error( function ( err, errType ) {
          if( errType.notExists ) {
            $location.path( '/user/' + $scope.currentUser );
          }
        });
    };

}]).
controller('listsCtrl',
  ['$scope', '$routeParams', '$location', 'DataService', 'oninit',
  function( $scope, $routeParams, $location, DataService, oninit ) {
    $scope.query = "";
    $scope.orderProp = "-id";

    oninit($scope, function () {
        var user;
        if( isNaN(parseInt($routeParams.userId)) ){
          user = DataService.findUsers( { 'login': $routeParams.userId } );
        }
        else{
          user = DataService.findUsers( { 'id': parseInt( $routeParams.userId ) } );
        }
        if(user.length > 0){
          $scope.user = { 'id': user[0].id, 'login': user[0].login };
        }
      });
}]);
