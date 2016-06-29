(function() {
'use strict';

  angular
    .module('eduMed')
    .controller('patientsController', patientsController);

  patientsController.$inject = ['$log'];
  function patientsController($log) {
    var vm = this;
    $log.log('patients');

    activate();

    ////////////////

    function activate() { }
  }
})();