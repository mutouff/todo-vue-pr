<template>
  <header>
    <div class="header-container">
      <section class="header-section">
        <div class="header-left">
          <figure>
            <img src="../assets/logo2.png" alt="logo" class="logo" width="304" height="228">
          </figure>
          <ul>
            <li>
              <router-link to="/home" class="active">首页</router-link>
            </li>
            <li>
              <a href="https://jackchen0120.github.io/vueDataV/" target="_blank">大数据可视化平台</a>
            </li>
            <li>
              <a href="https://jackchen0120.github.io/vueDataV/" target="_blank">掘金·博文</a>
            </li>
            <li>
              <a href="https://jackchen0120.github.io/vueDataV/" target="_blank">CSDN·博文</a>
            </li>
          </ul>
        </div>
          
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="a">修改密码</el-dropdown-item>
              <el-dropdown-item command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </section>
    </div>
  </header>
  <el-dialog title="修改密码" :append-to-body="true" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" v-dialogdrag @closed="dialogVisible = false)">
    <el-row>
      <el-form ref="form" size="mini" v-model="form" label-width="100px">
        <el-form-item label="旧密码">
          <el-input size="mini" v-model="form.oldPsw"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input size="mini" v-model="form.newPsw"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input size="mini" v-model="form.comfirmPsw"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-button size="mini" @click="submit">确认</el-button>
      <el-button size="mini" @click="cancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getPsw,resetPwd } from '@/utils/api';
export default {
  name:"Header",
  data(){
    return {
      username:this.$store.state.userInfo.data.userData.username,
      dialogVisible:false,
      form:{
        oldPsw:"",
        newPsw:"",
        comfirmPsw:""
      }
    }
  },
  methods:{
    handleCommand(command){
      if(command=='a'){
        this.$refs.form.resetFields();
        this.dialogVisible = true
      }else{
        this.$store.dispath('userInfo/logout')
      }
    },
    submit(){
      this.$refs.form.validate(async valid=>{
        if(valid){
          try {
            let resPsw = await getPsw({psw:this.form.oldPsw})
            if(resPsw != this.form.oldPsw){
              this.$message.warning("密码错误！")
              return false
            }
          } catch (error) {
            
          }
        }else{
          this.$message.warning("请输入必填信息！")
          return false
        }
      })
    },
    cancel(){
      this.$refs.form.resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
  .header-container{
    width: 100%;
    background-color: blueviolet;
    padding: 20px 70px 20px 40px;
    .header-section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      ul{
        display: flex;
        align-items: center;
        margin-left: 60px;
        li{
          margin-right: 40px;
          a{
            color: #fff;
            opacity: 0.5;
            &:hover, &.active{
              opacity: 1;
            }
          }
        }
      }
    }
  }
</style>