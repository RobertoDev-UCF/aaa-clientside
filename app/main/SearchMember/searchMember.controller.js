(function() {

    angular
        .module(angularModuleName)
        .controller("SearchMemberController", SearchMemberController);

        SearchMemberController.$inject = ['$http'];

        function SearchMemberController($http) {
            var vm = this;

            vm.SearchForMember = SearchForMember;
            vm.AddCustomer = AddCustomer;

            function AddCustomer() {
                
            }

            function SearchForMember() {
                if(!getMemberNumber() || getMemberNumber().length < 9) return;

                var promise = $http({
                    method: 'GET', 
                    url: "http://example"
                });

                promise.then(function(result) {
                    console.log(result);
                    setMemberResults([{phone:"123-123-1234", firstname: "Roberto", lastname:"Rolon"}]);
                }).catch(function(err) {
                    console.log(err);
                    setMemberResults([]);
                });
            }
            
            function getMemberNumber() {
                return vm.InputMemberNumber;
            }

            function setMemberResults(value) {
                vm.MemberResults = value;
            }

            activate();

            function activate() {  }
            
        }        
})();