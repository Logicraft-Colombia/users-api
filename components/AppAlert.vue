<template>
  <UAlert
		v-if="alert.show"
    :title="alert.title"
		:description="alert.message"
    class="rounded-none"
		:color="alertColor"
		:actions="alertActions" 
  >
	
	<div class="flex justify-end gap-2 mt-4">
      <UButton
        v-if="alert.showCloseButton"
        size="sm"
        variant="outline"
        color="neutral"
        @click="closeAlert"
      >
        {{ $t('general.close') }}
      </UButton>
      <UButton
        v-if="alert.showAcceptButton"
        size="sm"
        color="primary"
        @click="acceptAlert"
      >
        {{  }}
      </UButton>
    </div>
	</UAlert>
</template>
<script lang="ts" setup>

import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useMainStore } from '~/store/main';
const { alert } = storeToRefs(useMainStore()); // make authenticated state reactive with storeToRefs
const { t } = useI18n()

const alertColor = computed(() => useThemeColor(alert.value.type)); // useThemeColor is a function that maps alert types to colors

function useThemeColor(type: string): 'primary' | 'neutral' |'error' | 'success' | 'warning' | 'secondary' {
	const colorMap: Record<string, 'primary' | 'neutral' |'error' | 'success' | 'warning' | 'secondary'> = {
		error: 'error',
		info: 'secondary',
		success: 'success',
		warning: 'warning',
	};

	return colorMap[type] || 'neutral';
}
// Computed property for alert actions
const alertActions: ComputedRef<Array<{
	label: string;
	color:'primary' | 'neutral' ;
	variant?: 'outline' | 'solid';
	size: 'sm' | 'xs' | 'md' | 'lg' | 'xl';
	onClick?: () => void; // 👈 Add this line
}>> = computed(() => {
  const actions: Array<{
	label: string;
	color: 'primary' | 'neutral';
	variant?: 'outline' | 'solid';
	size: 'sm' | 'xs' | 'md' | 'lg' | 'xl';
	onClick?: () => void; // 👈 Add this line
}> = [];

  if (alert.value.showCloseButton) {
    actions.push({
      label: t('general.close') ,
      color: 'neutral',
      variant: 'outline',
      size: 'sm',
      onClick: closeAlert,
    });
  }

  if (alert.value.showAcceptButton) {
    actions.push({
      label: t('general.ok'),
      color: 'primary',
      size: 'sm',
      onClick: acceptAlert,
    });
  }

  return actions;
});

// Close alert action
const closeAlert = () => {
  alert.value.show = false; // Hide the alert
};

// Accept alert action
const acceptAlert = () => {
  if (alert.value.onAccept) {
    alert.value.onAccept(); // Call the custom accept handler if provided
  }
  alert.value.show = false; // Hide the alert after accepting
};
</script>