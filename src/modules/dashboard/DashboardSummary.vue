<template lang="pug">
.budget-summary.q-pa-md.q-mb-md.rounded-borders
        h5.q-mt-none.q-mb-sm Monthly Budget
        .text-caption Your spending this month

    .row.q-mb-md
        .col {{ totalSpent }} spent of {{ totalBudget }}
        .col.text-right.text-positive {{ remaining }} left
    
        q-linear-progress(
            :value="spentPercentage"
            size="20px"
            color="primary"
            track-color="grey-3"
        )
    
    .row.q-mt-lg.q-gutter-md
        .col.summary-box.text-center.rounded-borders
            q-icon(name="attach_money" size="24px")
            .text-caption Budget
            .text-weight-bold {{ formatCurrency(totalBudget) }}
            
        .col.summary-box.text-center.rounded-borders
            q-icon(name="shopping_cart" size="24px")
            .text-caption Spent
            .text-weight-bold {{ formatCurrency(totalSpent) }}
            
        .col.summary-box.text-center.rounded-borders
            q-icon(name="trending_up" size="24px")
            .text-caption Remaining
            .text-weight-bold {{ formatCurrency(remaining) }}
    </template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardStore } from './store';

const dashboardStore = useDashboardStore();

const totalBudget = computed(() => {
    return dashboardStore.budget?.amount || 0;
});

const totalSpent = computed(() => {
    return dashboardStore.totalSpent;
});

const remaining = computed(() => {
    return dashboardStore.remainingBudget;
});

const spentPercentage = computed(() => {
    if (totalBudget.value === 0) return 0;
    return totalSpent.value / totalBudget.value;
});

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
};
</script>

<style lang="scss" scoped>
.budget-summary {
    background-color: white;
}

.summary-box {
    padding: 12px;
    background-color: $grey-2;
}
</style>
