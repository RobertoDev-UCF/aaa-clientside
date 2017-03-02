(function() {

    angular
        .module(angularModuleName)
        .controller("SearchMemberController", SearchMemberController);

        SearchMemberController.$inject = [];

        function SearchMemberController() {
            var vm = this;

            vm.SearchForMember = SearchForMember;
            vm.AddCustomer = AddCustomer;

            function AddCustomer() {
                
            }

            function SearchForMember() {
                if(!getMemberNumber() || getMemberNumber().length < 9) return;

                setMemberResults([{phone:"123-123-1234", firstname: "Roberto", lastname:"Rolon"}]);
            
                setMemberResults([]);
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