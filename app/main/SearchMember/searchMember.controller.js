(function() {

    angular
        .module(angularModuleName)
        .controller("SearchMemberController", SearchMemberController);

        SearchMemberController.$inject = ['$http', '$state'];

        function SearchMemberController($http, $state) {
            var vm = this;

            vm.SearchForMember = SearchForMember;
			vm.SearchByMemberId = SearchByMemberId;
            vm.AddCustomer = AddCustomer;
			vm.GetQueue = GetQueue;
            vm.AddCustomerToQueue = AddCustomerToQueue;

            function AddCustomerToQueue(member) {
                sessionStorage.setItem('customerId', member.customer_id);
                sessionStorage.setItem('fullName', member.first_name + " " + member.last_name);
                $state.go('appLayout.addCustomerToQueue');
            }

            function AddCustomer() {
                sessionStorage.setItem('customerPhoneNumber', vm.InputMemberNumber);
                $state.go('appLayout.addCustomer');
            }
			
			function GetQueue() {
				$state.go('appLayout.getQueue');
			}

            function SearchForMember() {
                if(!getMemberNumber() || getMemberNumber().length < 9) return;

                var promise = $http({
                    method: 'POST',
                    url: "http://localhost:3050/GetCustomerByPhoneNumber",
                    data: { phone: getMemberNumber() }
                });

                promise.then(function(result) {
                    console.log(result);
                    setMemberResults(result.data);
                }).catch(function(err) {
                    console.log(err);
                    setMemberResults([]);
                });
            }
            
			function SearchByMemberId() {
                if(!getMemberId() || getMemberId().length < 16) return;

                var promise = $http({
                    method: 'POST',
                    url: "http://localhost:3050/GetCustomerByID",
                    data: { customer_id: getMemberId() }
                });

                promise.then(function(result) {
                    console.log(result);
                    setMemberResults(result.data);
                }).catch(function(err) {
                    console.log(err);
                    setMemberResults([]);
                });
            }
			
            function getMemberNumber() {
                return vm.InputMemberNumber;
            }

			function getMemberId() {
                return vm.InputMemberId;
            }
			
            function setMemberResults(value) {
                vm.MemberResults = value;
            }

            activate();

            function activate() {  }
            // change here
            
        }        
})();