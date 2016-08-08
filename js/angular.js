angular.module('app',[])
.filter('slice',function(){
  return function(input,start,end){
    return input.slice(start,end);
  }
})
.controller('ctr1',function($scope,$http,$filter){
  console.log("coded with \u2665 by pavan");
  $scope.add=0;
  $scope.start=0;
  $scope.end=$scope.start+3;
  $scope.years=[];
  $scope.values=[];
  $scope.values2=[];
  $scope.pages=[];
  $scope.table_years=false;
  $scope.table_main=true;
  $scope.datafilter=true;
  $scope.temp=!$scope.datafilter;
  $http.get("part_1_json.json").success(function(data){
    Object.keys(data).forEach(function(key) {
         $scope.years.push(key);
         $scope.values2.push(data[key]);
  });
  $scope.$broadcast("update-table",$scope.values);
  });
  $scope.yea;
  $scope.order=function(sort,filter){
    if(filter=="asc"){
    $scope.values= $filter('orderBy')($scope.values,sort);
    }
     if(filter=="des"){
       $scope.values= $filter('orderBy')($scope.values,sort,true);

    }
  };
    $scope.values=$scope.values2;
    $scope.search=function(year){
    if(year=="All"){
      $scope.table_years=false;
      $scope.table_main=true;
      $scope.values=$scope.values2
    }
    else{
    $scope.table_years=true;
    $scope.table_main=false;
    $scope.values=$scope.values2;
    angular.forEach($scope.values2, function(value, key) {
      if(year==value["year"]){
      $scope.start=key;
      $scope.end=$scope.start+1;
    }
    });
  }
  };

  $scope.filter_search=function(filter,filter_value){
    $scope.table_years=false;
    $scope.table_main=true;
    $scope.values=[];
    if(filter=="over"){
      angular.forEach($scope.values2,function(value, key){
        if(value[filter]>filter_value){
          $scope.values.push(value);
        }
      });
    }
    else if(filter=="under"){
      angular.forEach($scope.values2,function(value, key){
        if(value[filter]<filter_value){
          $scope.values.push(value);
        }
      });
    }
   $scope.$broadcast("update-table",$scope.values);
};
$scope.$broadcast("update-table",$scope.values);
$scope.edit=function(x){
  $scope.datafilter=!$scope.datafilter;
  $scope.temp=!$scope.datafilter;
  console.log(x.year);
  $scope.edit_year=x.year;
  $scope.edit_over=x.over;
  $scope.edit_under=x.under;
  angular.forEach($scope.values2,function(value,key){
    if(value["year"]==x.year){
      console.log(value["year"]);
      value["over"]=x.over;
      value["under"]=x.under;
      console.log(value);
    }
    // console.log(value);
});
};
$scope.save=function(year,over,under){
  $scope.datafilter=!$scope.datafilter;
  $scope.temp=!$scope.datafilter;
angular.forEach($scope.values2,function(value,key){
  if(value["year"]==year){
    value["over"]=over;
    value["under"]=under;
  }

});

};
$scope.delete=function(year){
  for(var i = 0; i < $scope.values2.length; i++) {
    var obj = $scope.values2[i].year;
    console.log(obj);
    if(obj==year) {
        $scope.values2.splice(i, 1);
        i--;
    }
  }
    for(var i = 0; i < $scope.values.length; i++) {
      var obj = $scope.values[i].year;
      console.log(obj);
      if(obj==year) {
          $scope.values.splice(i, 1);
          i--;
      }
}
console.log($scope.values);
console.log($scope.values2);

  $scope.$broadcast("update-table",$scope.values);
};



})
.controller('ctr2',function($scope,$rootScope){
  $scope.start=0;
  $scope.end=$scope.start+3;
  $scope.$on("update-table", function(event, args){
    $scope.pages=[];
    for(var i=0;i<(args.length)/3;i++){
        $scope.pages.push(i+1);
    }
  });
  $scope.click=function(a){
    $scope.start=(a-1)*3;
    $scope.end=parseInt($scope.start)+3;

  };
})
.directive('datafilter',function(){
  return{
    transclude:true,
    templateUrl:"datafilter.html"
  };
})
.directive('temp',function(){
  return{
    transclude:true,
    templateUrl:"directive.html"
  };
});
