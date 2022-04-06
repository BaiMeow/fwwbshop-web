<script setup lang="ts">
import { http } from "/@/utils/http";
import { ref } from "vue";
interface order {
  date: string;
  order_number: number;
  name: string;
  price: number;
  discription: string;
}
let orders = ref([]);
http.get("/api/dashboard/orderlist").then((resp: Array<order>) => {
  orders.value = resp;
});
function OrderDetail() {
  console.log(this);
}
</script>
<template>
  <div class="orderlist">
    <el-card>
      <el-table :data="orders" border stripe @row-click="OrderDetail">
        <el-table-column prop="date" label="购买日期" sortable />
        <el-table-column
          prop="order_number"
          width="200px"
          label="流水号"
          sortable
        />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="price" label="价值" />
        <el-table-column prop="discription" label="简述" />
      </el-table>
    </el-card>
  </div>
</template>

<style type="scss">
.orderlist {
  height: 100%;
}
</style>
