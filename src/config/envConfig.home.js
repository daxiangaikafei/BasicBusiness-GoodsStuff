var _defaultApi = {
    debug: {
        question: '/mock/4.json',
        question1: '/mock/1.json',
        question2: '/mock/2.json',
        question3: '/mock/3.json',
        question4: '/mock/4.json',
        question5: '/mock/5.json',
        question6: '/mock/6.json',
        allTagList: '/mock/messageList.json',
        tagItem: '/mock/tagList.json',
        details: '/mock/2.json',
        answer: 'mock/5.json',
        recommend: 'mock/1.json',
        getQuestionById: '/mock/2.json',
        couponList: 'http://192.168.132.44:8081/goods/goodsCoupon/couponList',
        couponDetail: 'http://192.168.132.44:8081/goods/couponDetail/',
        categoryList: 'http://192.168.132.44:8081/goods/categoryList',
    },
    product: {
        question: '/ai/talk/question.do',
        allTagList: '/ai/tag/allList.do',
        tagItem: '/ai/tag/items.do',
        details: '/ai/indexPage/menus/details.do',
        answer: '/ai/menus/answer.do',
        recommend: '/ai/stuff/recommend.do',
        getQuestionById: '/ai/indexPage/menus/getQuestionByDirId.do',
        switch: '/service/switch.do',
        couponList: '/goodsCoupon/couponList',
        couponDetail: '/couponDetail',
        categoryList: 'goodsCoupon/catogry/all'
    }
}
module.exports = {
    getApi: function(env,name){
        var type = env == 'product' ? env : 'debug'
        return _defaultApi[type][name]
    }
}