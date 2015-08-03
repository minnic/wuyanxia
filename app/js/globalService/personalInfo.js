ServiceModule
.value('PersonalInfo',{
        'lookStatus' : '',
        'birth': '',
        'name': '',
        'sex': '',
        'company': '',
        'job': '',
        'phone': '',
        //个人信息交互使用
        'title': '',
        'key': '',
        'val': '',

        //completeInfo 是否完成个人资料 0 表示No 1表示 Yes
        //completeAsk 是否完成问卷  0 表示No 1表示 Yes

        //信用额度 0 1 2
        //headUrl 头像链接
        //hasHouse 是否有房
        //userId 用户ID

        'completeInfo': '',
        'completeAsk': '',
        'credit': '',
        'headUrl': 'http://223.252.223.13/Roommates/photo/photo_123.jpg',
        'userId': '',
        'hasHouse': ''
})

// PersonalInfo 作为页面之间的共享数据，它包含的字段可以查看登录接口
.value('PersonalInfo', {})

.factory('PersonalInfoMange', ['PersonalInfo', function(PersonalInfo){

    function update(obj) {
        if (typeof obj === "object") {
            angular.extend(PersonalInfo, obj);
            localStorage.setItem('PersonalInfo', JSON.stringify(PersonalInfo));
        }         
    };
    function remove(item) {
        if (typeof item === "string") {
            delete PersonalInfo.item;
        } 
        localStorage.setItem('PersonalInfo', JSON.stringify(PersonalInfo));
    };
    function clear() {
        for( var i in PersonalInfo) {
            PersonalInfo[i]= "";
        }
        localStorage.removeItem('PersonalInfo');
    };
    function get(item) {
        if (item in PersonalInfo) {
            return PersonalInfo[item];
        } 
    };

    return {
        update: update,
        remove: remove,
        get: get,
        clear: clear
    };
}]);
