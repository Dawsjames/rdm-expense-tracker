<template lang="pug">
    .spending-chart.q-pa-md.rounded-borders
      h6.q-mt-none.q-mb-md Spending Trends
      
      .chart-container(style="height: 200px")
        div(v-if="loading")
          q-spinner
          span.q-ml-sm Loading chart data...
        
        q-tabs(
          v-model="activeTab"
          dense
          class="text-grey"
          active-class="text-primary"
          indicator-color="primary"
          align="left"
        )
          q-tab(name="spending" label="Spending")
          q-tab(name="categories" label="Categories")
          q-tab(name="recent" label="Recent")
        
        q-tab-panels(v-model="activeTab" animated)
          q-tab-panel(name="spending")
            .row.chart-area.justify-center.items-end.q-gutter-x-sm(style="height: 150px")
              .chart-bar(
                v-for="(item, index) in chartData"
                :key="index"
                :style="{ height: `${getBarHeight(item.amount)}px` }"
              )
                .text-caption.q-mt-sm {{ item.day }}
          
          q-tab-panel(name="categories")
            p Categories will go here
    
          q-tab-panel(name="recent")
            p Recent transactions will go here
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useDashboardStore } from './store'

const dashboardStore = useDashboardStore()
const activeTab = ref('spending')

const loading = computed(() => dashboardStore.loading)

const chartData = computed(() => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const data = dashboardStore.dailySpending

    // Ensure all days of the week are represented
    return weekdays.map(day => {
        const existingData = data.find(item => item.day === day)
        return {
            day,
            amount: existingData ? existingData.amount : 0
        }
    })
})

const maxAmount = computed(() => {
    const amounts = chartData.value.map(item => item.amount)
    return Math.max(...amounts, 1) // Avoid division by zero
})

const getBarHeight = (amount: number) => {
    // Calculate relative height (max 120px)
    const maxHeight = 120
    return (amount / maxAmount.value) * maxHeight
}
</script>

<style lang="scss" scoped></style>