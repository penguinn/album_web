var domain = "/campus-server";
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Campus',
        registerInfo: {
            loginName: '',
            password: '',
            confirm:'',
        },
        loginInfo: {
            loginName: '',
            password: ''
          },
    },
    methods: {
        errorNotify(title,message) {
            this.$notify.error({
                title: title,
                message: message
            });
        },
  
        successNotify(title,message) {
          this.$notify({
            title: title,
            message: message,
            type: 'success'
          });
        },

        warnMessage(message) {
            this.$message({
                message: message,
                type: 'warning'
            });
        },

        switchLogin:function(){
            document.getElementById("registerForm").style.display = 'none';
            $("#loginForm").show();
        },

        switchRegister:function(){
            document.getElementById("loginForm").style.display = 'none';
            $("#registerForm").show();
        },

        login:function () {
            var vm = this;
            let logName = $.trim(vm.loginInfo.loginName);
            let logPassword = $.trim(vm.loginInfo.password);
            if(logName == null || logName.length == 0){
                vm.warnMessage('抱歉, 请输入用户名~');
            }
            if(logPassword == null || logPassword.length == 0){
                vm.warnMessage('抱歉, 请输入密码~');
            }
            let logPasswordMd5 = md5(logPassword);
            $.ajax({
                type: 'POST',
                url: domain + '/user/login',
                dataType: "json",
                data: {
                    loginName: logName,
                    password: logPasswordMd5,
                },
                success: function (res) {
                    if(res.succ == true){
                        vm.successNotify("登录成功","欢迎你: " + logName);
                    }else{
                        vm.errorNotify("登录失败",res.msg);
                    }
                },
                error:function (res) {
                    vm.errorNotify("登录失败","我们错了: " + logName);
                }

            });
        },

        register:function () {
            let vm = this;
            let regName = $.trim(vm.registerInfo.loginName);
            let regPassword = $.trim(vm.registerInfo.password);
            let regConfirm = $.trim(vm.registerInfo.confirm);
            if(regName == null || regName.length == 0){
                vm.warnMessage('抱歉, 请输入用户名~');
            }
            if(regPassword == null || regPassword.length == 0){
                vm.warnMessage('抱歉, 请输入密码~');
            }

            if(regConfirm == null || regConfirm.length == 0){
                vm.warnMessage('抱歉, 情重复输入密码~');
            }

            if(regPassword != regConfirm){
                vm.warnMessage('抱歉, 两次密码不一致~');
            }

            let regPasswordMd5 = md5(regPassword);

            let regConfirmMd5 = md5(regConfirm);

            $.ajax({
                type: 'POST',
                url: domain + '/user/register',
                dataType: "json",
                data: {
                    loginName: regName,
                    password: regPasswordMd5,
                    confirm: regConfirmMd5,
                },
                success: function (res) {
                    if(res.succ == true){
                        vm.successNotify("注册成功","欢迎你: " + regName);
                    }else{
                        vm.errorNotify("注册失败",res.msg);
                    }
                },
                error:function (res) {
                    vm.errorNotify("注册失败","我们错了: " + regName);
                }

            });
        },

      }
})