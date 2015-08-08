define([

  //services
  'services/data-service',
  'services/user-service',
  'services/authentication-service',
  'services/event-service',

  //layout

  'layout/module',
  
  'layout/directives/smart-include',
  'layout/directives/smart-router-animation-wrap',
  'layout/directives/smart-page-title',
  'layout/directives/smart-device-detect',
  'layout/directives/smart-fast-click',
  'layout/directives/smart-layout',
  'layout/service/smart-css',
  'layout/directives/smart-fit-app-view',
  'layout/directives/href-void',
  'layout/directives/smart-context',

  //dashboard
  'dashboard/module',
  'auth/module',
  'projects/module',
  'keyword/module',
  'performance/module',

], function() {
  'use strict';
});
