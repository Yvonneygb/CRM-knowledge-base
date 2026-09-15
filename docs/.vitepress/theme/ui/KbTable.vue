<template>
  <div class="kb-table-wrap">
    <table class="kl-table" :class="{ striped }">
      <thead v-if="columns.length">
        <tr>
          <th v-for="col in columns" :key="col.key" :style="col.width ? { width: col.width } : null">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, ri) in rows" :key="ri">
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>
        <slot name="rows" />
      </tbody>
      <slot />
    </table>
  </div>
</template>

<script setup>
// 数据表格：基于 columns / rows 渲染；也可通过默认 slot 自定义行列
defineProps({
  columns: { type: Array, default: () => [] }, // [{ key, label, width? }]
  rows: { type: Array, default: () => [] }, // [{ key: value }]
  striped: { type: Boolean, default: true },
})
</script>

<style scoped>
.kb-table-wrap { width: 100%; overflow-x: auto; }
.kl-table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0 16px 0;
  font-size: 0.85rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.kl-table th {
  background: #f5f3ff;
  color: #6d28d9;
  font-weight: 700;
  text-align: left;
  padding: 10px 12px;
  border-bottom: 2px solid #ddd6fe;
  font-size: 12px;
}
.kl-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #374151;
  vertical-align: top;
}
.kl-table.striped tbody tr:nth-child(even) { background: #fafafc; }
.kl-table tbody tr:hover { background: #f5f3ff; }
.kl-table tr:last-child td { border-bottom: none; }
</style>
