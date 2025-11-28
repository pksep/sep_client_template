<template>
  <div class="header__search" data-testid="Header-Search">
    <YSearch
      v-model="state.query"
      data-testid="Header-Search-Input"
      placeholder="Поиск"
      global
      :global-results-function="searchStore.allResults"
      @input="handleSearch"
      @choose-result="chooseResult"
      @scroll-paginate="handlePaginate"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { ResultSearchType } from '@/UI/types/header-search';
import { useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/search';
import { client } from '@/services/typesense-client';

const router = useRouter();
const searchStore = useSearchStore();

const state = reactive({
  page: 1,
  query: ''
});

const chooseResult = async (value: ResultSearchType): Promise<void> => {
  console.log(value);

  await router.push(`/`);
  // if (value.banned) {
  //   await router.push({
  //     name: 'archive',
  //     query: {
  //       type: value.type,
  //       q: value.searchResult
  //     }
  //   });
  // }
  state.query = '';
  searchStore.setResults([]);
};

const handlePaginate = async (): Promise<void> => {
  state.page++;
  await search(state.query);
};

const handleSearch = async (value: string): Promise<void> => {
  state.page = 1;
  await search(value);
};

const search = async (value: string): Promise<void> => {
  state.query = value;

  if (!state.query) {
    searchStore.setResults([]);
    return;
  }

  if (
    state.page !== 1 &&
    searchStore.allResultsCount === searchStore.allResults.length
  ) {
    return;
  }

  try {
    if (client) await searchStore.fetchSearchData(state.query, state.page);
  } catch (err) {
    console.error(err);
  }
};
</script>

<style scoped>
.header__search {
  & div.search-yui-kit {
    height: 40px !important;
  }
}

@media screen and (width < 768px) {
  .header__search {
    display: none;
  }
}
</style>
