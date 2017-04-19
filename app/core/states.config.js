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
            .state('appLayout.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/main/Dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })
            .state('appLayout.searchMember', {
                url: '/searchMember',
                templateUrl: 'app/main/SearchMember/searchMember.html',
                controller: 'SearchMemberController',
                controllerAs: 'vm'
            })
            .state('appLayout.addCustomer', {
                url: '/addCustomer',
                templateUrl: 'app/main/AddCustomer/addCustomer.html',
                controller: 'AddCustomerController',
                controllerAs: 'vm'
            })
            .state('appLayout.addCustomerToQueue', {
                url: '/addQueue',
                templateUrl: 'app/main/AddCustomerToQueue/addCustomerToQueue.html',
                controller: 'AddCustomerToQueueController',
                controllerAs: 'vm'
            })
			.state('appLayout.getQueue', {
				url: '/getQueue',
				templateUrl: 'app/main/GetQueue/getGQueue.html',
				controller: 'GetQueueController',
				controllerAs: 'vm'
			})
			
			.state('appLayout.editCustomer', {
				url: '/editCustomer',
				templateUrl: 'app/main/EditCustomer/editCustomer.html',
				controller: 'EditCustomerController',
				controllerAs: 'vm'
			})
            .state('appLayout.customerQueue', {
               url:'/customerQueue/:id',
               templateUrl:'app/main/Confirmation/Confirmation.html',
               controller: 'ConfirmationController',
               controllerAs: 'vm'
            });
        }

})();