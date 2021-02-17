<template>
  <Card title="待办事项" icon="md-pricetags" border="false">
    <!-- 操作 -->
    <div>
      <Button @click="openDrawer">新增</Button>
      <Button>待完成</Button>
      <Button>全部</Button>
    </div>

    <!-- 待办新增 -->
    <Drawer title="新增待办" placement="right" width="350" :closable="false" v-model="drawerOpen">
      <Form>
        <FormItem label="任务优先级">
          <Select v-model="priorityValue">
            <Option v-for="item in priority" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

        <FormItem label="待办任务">
          <Input v-model="todoTask" type="textarea" />
        </FormItem>

        <FormItem>
          <Button type="primary" icon="md-paper-plane" @click="addTodo()">提交</Button>
          <Button
            type="default"
            icon="md-close"
            style="margin-left: 8px"
            @click="drawerOpen=false"
          >取消</Button>
        </FormItem>
      </Form>
    </Drawer>

    <!-- 待办内容 -->
    <div class="todo-content">
      <Table :columns="TodoCol" :data="TodoList" width="500px">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success" size="small" icon="md-checkmark" ghost></Button>
          <Button type="error" size="small" icon="md-close" style="margin-left: 5px" ghost></Button>
        </template>
      </Table>
    </div>
  </Card>
</template>

<script>
export default {
  data: () => ({
    // 新增待办抽屉 开关状态
    drawerOpen: false,

    // 优先级数据
    priority: [
      {
        value: "3",
        label: "普通",
      },
      {
        value: "2",
        label: "中等",
      },
      {
        value: "1",
        label: "高优先"
      }
    ],
    // 优先级数据，默认普通优先级
    priorityValue: "3",
    // 新增待办任务内容
    todoTask: "",

    // 待办表格内容
    TodoCol: [
      {
        title: "待办",
        key: "task"
      },
      {
        title: "优先级",
        key: "priority",
        align: "center"
      },
      {
        title: "操作",
        slot: "action",
        width: 150,
        align: "center"
      }
    ],
    // 待办数据
    TodoList: [
      {
        task: "吃饭",
        priority: "高"
      },
      {
        task: "睡觉",
        priority: "高"
      },
      {
        task: "打豆豆",
        priority: "高"
      }
    ]
  }),

  methods: {
    /* 新增待办抽屉控制 */
    openDrawer() {
      this.drawerOpen = true;
    },

    /* 新增待办 */
    addTodo() {
      console.log(this.priorityValue)
      console.log(this.todoTask)

      this.drawerOpen = false
    }
  }
};
</script>

<style scoped>
.todo-content {
  margin-top: 20px;
}

.ivu-card {
  height: 100%;
}
</style>