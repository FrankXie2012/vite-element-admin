<template>
  <div class="main elevator">
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <div class="table-tools">
          <el-input
            v-model="formData.search"
            class="search-input"
            :placeholder="$t('common.search')"
            suffix-icon="el-icon-search"
          />
          <el-button type="success" size="small" @click="onSubmit">
            {{ $t('common.add') }}
          </el-button>
          <el-button type="success" size="small" plain @click="onSubmit">
            {{ $t('common.export') }}
          </el-button>
        </div>
      </template>
      <template #role="{ row }">
        {{ row.role === 1 ? '管理员' : '用户' }}
      </template>
      <template #action="{ row }">
        <el-button type="text" @click="onSubmit(row)">
          {{ $t('common.edit') }}
        </el-button>
        <el-button type="text" @click="onSubmit">
          {{ $t('common.delete') }}
        </el-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
  import { tableConfig } from '../../components/utils'
  import { inject, reactive, watch } from 'vue'
  export default {
    setup() {
      const $request = inject('$request')
      // 搜索框
      const formData = reactive({
        search: ''
      })
      watch(
        () => formData.search,
        (val) => {
          console.log(val)
        }
      )
      // vxe-grid 配置
      const gridOptions = reactive(
        Object.assign({}, tableConfig, {
          columns: [
            { type: 'checkbox', width: 50 },
            { field: 'username', title: 'login.username', sortable: true },
            { field: 'firstName', title: 'user.firstName' },
            { field: 'lastName', title: 'user.lastName' },
            { field: 'cellPhone', title: 'user.cellPhone' },
            { field: 'telePhone', title: 'user.telePhone' },
            { field: 'email', title: 'user.email' },
            {
              field: 'role',
              title: 'user.role',
              filters: [
                { label: '管理员', value: '1' },
                { label: '用户', value: '0' }
              ],
              slots: {
                default: 'role'
              }
            },
            {
              field: 'action',
              title: 'common.action',
              width: 120,
              slots: {
                default: 'action'
              }
            }
          ],
          proxyConfig: {
            seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
            sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
            filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
            props: {
              result: 'result',
              total: 'page.total'
            },
            ajax: {
              // 接收 Promise
              query: async ({ page, sorts, filters }) => {
                const queryParams = Object.assign({}, formData)
                // 处理排序条件
                const firstSort = sorts[0]
                if (firstSort) {
                  queryParams.sort = firstSort.property
                  queryParams.order = firstSort.order
                }
                // 处理筛选条件
                filters.forEach(({ property, values }) => {
                  queryParams[property] = values.join(',')
                })
                console.log(queryParams, formData)
                const res = await $request({
                  url: 'user/page',
                  data: queryParams
                })
                let list = res.data.list
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
      function onSubmit(val) {
        console.log('on submit', val)
      }
      return { gridOptions, formData, onSubmit }
    },
    methods: {
      // onSubmit() {
      //   console.log('abc')
      // }
    }
  }
</script>
