export default [
  {
    name: "首页",
    auth: "home",
    icon: "el-icon-house",
    path: "/home",
  },
  {
    name: "设备管理",
    auth: "device",
    icon: "el-icon-monitor",
    path: "/device",
  },
  {
    name: "用户管理",
    auth: "user",
    icon: "el-icon-user",
    path: "/user",
  },
  {
    name: "统计分析",
    icon: "el-icon-pie-chart",
    path: "1",
    auth: "stats",
    items: [
      {
        name: "设备数据",
        auth: "deviceData",
        icon: "el-icon-data-line",
        path: "/deviceData",
      },
    ],
  },
  {
    name: "系统设置",
    icon: "el-icon-setting",
    path: "2",
    auth: "system",
    items: [
      {
        name: "型号管理",
        auth: "model",
        icon: "el-icon-cpu",
        path: "/model",
      },
      {
        name: "操作员管理",
        auth: "sysUser",
        icon: "el-icon-set-up",
        path: "/sysUser",
      },
    ],
  },
];
