<template>
  <div>
    <el-row :gutter="24">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
      >
        <el-card>
          正在秒杀
          <el-table border style="margin-top: 20px">
            <el-table-column label="id" />
            <el-table-column label="商品名称" />
            <el-table-column label="库存" />
          </el-table>
        </el-card> </el-col
      ><el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
        style="margin-bottom: 20px"
      >
        <el-card>流水</el-card></el-col
      ></el-row
    >
  </div>
</template>
