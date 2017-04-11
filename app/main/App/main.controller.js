(function() {

    angular
        .module(angularModuleName)
        .controller('MainController', MainController);

        MainController.$inject = ['$state'];

        function MainController($state) {
            var vm = this;

            vm.Go = Go;

            function Go(state) {
                $state.go(state);
            }

            function getHomeHeaderElement() {   
                return document.getElementById("mainHeader");
            }

            function getHomeButtonElement() {   
                return document.getElementById("mainButton");
            }

            function setTweenObjects() {
                new TWEEN.Tween({x: 0, y: -150, rotation: 0}).to({x: 0, y: 0, rotation:0}, 10000).easing(TWEEN.Easing.Elastic.Out).onUpdate(updateTweenElement.apply({element: getHomeHeaderElement()})).start();
                new TWEEN.Tween({x: 0, y: 200}).to({x: 0, y: 18}, 500).easing(TWEEN.Easing.Elastic.Out).onUpdate(updateTweenElement.apply({element: getHomeButtonElement()})).start();
            }

            //Need to add polyfill for requestAnimationFrame and cancelAnimationFrame

            function startTweenAnimation(time) {
                var id = requestAnimationFrame(startTweenAnimation);

                if(!TWEEN.update(time)) { cancelAnimationFrame(id); }
            }

            function updateTweenElement() {
                var context = this;

                return function() {
                    context.element.style.left = this.x + "px";
                    context.element.style.top = this.y + "px";

                    if(this.rotation === undefined) return;

                    context.element.style.webkitTransform = 'rotate(' + Math.floor(this.rotation) + 'deg)';
                    context.element.style.MozTransform = 'rotate(' + Math.floor(this.rotation) + 'deg)';
                }
            }

            activate();

            function activate() {
                setTweenObjects(); 
                startTweenAnimation();
            } 
        }
})();