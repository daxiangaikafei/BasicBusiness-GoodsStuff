import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const detail = r => require.ensure([], () => r(require('../pages/detail')), 'detail')
const profile = r => require.ensure([], () => r(require('../pages/profile')), 'profile')
const order = r => require.ensure([], () => r(require('../pages/order')), 'order')
const stuff = r => require.ensure([], () => r(require('../pages/stuff')), 'stuff')
const treasure = r => require.ensure([], () => r(require('../pages/treasure')), 'treasure')
const login = r => require.ensure([], () => r(require('../pages/login')), 'login')
const points = r => require.ensure([], () => r(require('../pages/points')), 'points')
const exchange = r => require.ensure([], () => r(require('../pages/exchange')), 'exchange')
const activity = r => require.ensure([], () => r(require('../pages/activity')), 'activity')
const search = r => require.ensure([], () => r(require('../pages/search')), 'search')
const adetail = r => require.ensure([], () => r(require('../pages/adetail')), 'adetail')
const gang = r => require.ensure([], () => r(require('../pages/gang')), 'gang')
const withdraw = r => require.ensure([], () => r(require('../pages/withdraw')), 'withdraw')

const partnerRule = r => require.ensure([], () => r(require('../pages/partnerRules')), 'partnerRule')
const review = r => require.ensure([], () => r(require('../pages/review')), 'review')
const join = r => require.ensure([], () => r(require('../pages/joinPartner')), 'join')
const guide = r => require.ensure([], () => r(require('../pages/guide')), 'guide')
export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        // redirect: '/',
        component: home,
        meta: {
            hasMenu: true
        }
    }, {
        path: '/home',
        component: home,
        meta: {
            hasMenu: true
        }
    }, {
        path: '/detail',
        component: detail
    }, {
        path: '/adetail',
        component: adetail
    }, {
        path: '/profile',
        component: profile,
        meta: {
            hasMenu: true
        }
    }, {
        path: '/order',
        component: order
    }, {
        path: '/stuff',
        component: stuff,
        meta: {
            hasMenu: true
        }
    }, {
        path: '/points',
        component: points,
    }, {
        path: '/search',
        component: search,
        meta: {
            hasMenu: true
        }
    }, {
        path: '/search:keywords',
        component: search,
        meta: {
            hasMenu: true
        }
    }, {
        path: '/exchange',
        component: exchange,
    }, {
        path: '/treasure',
        component: treasure
    }, {
        path: '/login',
        component: login
    }, {
        path: '/login:pageType:code',
        component: login
    }, {
        path: '/activity',
        component: activity
    }, {
        path: '/gang',
        component: gang
    }, {
        path: '/withdraw',
        component: withdraw
    },{
        path: '/partnerRule',
        component: partnerRule
    },
    {
        path: '/partnerRule:type',
        component: partnerRule
    },
    {
        path: '/review',
        component: review
    },
    {
        path: '/guide',
        component: guide
    },
    {
        path: '/join',
        component: join
    },]
}]