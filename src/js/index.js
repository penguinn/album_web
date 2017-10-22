var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello album!',
        loginInfo: {
            name: '',
            password: ''
          }
    },
    methods: {
        login() {
          this.$notify({
            title: '登录成功',
            message: '这是一条成功的登录消息',
            type: 'success'
          });
        },
  
        register() {
          this.$notify({
            title: '注册成功',
            message: '这是一条成功的注册消息',
            type: 'success'
          });
        }
      }
})