/* global angular */
'use strict';
angular.module('eduMed')

.directive('elasticHeader', ['$ionicScrollDelegate', '$timeout', function($ionicScrollDelegate, $timeout) {
  function linkFunc(scope, scroller, attr) {

    $timeout(function() {

      var scrollerHandle = $ionicScrollDelegate.$getByHandle(attr.delegateHandle);
      var header = document.getElementById(attr.elasticHeader);
      var headerHeight = header.clientHeight;
      var translateAmt, scaleAmt, scrollTop;
      var ticking = false;

      function updateElasticHeader() {
        //Necesario para ver que retorne si es que no encuentra el scrolledHandle
        if (scrollerHandle.getScrollPosition().top === undefined) {
          return;
        }
        scrollTop = scrollerHandle.getScrollPosition().top;
        if (scrollTop >= 0) {
          scaleAmt = 1;
          if (scope.fixed) {
            translateAmt = scrollTop;
          } else {
            translateAmt = scrollTop / 2;
          }
        } else {
          if (scope.bounce) {
            scaleAmt = -scrollTop / headerHeight + 1;
          }
        }
        header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + translateAmt + 'px,0) scale(' + scaleAmt + ',' + scaleAmt + ')';
        ticking = false;
      }

      function requestTick() {
        if (!ticking) {
          ionic.requestAnimationFrame(updateElasticHeader);
        }
        ticking = true;
      }

      //var selectTop = document.querySelector('.select-tab');
      //var selectEmpresa = document.querySelector('.top-select');

      scope.bounce = 'bounce' in attr; //si existe el atributo bounce
      scope.fixed = 'fixed' in attr;  //si existe el atributo fixed
      scope.subheader = 'subheader' in attr;  //si existe el atributo subheader

      // if (scope.subheader) {
      //   var headerApp = document.querySelector('ion-header-bar');
      //   var headerAppHeight = headerApp.clientHeight;
      // }

      // Set transform origin to top:
      header.style[ionic.CSS.TRANSFORM + 'Origin'] = 'center bottom';

      // Update header height on resize:
      window.addEventListener('resize', function() {
        headerHeight = header.clientHeight;
      }, false);

      scroller[0].addEventListener('scroll', requestTick);
      scrollTop = scrollerHandle.getScrollPosition().top;

    });
  }
  var directive = {
    restrict: 'A',
    link: linkFunc
  };
  return directive;
}]);
