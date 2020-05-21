<template>
  <div class="home">
    <div class="top">
        <el-row>
            <input type="text" v-model="search">
            <el-button type="success" @click="searchdata">搜用户</el-button>
        </el-row>
    </div>
    <div class="con">
        <div class="div1">
            <el-row>
                <el-button type="primary" @click="dialogVisible = true">
                    添加用户
                </el-button>
            </el-row>
            <el-dialog
                title="添加"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
            >
                <span class="btoop">
                    <span>用户名 :<input type="text" v-model="add.name"></span>
                    <span>密码 :<input type="text" v-model="add.age"></span>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onadd">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="div2">
            共有数据{{count}}条
        </div>
    </div>
    <div class="fot">
       <el-table
        :data="xrdata"
        stripe
        style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="用户名" width="180"></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                    >
                    编辑
                    </el-button>
                    <el-dialog
                            title="修改"
                            :visible.sync="dialogVisible1"
                            width="30%"
                            :before-close="handleClose">
                            <span class="btoop">
                                <input type="hidden" v-model="updata.id">
                                <span>用户名 :<input type="text" v-model="updata.name"></span>
                                <span>密码 :<input type="text" v-model="updata.age"></span>
                            </span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="uptrue">确 定</el-button>
                            </span>
                        </el-dialog>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import './style.less'
import axios from "axios"
import { mapState } from "vuex"
export default {
 	data () {
 		return{
             dialogVisible: false,
             dialogVisible1: false,
             add: {
                 name: '',
                 age: ''
             },
             updata: {
                 name: '',
                 age: '',
                 id: ''
             },
             search: '',
 		}
     },
    methods: {
      //修改弹出框  
      handleEdit(index, row) {
        this.dialogVisible1 = true
        this.updata.name = row.name
        this.updata.age = row.age
        this.updata.id = row.id
      },
      //删除
      handleDelete(index, row) {
        this.$store.dispatch('deldata',row.id)
        console.log(row.id)
        this.$store.dispatch('xrdata')
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //添加
      onadd () {
          this.$store.dispatch('adddata',this.add)
          this.dialogVisible=false
          this.$store.dispatch('xrdata')
          this.add.name = ""
          this.add.age = ""
      },
      //搜索
      searchdata () {
          if (this.search === "") {
              this.$store.dispatch('xrdata')
          } else {
              this.$store.dispatch('Sdata',this.search)
          }
      },
      //修改
      uptrue () {
          this.$store.dispatch('updata',this.updata)
          this.dialogVisible1 = false
          this.$store.dispatch('xrdata')
      }
    },
    computed: {
        ...mapState(['xrdata','count'])
    },
    created () {
        this.$store.dispatch('xrdata')
    },
    
}
</script>
