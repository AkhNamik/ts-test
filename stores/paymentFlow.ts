import {defineStore} from 'pinia';

interface Country {
    label: string;
    value: string;
    icon: string;
}

interface PaymentsFlowState {
    country: Country | null;
    currentStep: number;
    selectedItemIds: string[];
    method: string | null;
    token: string | null;
    card: string | null;
    timer: number;
    cashKey: number;
}

export const usePaymentsFlowStore = defineStore('paymentsFlow', {
    state: (): PaymentsFlowState => {
        return {
            country: null,
            currentStep: 1,
            selectedItemIds: [],
            method: '',
            token: '',
            card: '',
            timer: 6 * 60,
            cashKey: 0
        };
    },
    actions: {
        init() {
            if (typeof window !== 'undefined') {
                const savedState = localStorage.getItem('paymentsFlow');
                if (savedState) {
                    Object.assign(this.$state, JSON.parse(savedState));
                }
            }
        },
        updateState<K extends keyof PaymentsFlowState>(key: K, value: PaymentsFlowState[K]) {
            if (key in this.$state) {
                this.$state[key] = value;
                this.$state.cashKey = 1;
                localStorage.setItem('paymentsFlow', JSON.stringify(this.$state));
            }
        },
        clearState() {
            this.$reset();
            if (typeof window !== 'undefined') {
                localStorage.removeItem('paymentsFlow');
            }
        },
    }
});
