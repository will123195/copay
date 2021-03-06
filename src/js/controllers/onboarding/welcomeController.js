'use strict';

angular.module('copayApp.controllers').controller('welcomeController', function($scope, $state, $timeout, $ionicConfig, $log, profileService, startupService, storageService) {

  $ionicConfig.views.swipeBackEnabled(false);

  $scope.$parent.$on("$ionicView.afterEnter", function() {
    startupService.ready();
  });

  $scope.goImport = function(code) {
    $state.go('onboarding.import', {
      fromOnboarding: true,
      code: code
    });
  };

  $scope.createProfile = function() {
    $log.debug('Creating profile');
    profileService.createProfile(function(err) {
      if (err) $log.warn(err);
      setProfileCreationTime();
    });
  };

  function setProfileCreationTime() {
    var now = moment().unix() * 1000 + 24 * 60 * 60 * 1000;
    storageService.setProfileCreationTime(now, function() {});
  };

});
