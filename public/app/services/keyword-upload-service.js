define(['keyword-upload/module'], function(module) {
  'use strict';

  module.registerFactory('KeywordUploadService', ['$http', '$cookies', function($http, $cookies) {
    return {

      run: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keyword/' + projectId + '/run',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      delete: function (id, callback) {
        var request = {
          method: 'DELETE',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keyword',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: id
        };

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {
          callback(data, status);
        });
      },

      list: function(callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keywords',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      create: function(name, callback) {
        var request = {
          method: 'POST',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keyword',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            name: name
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      get: function(projectId, callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keyword/' + projectId,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      getReport : function(projectId,job_id,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keyword/'+ projectId +'/report/'+ job_id,
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },
      
      getListReport : function(projectId,callback) {
        var request = {
          method: 'GET',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keyword/'+ projectId +'/reports',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          }
        };

        $http(request).success(function(data, status) {
          callback(data, status);
        }).error(function(data, status) {

        });
      },

      upload : function(projectId,file,callback) {
          var formData = new FormData();
          formData.append('file',file);
          var request = {
            method: 'POST',
            url: appConfig.RestEntry + '/api/v1/uploadProject/keyword/'+ projectId + '/upload',
            headers: {
              'X-AUTH-TOKEN': $cookies.get('authToken'),
              'Content-Type': undefined
            },
            data:formData
          }

          $http(request)
          .success(function (data,status) {
            callback(data);
          })
          .error(function(data,status) {
            if(status === 404) {
              var data = {
                error: true,
                message : 'File is not correct fomart. Please upload again!'
              }
              callback(data);
            }
          });
      },
      update: function (id, name, callback) {
        var request = {
          method: 'PUT',
          url: appConfig.RestEntry + '/api/v1/uploadProject/keyword',
          headers: {
            'X-AUTH-TOKEN': $cookies.get('authToken'),
            'X-SPACE': $cookies.get('space')
          },
          data: {
            name: name,
            id: id
          }
        };

        $http(request).success(function (data, status) {
          callback(data, status);
        }).error(function (data, status) {
          callback(data, status);
        });
      },

    }
  }]);
});