<template>
  <Card title="待办事项" icon="md-pricetags" border="false">
    <!-- 操作 -->
    <div>
      <Button @click="openDrawer">新增</Button>
      <i-switch v-model="isShowAllTodo" @on-change="showTodoHandler()" style="margin-left: 5px" />
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
        <template slot-scope="{row, index}" slot="priority">
          <Tag :color="priorityColorHandler(row.priority)" type="border">{{ priorityContentHandler(row.priority) }}</Tag>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <Button size="small" icon="md-checkmark"></Button>
          <Button
            size="small"
            icon="md-close"
            style="margin-left: 5px"
            @click="deleteTodo(row.id)"
          ></Button>
        </template>
      </Table>
    </div>
  </Card>
</template>

<script>
import Todo from "../omx/todo";

export default {
  data: () => ({
    // 新增待办抽屉 开关状态
    drawerOpen: false,

    // 是否显示全部 Todo (包含已完成的) 
    isShowAllTodo: false,

    // 优先级数据
    priority: [
      {
        value: "3",
        label: "普通"
      },
      {
        value: "2",
        label: "中等"
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
        slot: "priority",
        width: 100,
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
    TodoList: []
  }),

  mounted() {
    this.queryAllTodoList();
  },

  watch: {
    TodoList(val) {
      this.TodoList = val;
    }
  },

  methods: {
    /* 新增待办抽屉控制 */
    openDrawer() {
      this.drawerOpen = true;
    },

    /* 显示全部 or 未完成部分 */
    showTodoHandler(status) {
      // FIXME
      this.$Message.info('开关状态：' + status);
    },

    /* 优先级颜色处理 */
    priorityColorHandler(priority) {
      switch(priority) {
        case "1":
          return "error" // red
        case "2":
          return "success" // green
        case "3":
          return "primary" // blue
      }
    },

    /* 优先级内容处理 */
    priorityContentHandler(priority) {
      switch(priority) {
        case "1":
          return "High" // red
        case "2":
          return "Middle" // green
        case "3":
          return "Low" // blue
      }
    },

    /* 新增待办 */
    addTodo() {
      let task = this.todoTask;
      let priority = this.priorityValue;
      try {
        let todo = new Todo((task = task), (priority = priority));
        console.log(todo);
        todo.save();
        this.$Message.success("新增成功");
      } catch (e) {
        this.$Message.error("存储失败,请排查原因...");
      }

      // 关闭新增抽屉
      this.drawerOpen = false;
      this.todoTask = "";
      // 刷新数据
      this.queryAllTodoList();
    },

    /* 查询所有待办 */
    queryAllTodoList() {
      let query = new Todo();
      let todos = query.all();
      // this.TodoList = todos.sort((todo1, todo2) => {
      //   todo2.id - todo1.id
      // })
      // console.log("排序 ==> ", todos);
      this.TodoList = todos;
    },

    /* 删除待办 */
    deleteTodo(id) {
      let query = new Todo();
      query.delete(id);
      // 刷新数据
      this.queryAllTodoList();
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