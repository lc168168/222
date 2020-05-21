import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import qs from "qs"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xrdata:[],
    count: '',
  },
  mutations: {
    //页面刷新数据
    'oppdata' (state, action) {
      state.xrdata = action
    },
    //显示页面多少条数据
    'oppdatacount' (state, action) {
      state.count = action
    },
    //搜索
    'Sdata' (state, action) {
      state.xrdata = action
    },
    //删除
    'delededata' (state, action) {
      state.xrdata = action
    },
    //添加
    'adddata' (state, action) {
      state.xrdata = action
    },
    'upsetdata' (state, action) {
      console.log(action)
    }
  },
  actions: {
    //页面刷新数据
    'xrdata' () {
      axios.get('http://api.baxiaobu.com/index.php/home/v5/getuser')
        .then((res) => {
          this.commit('oppdata',res.data.users)
          this.commit('oppdatacount',res.data.users.length)
        })
    },
    //添加数据
    'adddata' (context, action) {
      axios.post('http://api.baxiaobu.com/index.php/home/v5/add',
        qs.stringify(action))
          .then((res) => {
            this.commit('adddata',res.data.users) 
        })
    },
    //删除
    'deldata' (context, action) {
      axios.post(`http://api.baxiaobu.com/index.php/home/v5/deleteUser`,
        qs.stringify({id:action}))
          .then((res) => {
            this.commit('delededata',res.data.users) 
        })
    },
    //搜索
    'Sdata' (context, action) {
      axios.get(`http://api.baxiaobu.com/index.php/home/v5/findUser?keyword=${action}`)
        .then((res) => {
          console.log(res)
          this.commit('Sdata',res.data.users)
        })
    },
    //修改
    'updata' (context, action) {
      axios.post('http://api.baxiaobu.com/index.php/home/v5/updateUser',
        qs.stringify(action))
          .then((res) => {
            console.log(res)
        })
    }
  }
})
