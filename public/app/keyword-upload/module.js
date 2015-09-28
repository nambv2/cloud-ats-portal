define([
  'angular',
  'angular-couch-potato',
  'angular-ui-router',
  'angular-x-editable'
], function(ng, couchPotato) {

  'use strict';

  var module = ng.module('app.keyword-upload', ['ui.router', 'xeditable']);

  module.config(function($stateProvider, $couchPotatoProvider) {
    $stateProvider
    .state('app.keyword-upload', {
      url: '/project/keyword-upload/:id',
      views: {
        "content@app": {
          templateUrl: 'app/keyword-upload/views/overview.html',
          controller: 'OverviewUploadCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'keyword-upload/controllers/overview-upload-controller',
              'keyword-upload/directives/tabs-header',
              'services/event-service'
            ])
          }
        }
      },
      data: {
        title: 'Keyword Project Details',
        requireLogin: true
      }
    }).state('app.keyword-upload.execution', {
      url: '/execution',
      views: {
        'content@app': {
          templateUrl: 'app/keyword-upload/views/execution.html',
          controller: 'ExecutionUploadCtrl',
          resolve: {
            deps: $couchPotatoProvider.resolveDependencies([
              'keyword-upload/controllers/execution-controller',
              'keyword-upload/directives/tabs-header',
              'services/keyword-upload-service'
            ])
          }
        }
      }
    }).state('app.keyword-upload.report', {
        url: '/report/:jobId',
        views: {
          "content@app": {
            templateUrl: 'app/keyword-upload/views/report.tpl.html',
            controller: 'KeywordUploadReportCtrl',
            resolve: {
              deps: $couchPotatoProvider.resolveDependencies([
                'keyword-upload/controllers/keyword-upload-report-controller',
                'keyword-upload/directives/tabs-header',
                'services/keyword-upload-service',
                'keyword/directives/functional-report'
              ])}
          }
        },
        data: {
          title: 'Keyword Report',
          requireLogin: true
        }
      });
    
  });

  couchPotato.configureApp(module);

  module.run(function($couchPotato, editableOptions, editableThemes) {
    module.lazy = $couchPotato;
  });

  return module;
})