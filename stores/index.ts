import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Payments} from "~/types/payments.type";

export const useGlobalStore = defineStore('payments', () => {
    const payments = ref(null)
    const countries = ref([])

    const getPayments = async () => {
        try {
            const {data} = await useFetch<Payments>('/api/payments')
            if (data.value) {
                payments.value = data.value
                const comparedCountries = []
                Object.entries(data.value.payments).forEach(([key, _]) => {
                    switch (key) {
                        case 'US':
                            comparedCountries.push({label: 'United states', icon: 'usa', value: key})
                            break
                        case 'PT':
                            comparedCountries.push({label: 'Portuguese', icon: 'portuguese', value: key})
                            break
                        case 'ES':
                            comparedCountries.push({label: 'Spanish', icon: 'spanish', value: key})
                            break
                    }
                })
                countries.value = comparedCountries
            }
        } catch (error) {
            console.error('Failed to fetch payments:', error)
        }
    }

    return {
        payments,
        countries,
        getPayments,
    }
})