<script setup lang="ts">
import { useRoute } from "vue-router";
import { item } from "/@/utils/shop";
import { http } from "/@/utils/http";
import { ref, onMounted } from "vue";
import { successMessage, errorMessage } from "/@/utils/message";
const route = useRoute();
let id = route.query?.id;
let good = ref({
  price: 0,
  id: -1,
  name: "",
  stock: 0,
  description: "",
  detail: "",
  beginDate: 0,
  endDate: 0
});
onMounted(() => {
  if (id == "-1") {
    good.value.name = "新商品";
  } else {
    http
      .get("/api/shop/item?id=" + id)
      .then((resp: item) => {
        good.value = resp;
      })
      .catch(err => {
        errorMessage(err.toString());
      });
  }
});
const FormatId = (id: number) => {
  if (id == -1) {
    return "暂未分配";
  }
  return id;
};
const submit = () => {
  let params = new URLSearchParams({
    id: good.value.id.toString(),
    price: good.value.price.toString(),
    name: good.value.name.toString(),
    stock: good.value.stock.toString(),
    description: good.value.description,
    detail: good.value.detail,
    beginDate: Math.floor(good.value.beginDate / 1000).toString(),
    endDate: Math.floor(good.value.endDate / 1000).toString()
  });
  var path;
  if (id == "-1") {
    path = "/api/admin/additem";
  } else {
    path = "/api/admin/changeitem";
  }
  http
    .post(path, { data: params.toString() })
    .then((msg: string) => {
      successMessage(msg);
    })
    .catch(err => {
      errorMessage(err.toString());
    });
};
</script>
<template>
  <div>
    <el-card>
      <el-form label-width="120px" :column="2">
        <el-form-item label="理财ID">
          {{ FormatId(good.id) }}
        </el-form-item>
        <el-form-item label="理财名称">
          <el-input v-model="good.name" />
        </el-form-item>
        <el-form-item label="理财库存">
          <el-input v-model="good.stock" />
        </el-form-item>
        <el-form-item label="理财单价">
          <el-input v-model="good.price">
            <template #prepend>￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="理财简述">
          <el-input
            v-model="good.description"
            type="textarea"
            autosize
            span="2"
          />
        </el-form-item>
        <el-form-item label="理财详细信息">
          <el-input v-model="good.detail" type="textarea" autosize span="2" />
        </el-form-item>
        <el-form-item label="秒杀开始时间">
          <el-date-picker
            type="datetime"
            value-format="x"
            v-model="good.beginDate"
          />
        </el-form-item>
        <el-form-item label="秒杀截止时间">
          <el-date-picker
            type="datetime"
            value-format="x"
            v-model="good.endDate"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
