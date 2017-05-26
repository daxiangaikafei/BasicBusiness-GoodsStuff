import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')

export default [{
    path: '',
    component: App,
    children: [{
        path: '',
        // redirect: '/'
        component: App
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/home:pageId:title:lng:lat',
        component: home
    }]
}]