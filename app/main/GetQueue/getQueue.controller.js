(function () {
	
	angular
		.module(angularModuleName)
		.controller('GetQueueController', GetQueueController);
	
	GetQueueController.$inject = ['$http', '$state'];
	
	function GetQueueController($http, $state) {
		var vm = this;
		vm.QueueResults = undefined;
		
		vm.UpdateQueue = UpdateQueue;
		
		function UpdateQueue() {
			var promise = $http({
				method: 'GET',
				url: "http://localhost:3050/GetQueue"
			});
			promise.then(function(result) {
				console.log(result);
				setQueueResults(result.data);
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

				console.log(value[i].last_update);
			}

			vm.QueueResults = value;
		}
	
		activate();
	
		function activate() {
			UpdateQueue();
		}
	}
})();