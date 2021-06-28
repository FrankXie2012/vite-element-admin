<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script></script>
<style lang="less">
.elevator {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
  &.radius {
    border-radius: 8px;
  }
}
.elevator-up {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
    0 1px 18px 0 rgba(0, 0, 0, 0.12) !important;
}
.full-width {
  width: 100%;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.fs-18 {
  font-size: 18px;
}
.c-white {
  color: #fff !important;
}
.ml-10 {
  margin-left: 10px;
}

/* 滚动条样式 */
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 5px;
  background: #eee;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
/*Normalize end*/
</style>
