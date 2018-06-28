// import NProgress from 'nprogress'
import Layout from '@/components/Layout'
import Heade from '@/components/Heade'
import Foote from '@/components/Foote'
import Aside from '@/components/Aside'
import utils from '@/utils'
import './app.scss'

// let lastHref
export default {
    name: 'App',

    props: {},

    components: { Layout, Heade, Foote, Aside },

    created() {
        // if(!this.$store.state.userInfo.username){
        //     if (this.getCookie('hooli_token')) {
        //         //拿到token发售请求获取用户信息
        //         this.$store.dispatch('addUserInfo',{username:'aaa'})
        //     } else {
        //         //跳到登陆页进行登陆
        //         this.$router.push({path:'/login'})
        //     }
        // }
    },
    render() {
        let { pathname } = location
        pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
        // const { href } = window.location
        // console.log(href)

        const { openPages } = utils.config

        // if (lastHref !== href) {
        //     NProgress.start()
        //     if (!loading.global) {
        //         NProgress.done()
        //         lastHref = href
        //     }
        // }
        // 如果是登陆页面
        if (openPages && openPages === pathname) {
            return (
                <div id="app">
                    <router-view />
                </div>
            )
        }

        return (
            <div id="app">
                <Layout>
                    <template slot="aside">
                        <Aside/>
                    </template>
                    <template slot="header">
                        <Heade/>
                    </template>
                    <template slot="main">
                        <div style="background-color: #fff;">
                            <router-view />
                        </div>
                    </template>
                    {/* <template slot="footer">
                        <Foote/>
                    </template> */}
                </Layout>
            </div>
        );
    },

    methods: {
        clickThumbHandler() { },
    },
};
