(function () {

    angular
        .module(angularModuleName)
        .controller('AddCustomerController', AddCustomerController);

    AddCustomerController.$inject = ['$http', '$state'];

    function AddCustomerController($http, $state) {
        var vm = this;
 
        vm.AddCustomer = AddCustomer;

        function AddCustomer() {
            vm.Customer.p_alert_email = true;
            vm.Customer.p_alert_sms = true;

            var promise = $http({
                    method: 'POST',
                    url: "http://localhost:3050/InsertCustomer",
                    data: vm.Customer
                });

                promise.then(function(result) {
                    $state.go('appLayout.searchMember');
                }).catch(function(err) {
                    console.log(err);
                });
        }

        activate();

        function activate() { vm.Customer = {}; }
            
    }
})();