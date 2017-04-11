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

            var promise = $http({
                url: 'http://localhost:3050/InsertCustomerToQueue',
                method: 'POST',
                data: {p_customer_id: getCustomerId(), p_service_id: vm.ServiceType, p_note: vm.Notes}
            });
            
            promise.then(function(data) {
                clearCustomerIdFromStorage();
                $state.go('appLayout.getQueue');
            }).catch(function() {
                alert('Member/Customer exists in the queue');
            });
        }

        function getServiceTypes() {
            return $http({
                url: 'http://localhost:3050/GetServiceTypes',
                method: 'GET'
            });
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
            vm.CustomerName = getCustomerName();
            getServiceTypes().then(function(data) {
                vm.ServiceTypes = (data) ? data.data : [];
            }).catch(function(err) {  
                alert(err);
            });    

            getCustomerId();      
        }
            
    }
})();