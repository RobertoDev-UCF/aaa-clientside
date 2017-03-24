(function() {

    angular
        .module(angularModuleName)
        .controller("SearchMemberController", SearchMemberController);

        SearchMemberController.$inject = ['$http', '$state'];

        function SearchMemberController($http, $state) {
            var vm = this;

            vm.SearchForMember = SearchForMember;
			vm.SearchForMemberId = SearchForMemberId;
            vm.AddCustomer = AddCustomer;

            function AddCustomer() {
                $state.go('appLayout.addCustomer');
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
            
			function SearchForMemberId() {
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
                return vm.InputMemberIdNumber;
            }
			
            function setMemberResults(value) {
                vm.MemberResults = value;
            }

            activate();

            function activate() {  }
            
        }        
})();