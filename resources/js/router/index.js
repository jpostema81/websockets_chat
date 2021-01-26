import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/store';

Vue.use(VueRouter);

const publicRoutes = require('./routes/public').default;
const privateRoutes = require('./routes/private').default;


const router = new VueRouter({
	routes: [
		{
			path: '/',
            redirect: { name: 'home' },
            component: Vue.component('Layout', require( '../layouts/Layout.vue').default),
            children: publicRoutes,
        },
        // {
		// 	path: '/dashboard/',
        //     component: Vue.component('Dashboard', require( '../layouts/DashboardLayout.vue').default),
        //     children: privateRoutes,
        // },
    ],
    scrollBehavior: function(to, from, savedPosition)
    {
        if(to.hash)
        {
            // Use for direct jump.
            window.location.href = to.hash;
            // Use VueScrollTo for animation.
            //VueScrollTo.scrollTo(to.hash, 700);
            return { selector: to.hash }
        }
        else if(savedPosition)
        {
            return savedPosition;
        }
        else
        {
            return { x: 0, y: 0 }
        }
    },
});

router.beforeEach((to, from, next) =>
{
    // redirect to login page if not logged in and trying to access a restricted page. Zie voor meer info:
    // https://router.vuejs.org/guide/advanced/meta.html
    const authRequired = !to.matched.some(record => record.meta.public);
    const loggedIn = store.getters['AuthenticationStore/isAuthenticated'];
    //let authState = store.getters['AuthenticationStore/status'];

    if(authRequired && !loggedIn)
    {
        return next('/login');
    }

    // store.commit('MessageStore/resetFilters');

    next();
});


export default router;
