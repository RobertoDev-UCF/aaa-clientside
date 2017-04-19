(function () {
	
	angular
		.module(angularModuleName)
		.controller('ConfirmationController', ConfirmationController);
	
	ConfirmationController.$inject = ['$http', '$state', '$stateParams'];
	
	function ConfirmationController($http, $state,$stateParams) {
		var vm = this;
		vm.customerQueue = undefined;
		vm.GetCustomerQueue = getCustomerQueue;
		
		function getCustomerQueue() {
			
			var promise = $http({
				method: 'GET',
				url: "http://localhost:3050/GetQueueByCustomerId/" + getCustomerId()
			});
			
			promise.then(function(result) {
				console.log(result);
				vm.customerQueue = result.data[0];
			}).catch(function(err) {
				console.log(err);
			});
		}

		activate();
	


		/**
		 * Private functions
		 */

		function activate() {
			getCustomerQueue();
		}

		function getCustomerId() {
			var customerId = $stateParams.id;
			return customerId;
		}

	}
})();