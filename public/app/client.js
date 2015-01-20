'use strict';

(function() {
  var notesApp = angular.module('notesApp', []);
  notesApp.controller('notesController', function($scope, $http) {
    $scope.greeting = 'BITCHES!!!';
    $http({
      method: 'GET',
      url: '/notes'
    })
    .error(function(data) {
      console.log(data);
    })
    .success(function(data) {
      console.log(data);
      $scope.notes = data
    });

    $scope.saveNewNote = function() {
      $http({
        method: 'POST',
        url: '/notes',
        data: $scope.newNote
      })

      .success(function(data) {
        $scope.notes.push(data);
        $scope.newNote = null;
      });
    };

    $scope.deleteNote = function(note) {
      $http({
        method: 'DELETE',
        url: '/notes/' + note._id
      })
      .success(function() {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
      });
    };
  });
})();
