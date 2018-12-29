/**
 * Created by superman on 18/10/19
 * http配置
 */

import axios from 'axios'
import router from './router'

// axios.defaults.timeout = 5000
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    // 返回 401 清除token信息并跳转到登录页面
                    var exdate = new Date(); //获取时间
                    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * -1);
                    window.document.cookie = "userName" + "=" + "" + ";path=/;expires=" + exdate.toGMTString();
                    window.document.cookie = "phone" + "=" + "" + ";path=/;expires=" + exdate.toGMTString();
                    localStorage.removeItem('token');
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

export default axios
