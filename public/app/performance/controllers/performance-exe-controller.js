define(['performance/module', 'lodash', 'morris', 'notification'], function (module, _) {
  
  'use strict';
   
  module.registerController('PerformanceExeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$compile', '$templateRequest', 'ScriptService', 'PerformanceService', function($scope, $rootScope, $state, $stateParams, $compile, $templateRequest, ScriptService, PerformanceService) {
   
    $scope.searchTerms = '';

    $scope.samplerReport = true; 
 		$scope.projectId = $stateParams.id;
    var selected = [];
 		$scope.title = "EXECUTION";

    ScriptService.list($scope.projectId, function(response) {
      $scope.scripts = response;
      $scope.totalScripts = response.totalScripts;
    });

    PerformanceService.get($scope.projectId, function (response) {
      $scope.project = response;
      checkProjectStatus();
    });

    var checkProjectStatus = function() {
        if ($scope.project.status == 'RUNNING') {
          $.SmartMessageBox({
            title: $rootScope.getWord("Project Execution Alert!"),
            content: $rootScope.getWord("Your project has been already running. Please back to overivew tab to track project progress"),
            buttons: $rootScope.getWord('[Go to overview]')
          }, function (ButtonPressed) {
            if (ButtonPressed === "Go to overview" || ButtonPressed === "概要に戻ります") {
              $state.go('app.performance', {id: $scope.projectId});
            }
          });
          return false;
        }

        return true;
    }
    // handle when user selects scripts
    $scope.selectScript = function (scriptId) {
      var $btnRun = $('.btn.btn-primary.btn-performance-run');
      if (_.indexOf(selected, scriptId) != -1) {
          _.remove(selected, function(sel) {
            return sel == scriptId;
          });
        } else {
          selected.push(scriptId);
        }

      if (selected.length > 0) $btnRun.removeClass('disabled');
      else $btnRun.addClass('disabled');
    }

    //run project with projectid and list scripts
    $scope.runPerformanceTest = function () {

      if (checkProjectStatus())
      PerformanceService.run($stateParams.id, selected, function(data, status) {
        switch (status) {
          case 200:
              $.smallBox({
                title: $rootScope.getWord('Notification'),
                content: $rootScope.getWord('You have submitted project job'),
                color: '#296191',
                iconSmall: 'fa fa-check bounce animated',
                timeout: 3000
              });
              break;
            case 204:
              $.smallBox({
                title: $rootScope.getWord('Notification'),
                content: $rootScope.getWord('Your project has been already running'),
                color: '#296191',
                iconSmall: 'fa fa-check bounce animated',
                timeout: 3000
              });
              break;
            default:
              $.smallBox({
                title: $rootScope.getWord('Notification'),
                content: $rootScope.getWord('Can not submit your project job'),
                color: '#c26565',
                iconSmall: 'fa fa-ban bounce animated',
                timeout: 3000
              });

        }
        $state.go('app.performance', {id : $scope.projectId});
      });
    }

  }]);
});