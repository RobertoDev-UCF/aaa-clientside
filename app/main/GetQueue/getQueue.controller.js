(function () {
	
	angular
		.module(angularModuleName)
		.controller('GetQueueController', GetQueueController);
	
	GetQueueController.$inject = ['$http', '$state'];
	
	function GetQueueController($http, $state) {
		var vm = this;
		
		vm.UpdateQueue = UpdateQueue;
		
		function UpdateQueue() {
			var promise = $http({
				method: 'POST',
				url: "http://localhost:3050/GetQueue"
			});
			
			promise.then(function(result) {
				console.log(results);
				setQueueResults(result.data);
			}).catch(function(err) {
				console.log(err);
				setQueueResults([]);
			});
		}
		
		function setQueueResults(value) {
		vm.QueueResults = value;
		}
	
		activate();
	
		function activate() {
			
		}
	}
})();