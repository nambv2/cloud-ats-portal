define(['app'], function(app) {
  'use strict';

  app.factory('DataService', ['$http', '$q', '$cookies', '$rootScope', '$window', '$state',
    function($http, $q, $cookies, $rootScope, $window, $state){
      return {
        create: function(name, dataset, caseId, callback) {
          var request = {
            method: 'POST',
            url: appConfig.RestEntry + '/api/v1/data',
            headers: {
              'X-AUTH-TOKEN': $cookies.get('authToken'),
              'X-SPACE': $cookies.get('space'),
            },
            data: {
              name: name,
              dataset: dataset,
              caseId: caseId
            }
          };

          $http(request).success(function(data, status) {
            callback(data, status);
          }). error(function(data, status) {
            callback(data, status);
          })
        },
        update: function(name, dataset, id, callback) {
          var request = {
            method: 'PUT',
            url: appConfig.RestEntry + '/api/v1/data',
            headers: {
              'X-AUTH-TOKEN': $cookies.get('authToken'),
              'X-SPACE': $cookies.get('space'),
            },
            data: {
              name: name,
              dataset: dataset,
              id: id
            }
          };

          $http(request).success(function(data, status) {
            callback(data, status);
          }). error(function(data, status) {
            callback(data, status);
          })
        },
        list: function(tenant, space) {
          var dfd = $q.defer();

          var request = {
            method: 'GET',
            url: appConfig.RestEntry + '/api/v1/data/list/' + tenant + '/' + space,
            headers: {
              'X-AUTH-TOKEN': $cookies.get('authToken')
            }
          };

          $http(request)
          .success(function(response) {
            dfd.resolve(response);
          })
          .error(function(data, status) {
            switch (status) {
              case 403:
                $state.go('403');
                break;
              case 401:
                $state.go('401');
                break;
            }
            dfd.reject;
          });

          return dfd.promise;
        },

        dataSet: function (id) {

          var dfd = $q.defer();

          var request = {
            method: 'GET',
            url: appConfig.RestEntry + '/api/v1/data/dataSet/' + id,

            headers: {
              'X-AUTH-TOKEN': $cookies.get('authToken')
            }
          };

          $http(request)
          .success(function(response) {
            dfd.resolve(response);
          })
          .error(function (data, status) {
            switch (status) {
              case 403:
                $state.go('403');
                break;
              case 401:
                $state.go('401');
                break;
            }
            dfd.reject;
          });
          return dfd.promise;
        },

        deleteDataSetById: function (id, callback) {
          var request = {
            method: 'DELETE',
            url: appConfig.RestEntry + '/api/v1/data/delete/' + id,

            headers: {
              'X-AUTH-TOKEN' : $cookies.get('authToken')
            }
          };

          $http(request).success(function (response) {
            callback(response);
          }).error(function (data, status) {
            switch (status) {
              case 403:
                $state.go('403');
                break;
              case 401:
                $state.go('401');
                break;
            }
          });
        }/*, 

        update: function (id, name, dataset, callback) {
          console.log(dataset);
          var request = {
            method: 'PUT',
            url: appConfig.RestEntry + '/api/v1/data/update',
            headers: {
              'X-AUTH-TOKEN': $cookies.get('authToken')
            },
            data: {
              id: id,
              name: name,
              dataset: dataset
            }
          };

          $http(request).success(function (response) {
            callback(response);
          }).error(function (data, status) {
            switch(status) {
              case 403:
                $state.go('403');
                break;
              case 401:
                $state.go('401');
                break;
            }
          });
        }*/
      }
  }]);
})