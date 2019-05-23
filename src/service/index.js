import service from "./axios-config";
import '@/utils/global'
class serviceManger {
    //登录
    login(username, password,logintype) {
        return new Promise((resolve, reject) => {
            return service
                .post(global.backUrl+"user/user_login", {
                    username,
                    password,
                    logintype
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    //获取用户信息
    getInfo(token) {
        return new Promise((resolve, reject) => {
            return service({
                url: "/user/getInfo",
                method: "get",
                params: { token }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    //退出登录
    logout(token) {
        return new Promise((resolve, reject) => {
            return service({
                url: "/user/logout",
                method: "post"
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
export default new serviceManger();