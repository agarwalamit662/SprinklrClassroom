myApp.controller("courseController", function($scope, $routeParams,$location) {
    	
    	$scope.courseId = $routeParams.param;
    	$scope.coursesClass = courses;
    	
    	$scope.courseName = courses[$scope.courseId-1].Course.name;
    	
    	
    	$scope.lessonClass = courses[$scope.courseId-1].Course.lessons;
    	
    	$scope.getIframeSrc = function(src) {
    	      return src;
    	 };
    	
    	
    	$scope.lessonId = courses[$scope.courseId-1].Course.lessons.length+1;
    	
    	
		var myEl = angular.element( document.querySelector( '#headid' ) );
		myEl.attr('style',"background:rgb(242,242,246);");
		myEl = angular.element( document.querySelector( '#ngviewid' ) );
		myEl.attr('style',"background:rgb(242,242,246); width:100%; height:100%;");
		
		
		$scope.add = function(cid,lid){
			$scope.coursesClass = courses;
			var path = "/lesson/"+cid+"/"+lid;
	    	$location.path(path);
	    	
	  	};
	  	
	  	$scope.back = function(){
			$scope.coursesClass = courses;
			var path = "/";
	    	$location.path(path);
	    	
	  	};
		
	})
	
	myApp.controller('lessonAddController', function($scope, $routeParams,$location) {
		$scope.headingTitle = "Lesson Add Info";
		
		
		var myEl = angular.element( document.querySelector( '#headid' ) );
		
		myEl.removeAttr('style');
		
		myEl = angular.element( document.querySelector( '#ngviewid' ) );
		myEl.attr('style',"width:100%; height:100%;");
		
		$scope.courseId = $routeParams.courseid;
    	$scope.lessonId = $routeParams.lessonid;
    	$scope.coursesClass = courses;
    	
    	var courseIndex = $scope.courseId-1;
    	var lessonIndex = $scope.lessonId-1;
    	 
    	if(courses[courseIndex].Course.lessons.length > lessonIndex){
    	
    	console.log(courses[courseIndex].Course.lessons[lessonIndex].title);
    	$scope.classroom = {title : courses[courseIndex].Course.lessons[lessonIndex].title,
  						description : courses[courseIndex].Course.lessons[lessonIndex].desc,
  						url : courses[courseIndex].Course.lessons[lessonIndex].url,
  						indexnumber : courses[courseIndex].Course.lessons[lessonIndex].lid};
  		}
  		else if(courses[courseIndex].Course.lessons.length < lessonIndex){
    	$scope.classroom = {title : '',
  						description : '',
  						url : '',
  						indexnumber : ''};
  		}
    	$scope.cancel = function(){
  			
    		var path = '/course/'+$scope.courseId;
        	$location.path(path);
    		
  		}; // end cancel
  
  		$scope.save = function(){
    	
    	$scope.classroom.url = $scope.classroom.url.replace("watch?v=","embed/");
    	
    	var temp ={  
            "lid":$scope.lessonId,
            "title":$scope.classroom.title,
            "desc":$scope.classroom.description,
            "url":$scope.classroom.url
         } 
        
         
    	if(courses[courseIndex].Course.lessons.length > lessonIndex && $scope.lessonId == courses[courseIndex].Course.lessons[lessonIndex].lid){
    		courses[courseIndex].Course.lessons[lessonIndex] = temp;
    	}
    	else{
    		courses[courseIndex].Course.lessons.push(temp);
    	}
    	$scope.coursesClass = courses;
    	
    	var path = '/course/'+$scope.courseId;
    	$location.path(path);
  	};
    	
	});
	
	myApp.controller('homeController', function($scope,$rootScope,$timeout,$dialogs) {
		
		var myEl = angular.element( document.querySelector( '#headid' ) );
		
		myEl.removeAttr('style');
		
		myEl = angular.element( document.querySelector( '#ngviewid' ) );
		myEl.attr('style',"width:100%; height:100%;");
		
		$scope.headingTitle = "Head";
		$scope.coursesClass = courses;
		
		$scope.launch = function(which){
    var dlg = null;
    switch(which){
        
      // Error Dialog
      // Create Your Own Dialog
      case 'create':
        dlg = $dialogs.create('/dialogs/addCourse.html','addCourseController',{},{key: false,back: 'static'});
        dlg.result.then(function(classroom){
          $scope.title = classroom.title;
          $scope.description = classroom.description;
          
          
          
          var temp = {"Course":
   			{  
   			"id":courses.length+1,
      		"name":$scope.title,
      		"addedby":$scope.description,
      		"lessons":[]
   			}
   			};
   			
   			courses.push(temp);
   			$scope.coursesClass = courses;     
          
        },function(){
          $scope.title = 'You decided not to enter in your name, that makes me sad.';
          $scope.description = 'No Description';
        });
        
        break;
    }; // end switch
  }; // end launch
		
	}); 
	
	myApp.controller('addCourseController',function($scope,$modalInstance,data){
  	$scope.classroom = {title : '',
  						description : ''};
	$scope.titlePlaceholder = 'Please Select Your Desired Title';
	$scope.descPlaceholder = 'Enter what\'\ the purpose of this class if anyone has doubts';
	$scope.cancel = function(){
    $modalInstance.dismiss('canceled');  
  }; // end cancel
  
  $scope.save = function(){
    $modalInstance.close($scope.classroom);
  }; // end save
  
  $scope.hitEnter = function(evt){
  	
    if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.classroom.title,null) || angular.equals($scope.classroom.title,''))
    && !(angular.equals($scope.classroom.description,null) || angular.equals($scope.classroom.description,'')))
				$scope.save();
  }; // end hitEnter
}) // end addCourseController
.run(['$templateCache',function($templateCache){
  $templateCache.put('/dialogs/addCourse.html','<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title" style="float: left;"">Add Class</h4><button type="button" class="btn btn-default" ng-click="cancel()" style="float: right; border: medium none; background: transparent none repeat scroll 0% 0%;">X</button></div><div class="modal-body"><ng-form name="createclasssDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[createclasssDialog.titleclass.$dirty && createclasssDialog.titleclass.$invalid && createclasssDialog.desclass.$dirty && createclasssDialog.desclass.$invalid]"><label class="control-label" for="titleclass">Title</label><input type="text" class="form-control" name="titleclass" id="titleclass" placeholder = {{titlePlaceholder}} ng-model="classroom.title" ng-keyup="hitEnter($event)" required><label class="control-label" for="desclass">Description</label><input type="textarea" class="form-control" style="height:66px;" name="desclass" id="desclass" placeholder = "{{descPlaceholder}}" ng-model="classroom.description" ng-keyup="hitEnter($event)" required></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" style="border-radius:14px;" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" style="border-radius:14px; background-color:rgb(121, 134, 203);" ng-click="save()" ng-disabled="(createclasssDialog.$dirty && createclasssDialog.$invalid) || createclasssDialog.$pristine">Create</button></div></div></div></div>');

	
}]); // end run / module