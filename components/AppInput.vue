<template>
  <UFormField v-slot="{ error }" :label="label" :name="name" :required="required">
    <UInput
      :id="id"
      :modelValue="formattedValue" 
      @update:modelValue="onInput"
      :disabled="disabled"
      :type="(type === 'password' && !isHide) || type === 'number' ? 'text' : type"
      :placeholder="placeHolder"
      color="primary"
      :icon="appendIcon"
      :maxlength="maxLength"
    >
      <template #trailing>
        <UIcon v-if="error" name="i-lucide-triangle-alert" size="16" color="red-500" />
        <UIcon
          v-else-if="type === 'password'"
          :name="isHide ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          size="16"
          color="gray-500"
          @click="isHide = !isHide"
        />
        <div v-else />
      </template>
      <template v-if="appendIcon && !(error || type === 'password')" #append>
        <UIcon :name="appendIcon" size="16" color="gray-500" />
      </template>
    </UInput>
  </UFormField>
</template>

<script lang="ts" setup>
interface Props {
  id: string;
  name: string;
  type: string;
  label: string;
  disabled?: boolean;
  readonly?: boolean;
  modelValue: string | number; // Explicitly define modelValue for v-model
  labelInput?: string;
  prefix?: string;
  transform?: 'currency' | 'phone';
  showErrorMsg?: boolean;
  appendIcon?: string;
  autocomplete?: string;
  maxLength?: number;
  clearable?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'off',
  disabled: false,
  readonly: false,
  showErrorMsg: true,
  clearable: false,
  required: false,
  maxLength: 50,
});

const emit = defineEmits(['update:modelValue', 'input', 'click-append', 'keypress']);

const isHide = ref(true);

const placeHolder = computed(() =>
  props.labelInput ?? TYPE_DEFAULTS_PLACEHOLDERS[props.type] ?? ''
);

const TYPE_DEFAULTS_PLACEHOLDERS: Record<string, string> = {
  currency: '#.###.###',
  tel: '(000) 000 0000',
};

// Function to format phone numbers
const formatPhone = (value: string): string => {
	if (value.length < 4) return value; // Return early if the value is too short
  const cleaned = value.replace(/\D/g, ''); // Remove non-numeric characters
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;
  return !match[2]
    ? `(${match[1]}`
    : !match[3]
    ? `(${match[1]}) ${match[2]}`
    : `(${match[1]}) ${match[2]}-${match[3]}`;
};

// Function to format currency
const formatCurrency = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(numericValue) / 100); // Divide by 100 for cents
};

// Computed property to display the formatted value
const formattedValue = computed(() => {
  if (props.transform === 'currency') {
    return formatCurrency(String(props.modelValue));
  } else if (props.transform === 'phone') {
    return formatPhone(String(props.modelValue));
  }
  return String(props.modelValue); // Default to raw value if no transform
});

// Handle input changes
const onInput = (value: string | number) => {
  let rawValue = String(value); // Convert number to string if necessary

  if (props.transform === 'currency') {
    rawValue = rawValue.replace(/[^0-9]/g, ''); // Remove formatting for currency
  } else if (props.transform === 'phone') {
    rawValue = rawValue.replace(/\D/g, ''); // Remove formatting for phone
  }

  emit('update:modelValue', rawValue); // Emit the raw value to the parent
};
</script>