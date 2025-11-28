<template>
  <div class="authorization__inputs" :data-testid="props.dataTestid">
    <div
      class="authorization__inputs__password"
      data-testid="Password-Inputs-Wrapper"
    >
      <label
        class="authorization__label"
        for="password"
        data-testid="Password-Inputs-Title"
        >Пароль</label
      >
      <YIcon
        name="eye"
        @click="changeType"
        @keyup.enter="changeType"
        tabindex="0"
        v-if="state.typePassword === 'text'"
        data-testid="Password-Inputs-OpenEye"
      />
      <YIcon
        name="eye-off"
        @click="changeType"
        @keyup.enter="changeType"
        tabindex="0"
        v-if="state.typePassword === 'password'"
        data-testid="Password-Inputs-CloseEye"
      />
    </div>
    <YInput
      class="authorization__input"
      :type="state.typePassword"
      autocomplete="off"
      @focusout="onInputChange"
      @keyup.enter="onInputChange"
      data-testid="Password-Inputs-Input"
      name="password"
      id="password"
      placeholder="Введите пароль"
      v-model="password"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { IDataTestIdProp } from './interfaces/interfaces';

const props = withDefaults(defineProps<IDataTestIdProp>(), {
  dataTestid: 'Password'
});

const emits = defineEmits(['blur']);

const password = defineModel();

const state = reactive({
  typePassword: 'password'
});

const changeType = (): void =>
  (state.typePassword = state.typePassword !== 'text' ? 'text' : 'password');

const onInputChange = (): void => {
  emits('blur');
};
</script>

<style scoped>
.authorization__inputs {
  display: grid;
  gap: 4px;
}

fieldset.input-yui-kit.authorization__input {
  &::before {
    border-radius: 12px;
    border-color: #66666659;
  }
  height: auto;
}

fieldset.input-yui-kit :deep(input.input-yui-kit__input) {
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 15px;
  width: calc(100% + 5px);
  font-size: 16px;
  border-radius: 12px;
  &::placeholder {
    color: var(--grey4);
  }
}

.authorization__inputs__password {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666666;
  & svg.icon-yui-kit {
    color: var(--grey6);
    cursor: pointer;
    margin-right: 3px;
  }
}

.authorization__label {
  color: var(--text-grey);
}
</style>
