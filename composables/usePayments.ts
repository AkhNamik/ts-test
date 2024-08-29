import {useGlobalStore} from '~/stores'

export const usePayments = async () => {
    const globalStore = useGlobalStore()

    if (!globalStore.payments) {
        await globalStore.getPayments()
    }
    return globalStore.payments
}