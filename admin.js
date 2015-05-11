(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', '$scope', '$http', '$log', '$timeout', 'uiGridConstants', admin]);

    function admin(common, $scope, $http, $log, $timeout, uiGridConstants) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Admin';
        //------Start UI Grid
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: false
        };

        $scope.gridOptions.columnDefs = [
          { name: 'name' },
          { name: 'age' }
        ];

        $scope.gridOptions.multiSelect = true;

        $scope.gridOptions1 = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: false
        };

        $scope.gridOptions1.columnDefs = [
        { name: 'name' },
        { name: 'age' }
        ];

        $scope.gridOptions1.multiSelect = true;


        $http.get('http://ui-grid.info/data/500_complex.json')
          .success(function (data) {
              $scope.gridOptions.data = data;
              $timeout(function () {
                  if ($scope.gridApi.selection.selectRow) {
                      $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
                  }
              });
          });

        $scope.info = {};

        $scope.toggleMultiSelect = function () {
            $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
        };


        $scope.selectAll = function () {
            $scope.gridApi.selection.selectAllRows();
        };

        $scope.clearAll = function () {
            $scope.gridApi.selection.clearSelectedRows();
        };


        $scope.setSelectable = function () {
            $scope.gridApi.selection.clearSelectedRows();

          
        };

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            //set gridApi on scope
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var msg = 'row selected ' + row.isSelected;
                $log.log(msg);
            });

            gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                var msg = 'rows changed ' + rows.length;
                $log.log(msg);
            });
        };




        //----------end UI-Grid
        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
        }
    }
})();