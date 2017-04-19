

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
			vm.EditCustomer = EditCustomer;
			vm.SelectSearchOption = SelectSearchOption;
            vm.KeyUpPhoneNumberSearch = KeyUpPhoneNumberSearch;
            vm.KeyUpMemberIdSearch = KeyUpMemberIdSearch;
            vm.BackToSearchOptions = BackToSearchOptions; 

            function BackToSearchOptions() {
                vm.ShowSearchOptions = true;
                vm.InputMemberId = "";
                vm.InputMemberNumber = ""; 
                vm.MemberResults = null;
            }


            function KeyUpMemberIdSearch() {
                var id = vm.SMemberId;
                if(!id || id.length < 16) return;
                SearchByMemberId();
            }

            function KeyUpPhoneNumberSearch() {
                var p = vm.InputMemberNumber;
                if(!p || p.length < 9) return;
                SearchForMember();
            }

            function SelectSearchOption(name) {
                vm.ShowSearchOptions = false;
                vm.SPhoneNumber = false;
                vm.SMemberId = false;
                vm[name] = true;
            }

			function EditCustomer(member) {
				sessionStorage.setItem('customerId', member.customer_id);
				sessionStorage.setItem('firstName', member.first_name);
				sessionStorage.setItem('lastName', member.last_name);
				sessionStorage.setItem('customerPhoneNumber', member.phone);
				sessionStorage.setItem('email', member.email);
				sessionStorage.setItem('address', member.address);
				sessionStorage.setItem('city', member.city);
				sessionStorage.setItem('state', member.state);
				sessionStorage.setItem('postalCode', member.postal_code);
				sessionStorage.setItem('emailAlert', member.alert_email);
				sessionStorage.setItem('smsAlert', member.alert_sms);
				$state.go('appLayout.editCustomer');
			}

            function AddCustomerToQueue(customer) {
                sessionStorage.setItem("customer", JSON.stringify(customer));
                sessionStorage.setItem('customerId', customer.customer_id);
                sessionStorage.setItem('fullName', customer.first_name + " " + customer.last_name);
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

            function activate() {
                vm.ShowSearchOptions = true;
             }
            // change here
            
        }        
})();
