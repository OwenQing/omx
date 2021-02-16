<template>
  <div id="app">
    <v-app>
      <!-- 侧边栏 -->
      <v-navigation-drawer app>
        <ul>
          <li><router-link to="/tomatotime">番茄钟</router-link></li>
          <li><a href="#news">日程计划</a></li>
          <li><a href="#contact">代办事项</a></li>
          <li><a href="#about">目标管理</a></li>
        </ul>
      </v-navigation-drawer>

      <v-main>
        <!--  -->
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "omx",
  data: () => ({
  
  }),

  methods: {
  },
};
</script>

<style>
/* CSS */
::-webkit-scrollbar {
  width: 5px; /* 纵向滚动条*/
  height: 5px; /* 横向滚动条 */
  background-color: #fff;
}

/*定义滚动条轨道 内阴影*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #ccc;
}

/*定义滑块 内阴影*/
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: #1890ff;
  border-radius: 10px;
}

/* 侧边栏 */
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    /* width: 200px; */
    background-color: #f1f1f1;
}
 
li a {
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
}
 
/* 鼠标移动到选项上修改背景颜色 */
li a:hover {
    background-color: #555;
    color: white;
}
</style>
