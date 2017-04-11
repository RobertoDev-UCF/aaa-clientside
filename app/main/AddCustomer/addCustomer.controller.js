(function () {

    angular
        .module(angularModuleName)
        .controller('AddCustomerController', AddCustomerController);

    AddCustomerController.$inject = ['$http', '$state'];

    function AddCustomerController($http, $state) {
        var vm = this;
 
        vm.AddCustomer = AddCustomer;

        function AddCustomer() {

            var promise = $http({
                    method: 'POST',
                    url: "http://localhost:3050/InsertCustomer",
                    data: vm.Customer
                });

                promise.then(function(result) {
                    sessionStorage.setItem('customerPhoneNumber', null);
                    $state.go('appLayout.searchMember');
                }).catch(function(err) {
                    console.log(err);
                });
        }

        function getPhoneNumber() {
            return sessionStorage.getItem('customerPhoneNumber');
        }

        activate();

        function activate() { 
            vm.Customer = {p_phone: getPhoneNumber(), p_alert_sms: false, p_alert_email: false}; 
        }
            
    }
})();