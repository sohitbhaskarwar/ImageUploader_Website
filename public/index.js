var app = angular.module('myApp',[]);
  
  app.controller('myCtrl',function($scope,$http,$window,$location){
  
	$scope.upload_extra = false;
	$scope.flag = false;
	$scope.allImage = false;
	$scope.image_upload = false;
	$scope.levels=["level_1","level_2","level_3","level_4"];
  
	 $scope.foo_getAllimages = function(){
	 $http({
		method : "GET",
		url : "http://ec2-34-209-125-251.us-west-2.compute.amazonaws.com:9090/get_allimg/"+$scope.all_data,
	
	}).then(function mySuccess(response) {
    		$scope.allImage_data = response.data;
				$scope.allImage = true;
				$scope.temp = $scope.allImage_data[0];
			console.log($scope.allImage_data);
			$scope.img1 = $scope.allImage_data[0].link_1;
			console.log($scope.img1 );
	});
	}
	
	
	
	$scope.show_browse = function(){
	
		$scope.upload_extra = true;
	}
	
	$scope.all= function(){
	$scope.link_level = $scope.all_dropdown_level;
	}
	
	
		$scope.upload = function(){
		
	 $http({
		method : "GET",
		url : "http://ec2-34-209-125-251.us-west-2.compute.amazonaws.com:9090/asd",
	
	}).then(function mySuccess(response) {
    		
	});
	}
	
	//console.log($scope.dropdown_level);
		
	$scope.foo_getImg = function(){
		
	 $http({
		
		method : "GET",
		url : "http://ec2-34-209-125-251.us-west-2.compute.amazonaws.com:9090/get_img/"+$scope.dropdown_level,
	
	}).then(function mySuccess(response) {
    		
			$scope.URL_link = response.data;
			 console.log($scope.URL_link[0]);
			if($scope.URL_link[0].link_1 != "" )
			{
				$scope.flag = true;
				$scope.imgURL_1 = $scope.URL_link[0].link_1;
				console.log($scope.imgURL_1);
			}
			 
			 if(($scope.URL_link[0].link_2 != ""))
			 {
			 $scope.flag = true;
				$scope.imgURL_2 = $scope.URL_link[0].link_2;
				console.log($scope.imgURL_2);
			 }
			 if(($scope.URL_link[0].link_1 == "" && $scope.URL_link[0].link_2 == "") )
				{
				
				$scope.flag = false;
				alert("NO IMAGE FOUND..... Upload a IMAGE");
				$scope.image_upload = true;
				$scope.level_name = $scope.dropdown_level;
				console.log($scope.act_link);
				console.log($scope.flag);
			 }
			 
			$scope.act_link = "http://ec2-34-209-125-251.us-west-2.compute.amazonaws.com:9090/asd/"+$scope.dropdown_level;
			console.log($scope.act_link);
	});
	}		
	
/*	$scope.show_img = function(){
	
	}
	
	$scope.file_changed = function(element) {

     $scope.$apply(function(scope) {
         var photofile = element.files[0];
         var reader = new FileReader();
         reader.onload = function(e) {
            // handle onload
         };
         reader.readAsDataURL(photofile);
		console.log(photofile);
     });
	 
};
  */
  });
  