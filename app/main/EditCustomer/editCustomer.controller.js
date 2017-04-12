(function () {
	
	angular
		.module(angularModuleName)
		.controller('EditCustomerController', EditCustomerController);
		
	EditCustomerController.$inject = ['$http', '$state'];
	
	function EditCustomerController($http, $state) {
		var vm = this;
		
		vm.UpdateCustomer = UpdateCustomer;
		
		function UpdateCustomer() {
			
			var promise = $http({
				method: 'POST',
				url: "http://localhost:3050/UpdatedCustomer",
				data: vm.Customer
			});
			
			promise.then(function(result) {
				clearSessionStorage();
				$state.go('appLayout.searchMember');
			}).catch(function(err) {
				console.log(err);
			});
		}
		
		function clearSessionStorage() {
			sessionStorage.setItem('customerId', null);
			sessionStorage.setItem('customerPhoneNumber', null);
			sessionStorage.setItem('firstName', null);
			sessionStorage.setItem('lastName', null);
			sessionStorage.setItem('email', null);
			sessionStorage.setItem('address', null);
			sessionStorage.setItem('address_2', null);
			sessionStorage.setItem('city', null);
			sessionStorage.setItem('state', null);
			sessionStorage.setItem('postalCode', null);
			sessionStorage.setItem('emailAlert', null);
			sessionStorage.setItem('smsAlert', null);
		}
		
		function getCustomerId() {
			return sessionStorage.getItem('customerId');
		}
		
		function getPhoneNumber() {
			return sessionStorage.getItem('customerPhoneNumber');
		}
		
		function getFirstName() {
			return sessionStorage.getItem('firstName');
		}
		
		function getLastName() {
			return sessionStorage.getItem('lastName');
		}
		
		function getEmail() {
			return sessionStorage.getItem('email');
		}
		
		function getAddress() {
			return sessionStorage.getItem('address');
		}
		
		function getAddress2() {
			return null;
		}
		
		function getCity() {
			return sessionStorage.getItem('city');
		}
		
		function getState() {
			return sessionStorage.getItem('state');
		}
		
		function getPostalCode() {
			return sessionStorage.getItem('postalCode');
		}
		
		function getEmailAlert() {
			if (sessionStorage.getItem('emailAlert') == 1)
				return true;
			else 
				return false;
		}
		
		function getSmsAlert() {
			if (sessionStorage.getItem('smsAlert') == 1)
				return true;
			else
				return false;
		}
		
		activate();
		
		function activate() {
			vm.Customer = {
				p_customer_id: getCustomerId(),
				p_phone: getPhoneNumber(), 
				p_first_name: getFirstName(), 
				p_last_name: getLastName(), 
				p_address: getAddress(),
				p_email: getEmail(), 
				p_state: getState(), 
				p_postal_code: getPostalCode(),
				p_city: getCity(), 
				p_alert_email: getEmailAlert(), 
				p_alert_sms: getSmsAlert()};
		}
	}
})();