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
    },
    {
        path: '/home',
        component: home,
        meta: {
            hasMenu: true
        }
    },
    {
        path: '/detail',
        component: detail
    },
    {
        path: '/profile',
        component: profile,
        meta: {
            hasMenu: true
        }
    },
    {
        path: '/order',
        component: order
    },
    {
        path: '/stuff',
        component: stuff,
        meta: {
            hasMenu: true
        }
    },
    {
        path: '/points',
        component: points,
    },
    {
        path: '/exchange',
        component: exchange,
    },
    {
        path: '/treasure',
        component: treasure
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/login:pageType:code',
        component: login
    }]
}]