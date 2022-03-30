<script setup lang="ts">
import { useRoute } from "vue-router";
import { http } from "/@/utils/http";
import { formatTimeDuring, formatTime, item } from "/@/utils/shop";
import { ref } from "vue";

const route = useRoute();
const id = route.query?.id ?? -1;

let good = ref({
  price: 1,
  id: 1,
  name: "1",
  stock: 1,
  description: "1",
  detail: "1",
  beginDate: 1,
  endDate: 1
});
let TimeOfShop = ref("");

http.get("/api/shop/item?id=" + id).then((resp: item) => {
  good.value = resp;
});
setInterval(() => {
  let t = new Date();
  let dur1 = good.value.beginDate.valueOf() - t.valueOf() / 1000;
  let dur2 = good.value.endDate.valueOf() - t.valueOf() / 1000;
  if (dur1 > 0) {
    TimeOfShop.value = "距离秒杀开始还有:" + formatTimeDuring(dur1);
  } else if (dur1 <= 0 && dur2 >= 0) {
    TimeOfShop.value = "秒杀还有" + formatTimeDuring(dur2) + "结束";
  } else {
    TimeOfShop.value = "秒杀已经结束";
  }
}, 1000);

function buy() {
  http.get("/api/shop/item/getUrl?id=" + id).then(({ md5 }) => {
    http
      .post("/api/shop/item/execution/", { params: { md5: md5, itemId: id } })
      .then();
  });
}
</script>

<template>
  <div class="itemDetail">
    <el-card>
      <h1>{{ good.name }}</h1>
      <el-divider />
      <div>{{ good.detail }}</div>
      <div>秒杀开始时间:{{ formatTime(good.beginDate) }}</div>
      <div>秒杀结束时间:{{ formatTime(good.endDate) }}</div>
      <div>秒杀状态:{{ TimeOfShop }}</div>
      <el-button @click="buy" type="primary" size="large">秒杀</el-button>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.itemDetail {
  height: 100%;
}
</style>
