angular.module('app.directives', [])

//自定义下拉选择
.directive('agSelect', [function(){
	return {
		restrict: 'E',
		scope: {
			title: "@",//显示文字
			data: "=",//下拉数据
			value: "=",//绑定的值
			defaultDesc: "=",//默认显示
			defaultValue: "=",//默认值
			change: "&"//切换事件
		},
		replace: true,
		templateUrl: "js/src/views/directive/agSelect.html",
		link: function(scope, el, attrs, controller) {
			scope.currentDesc = scope.title;

			if(scope.defaultDesc){
				scope.currentDesc = scope.defaultDesc;
			}
			if(scope.defaultValue){
				scope.value = scope.defaultValue;
			}

			scope.click = function(item){
				scope.showSelect = false;
				scope.currentDesc= item.desc;
				scope.value = item.value;
				if(scope.change){
					scope.change(item);
				}
			};
		}
	};
}])

//自定义后退按钮-独立页面使用
.directive('agBtnBack', [function(){
	return {
		restrict: 'EA',
		replace: true,
		template: '<ion-nav-buttons side="left"><div class="buttons"><a class="button icon icon-right ion-arrow-left-c" ng-click="$ionicGoBack()"></a></div></ion-nav-buttons>'
		//template: '<ion-nav-bar class="bar-positive"><ion-nav-back-button>返回</ion-nav-back-button></ion-nav-bar>'
	};
}])

//星星评价选择
.directive('evaluateSelect', [function(){
	return {
		restrict: 'E',
		scope: {
			ngModel: "=",//绑定的值
			disable: "="//是否禁用-不可选择
		},
		replace: true,
		templateUrl: "js/src/views/directive/evaluateSelect.html",
		link: function($scope, el, attrs, controller) {

			$scope.range = [1, 2, 3, 4, 5];
			if(!$scope.ngModel){
				$scope.ngModel = 0;
			}

			$scope.click = function(val){
				if(!$scope.disable){
					$scope.ngModel = val;
				}
			};

		}
	};
}])

;

