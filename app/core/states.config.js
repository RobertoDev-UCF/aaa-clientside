(function() {

    angular
        .module(angularModuleName)
        .config(['$stateProvider', '$urlRouterProvider', ConfigHandler]);

        function ConfigHandler($stateProvider, $urlRouterProvider) {
            
            $stateProvider.state('main', {
                url: '',
                templateUrl: 'app/main/App/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })

            .state('appLayout', {
                url: '/appLayout',
                templateUrl: 'app/main/AppLayout/appLayout.html',
                controller: 'AppLayoutController',
                controllerAs: 'vm'
            })

            .state('appLayout.searchMember', {
                url: '/searchMember',
                templateUrl: 'app/main/SearchMember/searchMember.html',
                controller: 'SearchMemberController',
                controllerAs: 'vm'
            });
        }

})();