<template>
  <div class="main elevator">
    <vxe-grid ref="grid" v-bind="gridOptions">
      <template #toolbar_buttons>
        <div class="table-tools">
          <el-input
            v-model="formData.search"
            class="search-input"
            :placeholder="$t('common.search')"
            suffix-icon="el-icon-search"
            @change="$refs.grid.commitProxy('query')"
          />
          <el-button type="success" size="small" @click="onForm">
            {{ $t('common.add') }}
          </el-button>
          <el-button type="success" size="small" plain @click="onExport">
            {{ $t('common.export') }}
          </el-button>
        </div>
      </template>
      <template #role="{ row }">
        {{ row.role === 1 ? '管理员' : '用户' }}
      </template>
      <template #action="{ row }">
        <el-button type="text" @click="onForm(row)">
          {{ $t('common.edit') }}
        </el-button>
        <el-button type="text" @click="onDelete(row)">
          {{ $t('common.delete') }}
        </el-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
  import { tableConfig } from '../../components/utils'
  export default {
    data() {
      return {
        gridOptions: {},
        formData: {
          search: ''
        }
      }
    },
    created() {
      this.initTable()
    },
    methods: {
      initTable() {
        this.gridOptions = {
          ...tableConfig,
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
                const queryParams = Object.assign({}, this.formData)
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
                const res = await this.$request({
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
        }
      },
      onForm(val) {
        if (val && val.id) {
          this.$store.dispatch('setUser', val)
          this.$router.push({ name: 'adminEdit' })
        } else {
          this.$store.dispatch('setUser', {})
          this.$router.push({ name: 'adminAdd' })
        }
      },
      onExport(val) {
        console.log('on export', val)
      },
      async onDelete(val) {
        this.$confirm(this.$t('hint.delete'), this.$t('common.hint'), {
          confirmButtonText: this.$t('common.ok'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(async () => {
          await this.$request({
            url: 'user/delete',
            data: {
              ids: val.id
            }
          })
          this.$refs.grid.commitProxy('query')
        })
      }
    }
  }
</script>
