define(['projects/module'], function (module) {
  
  'use strict';

  module.registerController('NewProjectCtrl', ['$scope', '$state', 'KeywordService','SeleniumUploadService', 'PerformanceService', function($scope, $state, KeywordService, SeleniumUploadService, PerformanceService) {

    $scope.type = 'functional';

    $scope.functionalType = 'new';

    var $input =  $('div#createProject input[name="name"]');

    $input.on('keypress', function () {
      $(this).parent().removeClass('has-error');
    });

    $scope.create = function () {

      if (!$scope.name) {
        
        $input.parent().addClass('has-error');
        $input.focus();
      } else {
        $input.parent().removeClass('has-error');

        $('#createProject').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        switch ($scope.type) {
          case 'functional' :
            if($scope.functionalType === "new") {
              KeywordService.create($scope.name, function(projectId) {
                $state.go('app.keyword', { id : projectId });
              });
            } else if($scope.functionalType === "upload"){
              SeleniumUploadService.create($scope.name, function(projectId) {
                $state.go('app.selenium', { id : projectId });
              });
            }
            
            break;
          case 'performance' :
            PerformanceService.create($scope.name, function (response) {
              $state.go('app.performance', {id: response});
            });
            break;
          default:
            break;
        }

      }
    }
  }]);

});