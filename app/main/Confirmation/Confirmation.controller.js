(function () {
	
	angular
		.module(angularModuleName)
		.controller('ConfirmationController', ConfirmationController);
	
	ConfirmationController.$inject = ['$http', '$state'];
	
	function ConfirmationController($http, $state) {
		var vm = this;
		vm.ConfirmationResult = undefined;
		vm.GetService = GetService;
		
		function GetService() {
			
			GetServiceId();
			
			var promise = $http({
				method: 'POST',
				url: "http://localhost:3050/GetQueueByServiceId",
				data: vm.serviceId
			});
			
			promise.then(function(result) {
				console.log(result);
				vm.ConfirmationResult = result.data[0];
			}).catch(function(err) {
				console.log(err);
			});
			
			
		}
		
		function GetServiceId() {
			
			var GET = {};
            var query = $location.path().substring(1).split("&");
            for (var i = 0, max = query.length; i < max; i++)
            {
              if (query[i] === "") // check for trailing & with no param
                 continue;

                var param = query[i].split("=");
                GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
}
			
			vm.serviceId = {service_id : GET.Use_id};
		}
		
	
		activate();
	
		function activate() {
			GetService();
		}
	}
})();