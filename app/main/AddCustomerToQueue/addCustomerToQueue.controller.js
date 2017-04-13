(function () {

    angular
        .module(angularModuleName)
        .controller('AddCustomerToQueueController', AddCustomerToQueueController);

    AddCustomerToQueueController.$inject = ['$http', '$state'];

    function AddCustomerToQueueController($http, $state) {
        var vm = this;

        vm.AddToQueue = AddToQueue;

        function AddToQueue() {
            if(getCustomerId() == "0") {alert('Customerid is not valid'); return;}

            if(!vm.ServiceType) {alert('Service type not selected'); return;}

            var customer = getCustomer();

            var promise = $http({
                url: 'http://localhost:3050/InsertCustomerToQueue',
                method: 'POST',
                data: {
                    p_customer_id: customer.customer_id,
                    p_first_name: customer.first_name,
                    p_last_name: customer.last_name,
                    p_phone: customer.phone,
                    p_service_id: vm.ServiceType,
                    p_note: vm.Notes}
            });
            
            promise.then(function(data) {
                clearCustomerIdFromStorage();
                $state.go('appLayout.getQueue');
            }).catch(function() {
                alert('Customer exists in the queue.');
            });
        }

        function getServiceTypes() {
            return $http({
                url: 'http://localhost:3050/GetServiceTypes',
                method: 'GET'
            });
        }

        function getCustomer() {
            var customer = sessionStorage.getItem("customer");
            return JSON.parse(customer);
        }

        function getCustomerId() {
            return sessionStorage.getItem('customerId');
        }

        function getCustomerName() {
            return sessionStorage.getItem('fullName');
        }

        function clearCustomerIdFromStorage() {
            sessionStorage.setItem('customerId', 0);
            sessionStorage.setItem('fullName', "");
        }

        activate();

        function activate() {
            var customer = getCustomer();
            vm.CustomerName = customer.first_name + " " + customer.last_name;

            getServiceTypes().then(function(data) {
                vm.ServiceTypes = (data) ? data.data : [];
            }).catch(function(err) {  
                alert(err);
            });

            getCustomerId();
        }
            
    }
})();