<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="sku in cartInfoList" :key="sku.id">
          <li class="cart-list-con1">
            
            <input type="checkbox" name="chk_list" :checked="sku.isChecked " @change="updatedChecked(sku,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="sku.imgUrl">
            <div class="item-msg">{{sku.skuName}}</div>
          </li>
         
          <li class="cart-list-con4">
            <span class="price">{{sku.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="minusSkuNum(sku)" class="mins">-</a>
            <input autocomplete="off" type="text" :value="sku.skuNum" minnum="1" class="itxt" @input="changeSkuNum(sku,$event)"> 
            <a @click="addSkuNum(sku)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{sku.skuNum * sku.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCartList(sku.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

       
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!--isAllChecked变化导致勾选状态变化时，不会触发change回调  -->
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updatedCheckedAll" >
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCartList">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{summoney}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
//按需引入lodash节流函数
import throttle from "lodash/throttle";
//按需引入lodash防抖函数
import debounce from "lodash/debounce";
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    
    },
    methods:{
      getData(){
        this.$store.dispatch('getCartList')
      },
      async addSkuNum(sku){
      //直接加
      try {
        await this.$store.dispatch('reqAddOrUpdateShopCart',{skuId:sku.skuId,skuNum:1})
        this.getData()
      } catch (error) {
         alert("修改数量失败");
      }
       
    },
    //节流，一定时间内只能执行一次
    minusSkuNum:throttle(async function (sku){
      if(sku.skuNum>1){
        try {
        await this.$store.dispatch('reqAddOrUpdateShopCart',{skuId:sku.skuId,skuNum:-1})
        this.getData()
      } catch (error) {
         alert("修改数量失败");
      }
      }
    },2000),
    //防抖，
    changeSkuNum:debounce(async function(sku,event){
      let skuNum 
      let resultValue = event.target.value * 1
      if(isNaN(resultValue)||resultValue<1){
        skuNum = 0
      }else{
        skuNum = parseInt(resultValue) - sku.skuNum
      }
       try {
        await this.$store.dispatch('reqAddOrUpdateShopCart',{skuId:sku.skuId,skuNum:skuNum})
        this.getData()
      } catch (error) {
         alert("修改数量失败");
      }
    },500),
    async deleteCartList(skuId){
      try {
         await this.$store.dispatch('deleteCartList',skuId)
         this.getData()
      } catch (error) {
        alert('删除购物车失败')
      }
    },
    async deleteAllCartList(){
      try {
        await this.$store.dispatch('deleteAllCartList')
        this.getData()
      } catch (error) {
         alert('删除购物车失败:'+error.message)
      }
    },
    async updatedChecked(sku,event){
      let isChecked = event.target.checked?'1':'0'
      try {
        await this.$store.dispatch('updatedChecked',{skuId:sku.skuId,isChecked})
         this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async updatedCheckedAll(event){
      console.log('change函数被调用')
      let isChecked = event.target.checked?'1':'0'
      try {
        await  this.$store.dispatch('updatedCheckedAll',isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
    },
    
    computed:{

    ...mapGetters(['shopCartInfo']),//至少是一个空对象
    cartInfoList(){
      return this.shopCartInfo.cartInfoList||[]
    },
    summoney(){
      let sum = 0
      this.cartInfoList.forEach(element => {
        sum += element.skuPrice * element.skuNum
      });
      return sum
    },
    isAllChecked(){
      //every遍历cartInfoList中的isChecked，都为1则返回true，有一个不为0就返回false
      return this.cartInfoList.every(item=>item.isChecked==1)
    },
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>