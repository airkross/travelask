<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
        class="pagination-btn"
      ><<</button>
    </li>

    <li v-for="(page, index) in pages" :key="index" class="pagination-item">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        class="pagination-btn"
        :aria-label="`Go to page number ${page.name}`"
      >{{ page.name }}</button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        aria-label="Go to next page"
        class="pagination-btn"
      >>></button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    maxVisibleButtons() {
      return this.totalPages < 5 ? this.totalPages : 5;
    },
    startPage() {
      if (this.currentPage === 1 || this.currentPage === 2) {
        return 1;
      }

      if (this.currentPage === this.totalPages || this.currentPage === this.totalPages - 1) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 2;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    }
  },
  methods: {
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>

<style >
.pagination {
  display: flex;
  justify-content: center;
}
.pagination-btn {
    background-color: #fff;
    color: greenyellow;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    outline: none;
}
.pagination-btn:disabled {
    color: #b8b8b8;
    cursor: auto;
}
.pagination-btn.active {
    background-color: rgb(119, 224, 119);
    color: #fff;
}
</style>
