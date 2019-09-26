<template>
  <div class="con-right">
    <div class="import-wrap">
      <h2 class="wrap-title">批量导出</h2>
      <div class="import-con">
        <div class="importNav">
          <a href="javascript:;" :class="{current:type==1}" @click="selectType(1)">导出</a>
          <a href="javascript:;" :class="{current:type==2}" @click="selectType(2)">导入</a>
        </div>
        <div class="importNav-con">
          <div class="labelItem">
            <div class="item">
              <span class="label">请选择对应分类操作</span>
              <div class="val">
                <el-select v-model="oneTypeVal" placeholder="请选择品牌" class="oneType">
                  <el-option v-for="item in oneType" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="twoTypeVal" placeholder="请选择品牌" class="twoType">
                  <el-option v-for="item in twoType" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="item" v-if="type==1">
              <span class="label">请选择对应分类操作</span>
              <div class="val">
                <el-radio v-model="radio" label="1">模板</el-radio>
                <el-radio v-model="radio" label="2">对应分类数据</el-radio>
              </div>
            </div>
          </div>
          <a href="javascript:;" class="btn" v-if="type==1">导出</a>
          <a href="javascript:;" class="btn" v-else>导入</a>
          <p class="tip" v-if="type==1"><span>*</span>任务完生成，请留意“<span>商品操作任务</span>”选项卡</p>
          <p class="tip" v-else>
            需求说明：<br>
            1.根据切换国家的不同，直接关联导入或者导出该国家的商品数据；<br>
            2.导入数据时必须校验表格的表头是否与模版的表头相一致；（分类模版）通过附件形式提供；<br>
            3.所有导入的数据会直接存放于商品列表“待审核”列表；<br>
            4.导入、导出功能，都走任务流模式；
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      type: 1,
      oneType: [
        {
          id: 1,
          name: '我是测试'
        },
        {
          id: 2,
          name: '我是测试'
        }
      ],
      oneTypeVal: '',
      twoType: [
        {
          id: 1,
          name: '我是测试'
        },
        {
          id: 2,
          name: '我是测试'
        }
      ],
      twoTypeVal: '',
      radio: '2',
    }
  },
  created () {

  },
  mounted () {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('demo', ['increment', 'decrement', 'getProvince']),
    selectType (type) {
      this.type = type
    }
  },
}
</script>
<style lang="scss" scoped>
.import-wrap {
  .import-con {
    padding: 20px;
  }
  .labelItem {
    padding: 30px 50px 30px;
    border-bottom: 1px dashed #dddddd;
    .val {
      margin-left: 140px;
      line-height: 40px;
    }
    .label {
      line-height: 40px;
      font-size: 12px;
    }
    .twoType {
      margin-left: 20px;
    }
  }
  .importNav {
    border-bottom: 1px solid #dddddd;
    padding: 0 30px;
    a {
      padding: 10px 21px;
      border-bottom: 2px solid transparent;
      display: inline-block;
      margin-bottom: -1px;
      margin-right: 40px;
      font-size: 14px;
      color: #999999;
      &.current {
        color: #3985fe;
        border-color: #3985fe;
      }
    }
  }
  /deep/.el-input__inner {
    display: block;
  }
  .btn {
    width: 220px;
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgba(57, 133, 254, 1);
    color: #fff;
    font-size: 12px;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 50px;
  }
  .tip {
    color: #cccccc;
    font-size: 12px;
    margin-left: 50px;
    span {
      color: #f85a5a;
    }
  }
}
</style>