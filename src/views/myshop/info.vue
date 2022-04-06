<script setup lang="ts">
import { http } from "/@/utils/http";
import { errorMessage } from "/@/utils/message";
import { ref } from "vue";
interface Info {
  name: string;
  age: number;
  phone_num: number;
  id_card: string;
}
let name = ref("123");
let age = ref(0);
let phone = ref(0);
let id_card = ref("");
http
  .get("/api/user/information")
  .then((resp: Info) => {
    name.value = resp.name;
    phone.value = resp.phone_num;
    age.value = resp.age;
    id_card.value = resp.id_card;
  })
  .catch(err => {
    errorMessage(err.toString());
  });
</script>
<template>
  <div class="info">
    <el-card>
      <el-descriptions title="个人信息" border :column="2">
        <el-descriptions-item>
          <template #label>
            <div>
              <IconifyIconOffline icon="fa-user" />
              姓名
            </div>
          </template>
          {{ name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label
            ><div>
              <IconifyIconOffline icon="fa-calendar" />
              年龄
            </div></template
          >
          {{ age }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label
            ><div>
              <IconifyIconOffline icon="fa-address-card" />
              身份证
            </div></template
          >
          {{ id_card }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label
            ><div>
              <IconifyIconOffline icon="fa-phone" />
              电话
            </div></template
          >
          {{ phone }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.info {
  width: 50%;
}
</style>
