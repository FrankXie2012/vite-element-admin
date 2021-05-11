<template>
  <vxe-grid v-bind="gridOptions">
    <template #toolbar_buttons>
      <vxe-input v-model="searchName" placeholder="搜索"></vxe-input>
      <vxe-button status="primary">搜索</vxe-button>
      <vxe-button>刷新</vxe-button>
      <vxe-button>新增</vxe-button>
      <vxe-button>保存</vxe-button>
      <vxe-button>导出</vxe-button>
    </template>
  </vxe-grid>
</template>

<script>
import {reactive} from 'vue'
import {tableConfig} from '/@/components/utils'
export default {
  setup() {
    const gridOptions = reactive(
      Object.assign({}, tableConfig, {
        toolbarConfig: {
          custom: true,
          refresh: true,
          slots: {
            buttons: 'toolbar_buttons'
          }
        },
        columns: [
          {type: 'checkbox', width: 50},
          {type: 'seq', width: 60},
          {field: 'name', title: 'Name'},
          {field: 'nickname', title: 'Nickname'},
          {field: 'role', title: 'Role'},
          {field: 'address', title: 'Address', showOverflow: true}
        ],
        proxyConfig: {
          seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
          props: {
            result: 'result',
            total: 'page.total'
          },
          ajax: {
            // 接收 Promise
            query: async ({page}) => {
              const list = [
                // {
                //   id: 10001,
                //   name: 'Test1',
                //   nickname: 'T1',
                //   role: 'Develop',
                //   sex: 'Man',
                //   age: 28,
                //   address: 'Shenzhen'
                // }
              ]
              return {
                page: {
                  total: list.length
                },
                result: list.slice(
                  (page.currentPage - 1) * page.pageSize,
                  page.currentPage * page.pageSize
                )
              }
            }
          }
        }
      })
    )
    return {gridOptions, searchName: ''}
  }
}
</script>
