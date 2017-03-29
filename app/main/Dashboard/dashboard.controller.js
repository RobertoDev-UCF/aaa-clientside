(function() {

    angular
        .module(angularModuleName)
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ['$http', '$state'];

        function DashboardController($http, $state) {
            var vm = this;

            activate();

            function activate() {  }
            
        }        
})();