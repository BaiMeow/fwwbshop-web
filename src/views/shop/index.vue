<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { http } from "/@/utils/http";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import { ref } from "vue";
const router = useRouter();
const route = useRoute();

interface item {
  price: number;
  id: number;
  name: string;
  stock: number;
  description: string;
  detail: string;
  beginDate: number;
  endDate: number;
}

let items = ref([]);

http
  .get("/api/shop/itemlist")
  .then((resp: Array<item>) => {
    items.value = resp;
  })
  .catch(function (error) {
    ElNotification({
      title: "获取抢购商品列表失败,将在3秒后返回登录界面",
      message: error["message"],
      type: "error"
    });
    setTimeout(function () {
      router.push("/login");
    }, 3000);
  });

function FormattTime(time: number) {
  var t = new Date(time * 1000);
  return t.toLocaleString();
}

function toDetail(ItemId: number, ItemName: string) {
  useMultiTagsStoreHook().handleTags("push", {
    path: `/shop/detail`,
    parentPath: route.matched[0].path,
    name: "itemDetail",
    query: { id: String(ItemId) },
    meta: {
      title: {
        zh: `${ItemName} - 详情信息`,
        en: `${ItemName} - DetailInfo`
      },
      showLink: false,
      i18n: false,
      dynamicLevel: 3
    }
  });
  router.push({ name: "itemDetail", query: { id: String(ItemId) } });
}
</script>
<template>
  <div class="list">
    <el-row :gutter="20" style="margin: 20px">
      <el-col
        v-for="item in items"
        :key="item.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="6"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <el-card
          shadow="hover"
          :header="item.name"
          @click="toDetail(item.id, item.name)"
          class="item"
        >
          <div>{{ item.description }}</div>
          <div>
            <p>存货:{{ item.stock }}</p>
          </div>
          <div>秒杀开始时间:{{ FormattTime(item.beginDate) }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
