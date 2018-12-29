export default {
    methods: {
        goPay() {
            console.log(2322222222222222222);
            console.log(this.orderId);
            console.log(this.getCookie("WeiId"));
            console.log(this.id);
            if ((this.orderId != "undefined") && (this.orderId != "null") && (this.orderId != "")) {
                var ua = navigator.userAgent.toLowerCase();
                var isWeixin = ua.indexOf('micromessenger') != -1;
                if (isWeixin) {
                    console.log("在微信浏览器");

                    //用于支付成功和失败页的参数，5个，
                    localStorage.dingdan_id = this.id;  //订单编号
                    localStorage.orderId = this.orderId; //订单id
                    if (document.cookie.indexOf("WeiId=") != -1) {
                        this.openid = this.getCookie("WeiId");
                        console.log(this.openid);
                        if(!this.openid){
                            this.$router.push({
                                path:'/riverDetail'
                            })
                        }
                        this.axios.post("/ticket/wx/jsapi/unifiedOrder?orderNum="+localStorage.dingdan_id + "&openid=" + this.openid + "&tradeType=JSAPI"
                        )
                            .then(res => {
                                console.log(res);
                                if (res.data.result == 1) {
                                    //调起微信公众号支付
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', res.data.value,
                                        function (res) {
                                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                                // alert("支付成功");
                                                var xhr = new XMLHttpRequest();
                                                //alert("id"+localStorage.id);
                                                xhr.open('POST', "/ticket/wx/getPayResult?orderNum="+localStorage.dingdan_id, true);
                                                xhr.onload = function () {
                                                    //alert("后台测试是否支付成功");
                                                    console.log("请求成功");
                                                    var zhifu = JSON.parse(xhr.responseText);
                                                    //alert(JSON.stringify(zhifu));
                                                    if (zhifu.result == 1) {
                                                        //alert("后台测试支付成功-----");
                                                        window.location.href = "http://genius.enn.cn/encdata-ticket/#/river_payMent_success";
                                                    } else {
                                                        //alert("后台测试支付失败-----");
                                                        window.location.href = "http://genius.enn.cn/encdata-ticket/#/river_payMent_error?id="+localStorage.orderId+"&lnum="+localStorage.dingdan_id;
                                                    }
                                                }
                                                xhr.send(null);
                                            }
                                            if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                                //alert("支付过程中用户取消");
                                                window.location.href = "http://genius.enn.cn/encdata-ticket/#/river_payMent_error?id="+localStorage.orderId+"&lnum="+localStorage.dingdan_id;
                                            }
                                        }
                                    );
                                } else if (res.data.result == 2) {
                                    alert("后台无此订单信息");
                                } else if (res.data.result == 3) {
                                    alert("订单不处于待支付状态");
                                } else if (res.data.result == 4) {
                                    alert("后台报错");
                                }
                            })
                            .catch(() => { });
                    } else {
                        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcdbacc55093a60d0&redirect_uri=http%3A%2F%2Fgenius.enn.cn%2Fencdata-ticket%2F%23%2FriverDetail&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
                    }
                } else {
                    console.log("不在微信浏览器");
                    alert("请在微信浏览器中支付！")
                }
            }
        },
        getCookie(c_name) {
            var that = this;
            if (document.cookie.length > 0) {
                //检查这个cookie是否存在，不存在就为 -1
                var c_start = document.cookie.indexOf(c_name + "=")
                if (c_start != -1) {
                    //获取cookie值的开始位置
                    c_start = c_start + c_name.length + 1;
                    //通过";"号是否存在来判断结束位置
                    var c_end = document.cookie.indexOf(";", c_start);

                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    //通过substring()得到了值
                    return unescape(document.cookie.substring(c_start, c_end))
                }
            }
            return null
        }
    }
}
