angular.module('me.service', [])

.factory('DayInit', function(){

    return {

        'yearArr' : [1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995],
        'monthArr' : [1,2,3,4,5,6,7,8,9,10,11,12],
        'dayArr' : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        'year' : 1985,
        'month' : 1,
        'day' : 1

    }

})
;