<template>
  <div class="login-container">
    <div class="login-header">
      <img url="../assets/blogo.png" alt="logo">
      <h2>TODO综合业务平台</h2>
    </div>
    <div class="login-box">
      <div class="login-title">
        <button class="btn" @click="getLoginType('signin')">登录</button>
        <span>·</span>
        <button class="btn" @click="getLoginType('signup')">注册</button>
      </div>
      <div v-if="type=='signin'">
        <form class="login-form" ref="formSignIn">
          <input type="text" placeholder="请输入用户名或账号" v-model="form.userLogin" class="login-input" />
          <input type="text" placeholder="请输入密码" v-model="form.password" class="login-input" />
          <input type="submit" value="立即登录" class="login-input" v-loading="loading" @click.stop="handleSignIn" />
        </form>
        <div class="login-footer">
          <div>
            <input type="checkbox" id="remember" /><label for="remember" v-model="form.rememberChecked"
              @click.stop="RememberCheck">记住我</label>
          </div>
          <a href="">忘记密码？</a>
        </div>
      </div>
      <div v-if="type=='signup'">
        <form class="login-form" ref="formSignUp">
          <input type="text" placeholder="请输入用户名或账号" class="login-input" />
          <input type="text" placeholder="请输入密码" class="login-input" />
          <input type="text" placeholder="请再次确认密码" class="login-input" />
          <input type="submit" value="立即注册" class="login-input" @click="handleSignUp" />
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  import { validLoginName, validPassword, validPhone, validEmail } from "@/utils/valid"
  import { login } from "@/api/login"
  export default {
    computed: {
    },
    data() {
      return {
        type: '',
        form: {
          userLogin: "",
          password: ""
        },
        loading: false
      }
    },
    methods: {
      getLoginType(type = 'signin') {
        this.type = type
      },
      async handleSignIn() {
        if(validLoginName(this.form.userLogin)){
          this.$message.warning("请检查用户名或账号格式！")
          return false
        }
        if(validPassword(this.form.password)){
          this.$message.warning("密码应为8到10位字母或数字！")
          return false
        }
        if(this.form.rememberChecked){
          this.setCookie(this.formLogin.userLogin, this.formLogin.password, 7)
        }else{
          this.clearCookie()
        }
        this.loading = true
        console.log(this.form)
        try {
          let res = await login(this.form)
          this.loading = false
          if(res.code == 200){
            this.clearInput();
            this.$message.success("登录成功！")
            this.$store.dispath('userInfo/saveInfo',res.data)
            this.$router.push('./home')
          }else{
            this.$message.error(msg)
          }
        } catch (error) {
          this.loading = false
        }
      },
      handleSignUp() {

      },
      RememberCheck() {

      },
      setCookie(userName,password,exdays){
        let exdate = new Date()
        exdate.setTime(exdate.getTime() + exdays*24*3600*1000)
        window.document.cookie = 'userName='+userName+';path:/;expires='+exdate.toUTCString()
        window.document.cookie = 'password='+password+';path:/;expires='+exdate.toUTCString()
      },
      clearCookie(){
        this.setCookie('','',-1)
      },
      clearInput(){
        this.form = {
          userLogin: "",
          password: ""
        }
      },
    },
    created() {
      this.getLoginType()
    }
  };
</script>

<style lang="scss" scoped>
  body {
    width: 100%;
    height: 100%;

    .login-container {
      width: 100%;
      height: 100%;
      background: url('../assets/bg.png') no-repeat;
      background-size: cover;

      .login-header {
        padding-top: 40px;
        padding-left: 30px;
        color: #fff;

        h2 {
          display: inline-block;
        }
      }

      .login-box {
        position: absolute;
        left: 64vw;
        top: 32vh;
        width: 420px;
        height: 300px;
        background-color: #fff;
        text-align: center;
        padding: 30px 30px;

        .login-title {
          padding: 10px 0px;
          font-size: 30px;
          color: #969696;
          letter-spacing: 6px;

          .btn {
            border: none;
            background-color: inherit;
            font-size: 30px;
            color: #969696;
            letter-spacing: 6px;
          }

          .btn:hover {
            color: #409EFF;
          }
        }

        .login-form {
          display: -webkit-flex;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .login-input {
            border: none;
            margin: 10px 0px;
            padding: 10px 0px;
            font-size: 16px;
            outline-style: none;
            border-bottom: 2px solid #EBEEF5;
            color: #969696
          }

          input[type='text']:focus {
            border-bottom: 2px solid rgb(121, 187, 255);
          }
        }

        .login-footer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 10px 0px;

          #remember {
            display: inline-block;
            height: 21px;
            margin: 0 3px;
            vertical-align: middle;
          }

          input:checked {
            color: #409EFF;
          }

          label {
            display: inline-block;
            height: 21px;
            line-height: 21px;
            vertical-align: middle;
          }

          a {
            text-decoration: none;
            color: #409EFF;
            display: inline-block;
            height: 21px;
          }

          a::after {
            color: #2c3e50
          }
        }
      }
    }
  }
</style>