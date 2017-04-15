(function () {
	
	angular
		.module(angularModuleName)
		.controller('GetQueueController', GetQueueController);
	
	GetQueueController.$inject = ['$http', '$state'];
	
	function GetQueueController($http, $state) {
		var vm = this;
		vm.QueueResults = undefined;
		
		vm.UpdateQueue = UpdateQueue;
		vm.RemoveFromQueue = RemoveFromQueue;
		
		function RemoveFromQueue(customer) {
			
			var promise = $http({
				method: 'POST',
				url: "http://localhost:3050/DeleteQueueByCustomerId",
				data: customer
			});
			
			promise.then(function(result) {
				console.log(result);
				UpdateQueue();
			}).catch(function(err) {
				console.log(err);
			});
			
			
		}
		
		function UpdateQueue() {
			var promise = $http({
				method: 'GET',
				url: "http://localhost:3050/GetQueue"
			});
			promise.then(function(result) {
				console.log(result);
				setQueueResults(result.data[0]);
			}).catch(function(err) {
				console.log(err);
				setQueueResults([]);
			});
		}
		
		function setQueueResults(value) {
			for(var i in value) {
				if(value[i].last_update !=null) {
					value[i].last_update = new Date(value[i].last_update).toLocaleString();
				}

				if(value[i].create_date !=null) {
					value[i].create_date = new Date(value[i].create_date).toLocaleString();
				}
			}

			vm.QueueResults = value;
		}
	
		activate();
	
		function activate() {
			UpdateQueue();
		}
	}
})();