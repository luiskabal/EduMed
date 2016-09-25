/**
 * Created by pvill on 25-09-2016.
 */
(function() {
    'use strict';

    angular
        .module('eduMed')
        .directive('onErrorSrc', function() {
            return {
                link: function(scope, element, attrs) {
                    element.bind('error', function() {
                        if (attrs.src != attrs.onErrorSrc) {
                            attrs.$set('src', attrs.onErrorSrc);
                        }
                    });
                }
            }
        });
})();