// stores/dashboardStore.ts
import { defineStore } from 'pinia';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from 'src/boot/firebase';
import { ref, computed } from 'vue';

interface Transaction {
    id: string;
    amount: number;
    category: string;
    date: Date;
    description: string;
}

interface Budget {
    id: string;
    amount: number;
    month: string;
    year: number;
}

export const useDashboardStore = defineStore('dashboard', () => {
    // State
    const transactions = ref<Transaction[]>([]);
    const budget = ref<Budget | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Getters (computed properties)
    const totalSpent = computed(() => {
        return transactions.value.reduce((total, transaction) => total + transaction.amount, 0);
    });

    const remainingBudget = computed(() => {
        if (!budget.value) return 0;
        return budget.value.amount - totalSpent.value;
    });

    const dailySpending = computed(() => {
        // Group transactions by day
        const groupedByDay: Record<string, number> = {};

        transactions.value.forEach(transaction => {
            const day = transaction.date.toLocaleDateString('en-US', { weekday: 'short' });
            if (!groupedByDay[day]) {
                groupedByDay[day] = 0;
            }
            groupedByDay[day] += transaction.amount;
        });

        // Format for chart data
        return Object.entries(groupedByDay).map(([day, amount]) => ({
            day,
            amount
        }));
    });

    // Actions
    async function fetchDashboardData() {
        loading.value = true;
        error.value = null;

        try {
            // Get current month data
            const now = new Date();
            const month = now.getMonth();
            const year = now.getFullYear();

            const startOfMonth = new Date(year, month, 1);
            const endOfMonth = new Date(year, month + 1, 0);

            // Fetch transactions
            const transactionsRef = collection(db, 'transactions');
            const transactionsQuery = query(
                transactionsRef,
                where('date', '>=', Timestamp.fromDate(startOfMonth)),
                where('date', '<=', Timestamp.fromDate(endOfMonth)),
                orderBy('date', 'desc')
            );

            const transactionsSnapshot = await getDocs(transactionsQuery);
            const transactionsData: Transaction[] = [];

            transactionsSnapshot.forEach(doc => {
                const data = doc.data();
                transactionsData.push({
                    id: doc.id,
                    amount: data.amount,
                    category: data.category,
                    date: data.date.toDate(),
                    description: data.description
                });
            });

            transactions.value = transactionsData;

            // Fetch budget
            const budgetsRef = collection(db, 'budgets');
            const budgetsQuery = query(
                budgetsRef,
                where('month', '==', month.toString()),
                where('year', '==', year)
            );

            const budgetsSnapshot = await getDocs(budgetsQuery);

            if (!budgetsSnapshot.empty) {
                const budgetDoc = budgetsSnapshot.docs[0];
                const budgetData = budgetDoc.data();

                budget.value = {
                    id: budgetDoc.id,
                    amount: budgetData.amount,
                    month: budgetData.month,
                    year: budgetData.year
                };
            }
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            error.value = 'Failed to load dashboard data';
        } finally {
            loading.value = false;
        }
    }

    // Return everything that should be available in the store
    return {
        transactions,
        budget,
        loading,
        error,
        totalSpent,
        remainingBudget,
        dailySpending,
        fetchDashboardData
    };
});