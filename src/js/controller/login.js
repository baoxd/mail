define(function(require) {
    'use strict';

    var appController = require('js/app-controller');

    var LoginCtrl = function($scope, $location) {

        // start the main app controller
        appController.start(function(err) {
            if (err) {
                console.error(err);
                return;
            }

            if (window.chrome && chrome.identity) {
                login('passphrase', onLogin);
                return;
            }

            onLogin();
        });

        function login(password, callback) {
            // get OAuth token from chrome
            appController.fetchOAuthToken(password, function(err) {
                if (err) {
                    console.error(err);
                    return;
                }

                // login to imap backend
                appController._emailDao.imapLogin(function(err) {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    callback();
                });
            });
        }

        function onLogin() {
            $location.path('/desktop');
            $scope.$apply();
        }
    };

    return LoginCtrl;
});