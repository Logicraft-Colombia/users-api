import type { alert } from '#build/ui';
import { defineStore } from 'pinia';
export const useMainStore = defineStore('main', {
    state: () => ({
        loading: false,
        alert: {
            show: false,
            message: '',
            type: '', // success, error, warning, info
            title: '',
            showCloseButton: true,
            showAcceptButton: false,
            onAccept: null as (() => void) | null, // Optional custom accept handler
        }
    }),
    actions: {
        enableLoader() {
            this.loading = true;
        },
        disableLoader() {
            this.loading = false;
        },
        showAlert(options: Partial<typeof this.alert>) {
            this.alert = { ...this.alert, ...options, show: true };
        },
        hideAlert() {
            this.alert.show = false;
        },
    },
});