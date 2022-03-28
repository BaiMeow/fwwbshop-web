<script setup lang="ts">
import { useRoute } from "vue-router";
import { http } from "/@/utils/http";
import { formatTimeDuring } from "/@/utils/shop";
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

http.get("/api/shop/item?id=" + id).then(response => {
  good = response["data"];
});
setInterval(() => {
  let t = new Date();
  let dur1 = good.value.beginDate.valueOf() - t.valueOf() / 1000;
  let dur2 = good.value.endDate.valueOf() - t.valueOf() / 1000;
  if (dur1 > 0) {
    TimeOfShop.value = "距离秒杀开始还有:" + formatTimeDuring(dur1);
  } else if (dur1 <= 0 && dur2 >= 0) {
    TimeOfShop.value = "秒杀还有" + formatTimeDuring(dur2) + "结束";
  }
  TimeOfShop.value = "秒杀已经结束";
}, 1000);
</script>

<template>
  <div class="itemDetail">
    <el-card>
      {{ TimeOfShop }}
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.itemDetail {
  height: 100%;
}
</style>
