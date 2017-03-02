(function () {

    angular
        .module(angularModuleName)
        .controller('AppLayoutController', AppLayoutController);

    AppLayoutController.$inject = [];

    function AppLayoutController() {
        var vm = this;
 
        activate();

        function activate() { }
            
    }
})();