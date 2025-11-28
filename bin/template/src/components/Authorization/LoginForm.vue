<template>
  <section :data-testid="props.dataTestid">
    <header class="authorization__block__header" data-testid="LoginForm-Header">
      <slot name="header" />
      <figure
        class="authorization__block__figure"
        data-testid="LoginForm-Header-Figure"
      >
        <picture data-testid="LoginForm-HeaderFigure-HeaderPicture">
          <img
            src="@/assets/icons/Logotype.png"
            alt="логотип sep-erp"
            loading="lazy"
            data-testid="LoginForm-HeaderPicture-HeaderImg"
          />
        </picture>
      </figure>
    </header>
    <div class="authorization__block__login" data-testid="LoginForm-Block">
      <h1 class="authorization__title" data-testid="LoginForm-Block-Title">
        Вход в ERP-систему
      </h1>
      <div
        class="authorization__inputs"
        data-testid="LoginForm-Inputs-TabelNumber"
      >
        <label
          class="authorization__label authorization__label_darken"
          for="tabel"
          data-testid="LoginForm-TabelNumber-Label"
          >Табельный номер</label
        >
        <YCombobox
          class="authorization__combobox"
          data-testid="LoginForm-TabelNumber-Combobox"
          id="tabel"
          :options="state.data.tabels"
          :disable-open="state.data.tabels?.length == 0"
          :default-option="state.data.tabel"
          placeholder="Введите табельный номер"
          @keyup.enter="login"
          @change="getTabel"
          @error="findData"
          @focusout-option="changeCombobox"
        />
      </div>
      <div class="authorization__inputs" data-testid="LoginForm-Inputs-Login">
        <label
          class="authorization__label authorization__label_darken"
          for="initial"
          data-testid="LoginForm-Login-Label"
          >Логин</label
        >
        <YCombobox
          class="authorization__combobox"
          data-testid="LoginForm-Login-Combobox"
          name="initial"
          id="initial"
          placeholder="Введите логин"
          :default-option="state.data.login"
          :disable-open="state.data.logins?.length == 0"
          :options="state.data.logins"
          @keyup.enter="login"
          @change="getLogin"
          @error="findData"
          @focusout-option="changeCombobox"
        />
      </div>
      <Password
        v-model="state.data.password"
        data-testid="LoginForm-Password"
        @keyup.enter="login"
      />
      <div
        class="authorization__save-account"
        data-testid="LoginForm-SaveAccount"
      >
        <YCheckbox
          size="big"
          id="save"
          v-model="state.isSaveSession"
          data-testid="LoginForm-SaveAccount-Checkbox"
          class="authorization__save-account__checkbox"
        />
        <label
          for="save"
          class="authorization__label authorization__label_checkbox"
          data-testid="LoginForm-Checkbox-Label"
        >
          Запомнить аккаунт
        </label>
      </div>
      <YButton
        ref="buttonLoginRef"
        class="authorization__login"
        type="submit"
        :aria-hidden="state.isDisabledLogin"
        :disabled="state.isDisabledLogin"
        size="small"
        data-testid="LoginForm-Login-Button"
        @click="login"
        @keyup.enter="login"
        >Войти</YButton
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted, ref } from 'vue';
import Password from '@/components/Authorization/Password';
import type { IDataTestIdProp } from './interfaces/interfaces';
import { showMessage } from '@/utils/';

const props = withDefaults(defineProps<IDataTestIdProp>(), {
  dataTestid: 'LoginForm'
});

const emits = defineEmits(['unmount']);

const state = reactive({
  data: {
    login: null,
    password: null,
    logins: [],
    profiles: [],
    tabels: []
  },
  isSaveSession: true,
  isDisabledLogin: true
});

const buttonLoginRef = ref(null);

const loginData = defineModel();

const findData = (): void => {
  const arrLogins = state.data.logins;
  const arrTabels = state.data.tabels;
  const arrLoginsFilter = arrLogins.includes(state.data.login);
  const arrTabelsFilter = arrTabels.includes(state.data.tabel);
  if (!(arrLoginsFilter || arrTabelsFilter)) {
    showMessage(
      '',
      'Пользователь не найден или данные введены неправильно',
      'e'
    );
  }
  return;
};

const getLogin = (login: string): void => {
  state.data.login = login;
  state.data.tabel =
    state.data.profiles.find(profile => profile.login === login)?.tabel || '';
};

const getTabel = (tabel: string): void => {
  state.data.tabel = tabel;
  state.data.login =
    state.data.profiles.find(profile => profile.tabel === tabel)?.login || '';
};

watch(
  () => state.data.tabel,
  newValue => {
    getTabel(newValue);
  },
  { once: true }
);

watch(
  () => state.data.login,
  newValue => {
    getLogin(newValue);
  },
  { once: true }
);

const login = (): void => {
  const profile = state.data.profiles.find(
    item => item.tabel === state.data?.tabel
  );

  if (!profile?.id) {
    showMessage(
      '',
      'Пользователь не найден или данные введены неправильно',
      'e'
    );

    return;
  }

  emits('unmount', {
    id: profile?.id,
    tabel: state.data.tabel,
    login: state.data.login,
    password: state.data.password,
    saveSession: state.isSaveSession
  });
};

watch(
  loginData,
  () => {
    state.data = loginData.value;
  },
  { deep: true }
);

watch(
  [() => state.data.login, () => state.data.tabel, () => state.data.password],
  () => {
    state.isDisabledLogin = !(
      state.data.login &&
      state.data.tabel &&
      state.data?.login != '' &&
      state.data?.tabel != '' &&
      state.data.password?.length > 2
    );
  }
);

const changeCombobox = (): void => {
  if (!state.isDisabledLogin && document.activeElement.tagName !== 'INPUT') {
    buttonLoginRef.value?.$el?.focus();
  }
};

onMounted(async () => {
  state.data = loginData.value;
});
</script>

<style scoped>
.authorization__title {
  font-size: 30px;
  font-weight: normal;
  margin-bottom: 5px;
  margin-top: 12px;
}

.authorization__save-account {
  display: inline-grid;
  grid-template-columns: 9.4% 99.6%;
  justify-items: start;
  margin-top: 5px;
  margin-bottom: 5px;
  align-items: center;
}

button.button-yui-kit.authorization__login {
  background: #77a6ff;
  font-size: 20px;
  border-radius: 12px !important;
  padding: 16px 13px;
  justify-content: center;
  &:focus,
  &:focus-visible,
  &:hover {
    color: var(--white);
    background: #548cf6;
  }
  &.disabled-yui-kit {
    color: var(--grey6);
    background: var(--grey1);
  }
}

.authorization__label {
  color: var(--text-grey);
}

.authorization__label.authorization__label_darken {
  color: #666666;
}

label.authorization__label.authorization__label_checkbox {
  font-size: 18px;
  user-select: none;
}

.authorization__block__login {
  display: grid;
  place-content: center;
  font-size: 14px;
  gap: 25px;
  margin-top: 44px;
  margin-bottom: 129px;
}

.authorization__inputs {
  display: grid;
  gap: 7px;
}

.authorization__save-account__checkbox:disabled {
  border-color: var(--grey7);
}

.authorization__combobox {
  --width: 460px;
  & :deep(input.combobox__input) {
    width: var(--width);
    appearance: none;
    font-size: 16px;
    padding: 17px 15px;
    border-radius: var(--radius);
  }
  & :deep(.filter__header) {
    --radius: 12px;
    width: var(--width);
    color: var(--grey4);
    padding: 0;
    border-color: #66666659;
    max-width: var(--width);
    & input.combobox__input::placeholder {
      color: var(--grey4);
    }
  }
  & :deep(.filter__options) {
    padding: 5px 10px;
    max-height: 185px;
    max-width: 100%;
  }
  & :deep(li.truncate-yui-kit) {
    width: initial;
    margin-top: 5px;
    &:last-child {
      margin-bottom: 5px;
    }
  }
}

header.authorization__block__header {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  padding: 0 40px;
  width: 100%;
  & .authorization__block__figure {
    & img {
      width: 60px;
      height: 60px;
    }
    margin: 0;
    justify-self: end;
  }
}
</style>
