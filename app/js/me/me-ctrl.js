angular.module('me.ctrl', [])

    //注册页面个人信息
    .controller('InfoRegister', function($scope, $timeout, $http, $ionicModal, $ionicPopover,$ionicActionSheet,TakePhoto,dateSelect, PersonalInfo, PersonalInfoMange,Check, $ionicHistory, DayInit){

        console.log(PersonalInfo);

        PersonalInfoMange.update(DayInit);

        console.log(PersonalInfo);
        $scope.data =  PersonalInfo;
        //angular.extend($scope.data, TakePhoto);
        $scope.showCamera = function(){
            var url = TakePhoto.showCamera();
            PersonalInfoMange.update({'avatar':url});
            $scope.data.avatar = url;
        };

        $ionicModal.fromTemplateUrl('templates/me/sex-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal){
            $scope.modal = modal;
        });
        //显示modal
        $scope.openSex = function(){
            $scope.modal.show();
        };
        //隐藏modal
        $scope.closeSex = function(){
            $scope.modal.hide();
        };
        //选择性别
        $scope.selectSex = function(sex){
            $scope.data.gender = sex;
            $scope.closeSex();
        };

        $scope.showDate = function(){
            dateSelect.showDate($scope);
            console.log(PersonalInfo);
        };

        //跳过按钮
        $scope.ignoreRegister = function(){
            if(!$scope.data.tags){
                $scope.go('/quiz');
            }else{
                $scope.go('/menu/people-list');
            }
        };


        //提交数据
        $scope.finishRegister = function(){
            //检查数据
            if(Check.getLen($scope.data.gender) < 1){
                alert("请选择性别");
                return false;
            }
            if(Check.getLen($scope.data.company) < 1 || Check.getLen($scope.data.company) > 30){
                alert("公司名称不能为空或过长");
                return false;
            }
            if(Check.getLen($scope.data.job) < 1 || Check.getLen($scope.data.job) > 30){
                alert("岗位名称不能为空或过长");
                return false;
            }
            if(!Check.checkPrice($scope.data.phone)  || Check.getLen($scope.data.phone) != 11){
                alert("电话必须为11位的数字");
                return false;
            }

            var sendData = {
                'nickName' : $scope.data.nickName,
                'gender' : $scope.data.gender,
                'birthday': new Date($scope.data.birthday).valueOf(),
                'company': $scope.data.company,
                'job' : $scope.data.job,
                'phone' : $scope.data.phone
            };

            //给服务器发请求
            var res = $http({
                method: 'post',
                url: 'http://223.252.223.13/Roommates/api/user/updateUserBasicInfo',
                data: sendData,
                timeout: 2000
            });

            res.success(function(response, status, headers, config){
                console.log(response);
                if(response.errno == 0){
                    PersonalInfoMange.update($scope.data);
                    PersonalInfoMange.update({'completeInfo' : true});
                    if(!PersonalInfoMange.get('tags')){
                        $scope.go('/quiz');
                    }else{
                        $scope.go('/menu/people-list');
                    }
                }else if(response.errno == 1){
                    alert(response);
                }
            }).error(function(response, status, headers, config){
                console.log(response);
            });
        }
    }).controller('InfoShow', function($scope, $ionicActionSheet, $ionicModal,dateSelect,TakePhoto, $ionicPopover, $timeout, PersonalInfo ,$http, PersonalInfoMange, DayInit){
        console.log(1111);
        console.log(PersonalInfo);
        angular.extend(PersonalInfo, DayInit);
        $scope.data = PersonalInfo;
        console.log(PersonalInfo);

        $scope.showCamera = function(){
            console.log(PersonalInfo);
            console.log('wo shi pai zhao zhiqian');
            TakePhoto.showCamera($scope);
            console.log('wo shi pai zhao zhihou ');
            console.log(PersonalInfo);
            console.log($scope.data);
        };

        $scope.showDate = function(){
            dateSelect.showDate($scope , $http,1);

        };
        console.log($scope.data);


        $scope.showStatus = function(){
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: '正在寻找'},
                    {text: '已经找到'}
                ],
                cancelText: '取消',
                cancel: function(){
                    hideSheet();
                },
                buttonClicked: function(index){
                    var temp = PersonalInfoMange.get('lookStatus');
                    $scope.data.lookStatus = index == 0 ? 0 : 1;


                    if(temp != $scope.data.lookStatus){
                        var obj = {
                            'lookStatus' : $scope.data.lookStatus
                        };
                        var res = $http({
                            method: 'post',
                            url: 'http://223.252.223.13/Roommates/api/user/updateUserBasicInfo',
                            data: obj,
                            timeout: 2000
                        });
                        res.success(function(response, status, headers, config){
                            if(response.errno == 0){
                                PersonalInfoMange.update({'lookStatus': $scope.data.lookStatus});
                            }else if(response.errno == 1){
                                console.log(response.errno);
                            }
                        }).error(function(response, status, headers, config){
                            console.log(response);
                        });
                    }

                    hideSheet();
                }
            });
            $timeout(function() {
                hideSheet();
            }, 2000);
        };

        $scope.modify = function(obj){
            PersonalInfo.title = obj.title;
            PersonalInfo.val = obj.val;
            PersonalInfo.key = obj.key;
            $scope.go('/menu/me-editor');
        };

        //与注册信息页面重复的代码 start

        $ionicModal.fromTemplateUrl('templates/me/sex-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal){
            $scope.modal = modal;
        });
        //显示modal
        $scope.openSex = function(){
            $scope.modal.show();
        };
        //隐藏modal
        $scope.closeSex = function(){
            $scope.modal.hide();
        };
        //选择性别
        $scope.selectSex = function(sex){
            var temp = $scope.data.gender;
            if(temp == sex){
                $scope.closeSex();
            }else{
                var obj = {};
                obj['gender']  = sex;
                PersonalInfoMange.update(obj);
                //给服务器发请求
                var res = $http({
                    method: 'post',
                    url: 'http://223.252.223.13/Roommates/api/user/updateUserBasicInfo',
                    data: obj,
                    timeout: 2000
                });
                res.success(function(response, status, headers, config){
                    if(response.errno == 0){
                        if(response.finishInfo == 1){
                            PersonalInfoMange.update({'completeInfo' : true});
                        }
                        return true;
                    }else if(response.errno == 1){
                        alert(response);
                    }
                }).error(function(response, status, headers, config){
                    console.log(response);
                });
            }
            $scope.closeSex();
        };
    })
    //修改个人信息控制器
    .controller('EditorInfo', function($scope, $http, PersonalInfo, PersonalInfoMange, Check){
        $scope.data = PersonalInfo;
        $scope.saveModify = function(){

            var obj = {};
            obj[$scope.data.key] = $scope.data.val;

            if(Check.getLen( $scope.data.val) < 1 || Check.getLen( $scope.data.val) > 30){
                alert("不能为空或过长");
                return false;
            }
            if($scope.data.key == 'phone'){
                if(!Check.checkPrice($scope.data.val)  || Check.getLen( $scope.data.val) != 11){
                    alert("电话必须为11位的数字");
                    return false;
                }
            }
            //给服务器发请求
            var res = $http({
                method: 'post',
                url: 'http://223.252.223.13/Roommates/api/user/updateUserBasicInfo',
                data: obj,
                timeout: 2000
            });
            res.success(function(response, status, headers, config){
                if(response.errno == 0){
                    if(response.finishInfo == 1){
                        PersonalInfoMange.update({'completeInfo' : true});
                    }
                    PersonalInfoMange.update(obj);

                    $scope.go('/menu/me');
                }else if(response.errno == 1){
                    alert(response.message);
                }
            }).error(function(response, status, headers, config){
                alert(response.message);
            });
        }
    }).controller('scrollCalendar',function($scope){

        $scope.scrollUp = function(){
            alert('scroll up');
        };
        $scope.scrollDown = function(){
            alert('scroll down');
        }

    })

;