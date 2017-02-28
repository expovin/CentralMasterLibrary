'use strict';

angular.module('qsmig')

    .constant('CONFIG',{
            BASE_REST_URL :'http://localhost:3000/'
    })



    .controller('HeaderController', ['$scope', 'headerFactory','$state', '$location',
        function($scope,headerFactory,$state,$location) {

        $scope.isActive = function (viewLocation) { 
            return $location.path().includes(viewLocation);
		};


                        
    }])

    .controller('MainContentController', ['$scope', 'headerFactory','$state',
        function($scope,headerFactory,$state) {

        console.log("Sono in MainContentController");
                      
    }])


    .controller('SitesController', ['$scope', 'FileFactory','$state','QRSFactory',
        function($scope,FileFactory,$state,QRSFactory) {

            FileFactory.getSites().query(
                function(response) {                        
                    $scope.nodesDetails = {};
                    getDetails(response);
                    $scope.nodes = response;
                },
                function(response) {
                    console.log("Qui ERRORE!");
                }
            );

            function getDetails(serverName){
                serverName.forEach(function(s) {
                    console.log("getDetails for Server "+s);

                    QRSFactory.getType(s, '4242').query({'type':'about'},
                        function(response) {    
                            response['status'] = 'OK';  
                            console.log(response);

                            $scope.nodesDetails[s] = response;
                        },
                        function(response) {
                            response['status'] = 'KO'; 
                            console.log(response);
                            $scope.nodesDetails[s] = response;
                        }
                    );
                })
            }
                
            $scope.gotoSiteDetails = function(s){
                console.log("Vado a dettaglio servr")
            }
                
                      
    }])   

    .controller('SitesDetailsController', ['$scope', 'QRSFactory','constantFactory', '$stateParams',
        function($scope,QRSFactory,constantFactory,$stateParams) {

            $scope.label = constantFactory.label;
            $scope.SWITCH = "OFF";

            $scope.types={};
            $scope.selectedType=constantFactory.QSTypeObjects[0];
            $scope.QSTypeObjects = constantFactory.QSTypeObjects;
            var server = $stateParams.server;

            $scope.setObjectType = function(type) {
                console.log("Imposto nuovo type "+type);
                $scope.selectedType=type;
            }

            $scope.QSTypeObjects.forEach( function(type){

                QRSFactory.getTypeFull(server,'4242').query({'type':type},
                    function(response) {                        
                        console.log(response);
                        $scope.types[type] = response;
                    },
                    function(response) {
                        console.log("Qui ERRORE!");
                        console.log(response);
                    }
                );
            })

                        
    }])

    .controller('SavedConfController', ['$scope', 'headerFactory','$state',
        function($scope,headerFactory,$state) {

        console.log("Sono in SavedConfController");
                      
    }])   