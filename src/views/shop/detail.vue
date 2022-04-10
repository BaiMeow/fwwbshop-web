<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { http } from "/@/utils/http";
import { formatTimeDuring, FormatTime } from "/@/utils/shop";
import { ref, computed } from "vue";
import { errorMessage, successMessage } from "/@/utils/message";

const router = useRouter();
const route = useRoute();
const id = route.query?.id;

let good = ref({
  price: 1,
  id: 1,
  name: "1",
  stock: 1,
  totalstock: 1,
  description: "1",
  detail: "1",
  beginDate: 1,
  endDate: 1
});
let TimeOfShop = ref("");

http.get("/api/shop/item?id=" + id).then((resp: any) => {
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
  http
    .get("/api/shop/item/getUrl?id=" + id)
    .then(({ md5 }) => {
      http
        .post("/api/shop/item/execution/", { params: { md5: md5 } })
        .then((resp: string) => {
          successMessage(resp);
        })
        .catch(error => {
          errorMessage("秒杀失败:" + error.response.data);
          return;
        });
    })
    .catch(error => {
      errorMessage("秒杀失败:" + error.response.data);
      if (error.response.status == 520) {
        router.push("/myshop/info");
      }
    });
}
let disabled = computed(() => {
  let t = new Date();
  if (
    t.valueOf() / 1000 < good.value.beginDate ||
    t.valueOf() / 1000 > good.value.endDate
  ) {
    return true;
  }
  return false;
});
</script>

<template>
  <div class="itemDetail">
    <el-card>
      <h1>{{ good.name }}</h1>
      <el-divider />
      <el-progress
        type="circle"
        :percentage="
          Math.floor(100 * ((good.totalstock - good.stock) / good.totalstock))
        "
      >
        {{ good.totalstock - good.stock }} / {{ good.totalstock }}
      </el-progress>
      <div v-html="good.detail" />
      <div>
        秒杀时间:{{ FormatTime(good.beginDate) }} -
        {{ FormatTime(good.endDate) }}
      </div>
      <div>{{ TimeOfShop }}</div>
      <el-button @click="buy" type="primary" size="large" :disabled="disabled"
        >秒杀</el-button
      >
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.itemDetail {
  height: 100%;
}
</style>
