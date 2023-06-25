<template>
  <div class="pagination">
    <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo == 1">
      上一页
    </button>
    <button v-if="startAndEnd.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button v-if="startAndEnd.start > 2">···</button>

    <button
      v-for="page in startAndEnd.end"
      :key="page"
      v-if="page >= startAndEnd.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="startAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <h3>pageNo:{{ pageNo }}--totalPage:{{ totalPage }}--total:{{ total }}</h3>
    <h3>start:{{ startAndEnd.start }}--end:{{ startAndEnd.end }}</h3> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continueSize"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      const { totalPage, pageNo, continueSize } = this;
      let start = 0;
      let end = 0;
      //特殊1：总页数小于连续页码数
      if (totalPage < continueSize) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continueSize / 2);
        end = pageNo + parseInt(continueSize / 2);
        //特殊2:
        if (start <= 0) {
          start = 1;
          end = continueSize;
        }
        //特殊3
        if (end > totalPage) {
          start = totalPage - continueSize + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>