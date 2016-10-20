angular.module('app.directives', [])

//自定义下拉选择
.directive('agSelect', ['$ionicPopup', function($ionicPopup){
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
		templateUrl: "views/directive/agSelect.html",
		link: function(scope, el, attrs, controller) {
			scope.currentDesc = scope.title;

			// 监控默认参数变化
			if(scope.defaultDesc){
				scope.currentDesc = scope.defaultDesc;
			}
			if(scope.defaultValue){
				scope.value = scope.defaultValue;
			}
			scope.$watch('defaultDesc', function(newValue, oldValue, scope){
				if(newValue != oldValue){
					scope.currentDesc = newValue;
				}
			});
			scope.$watch('defaultValue', function(newValue, oldValue, scope){
				if(newValue != oldValue){
					scope.value = newValue;
				}
			});

			// 弹窗
			var myPopup = null;

			// 打开弹窗
			scope.selectClick = function(){
				scope.showSelect = !scope.showSelect
				if(scope.showSelect){// 显示
					myPopup = $ionicPopup.show({
						title: scope.title || "请选择",
						template: '<div class="href cs-select-item"'
									+ 'ng-repeat="item in data"'
									+ 'ng-click="click(item)">'
									+ '{{item.desc}}'
									+ '</div>',
						scope: scope,
						buttons: [
							{text: '关闭',
							type: 'button-assertive',
							onTap: function(e) {
								scope.showSelect = !scope.showSelect
								scope.closePopup();
							}}
						]
					});
				}else{// 移除
					scope.closePopup();
				}
			};

			// 关闭弹出框
			scope.closePopup = function(){
				if(myPopup){
					myPopup.close();
				}
			};

			// 选中
			scope.click = function(item){
				scope.showSelect = false;
				scope.currentDesc= item.desc;
				scope.value = item.value;
				if(scope.change){
					scope.change(item);
				}
				myPopup.close();
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
		templateUrl: "views/directive/evaluateSelect.html",
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

// web环境下移除元素
.directive('agDisableWeb', ["APPCONFIG", function(APPCONFIG){
	return {
		restrict: 'EA',
		replace: false,
		link: function($scope, el, attrs, controller) {
			// web环境下移除元素
			if(APPCONFIG.IS_WEB){
				el.remove();
			}
		}
	};
}])

;

