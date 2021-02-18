<template>
  <Card title="目标管理" icon="md-paper-plane">
    <!-- 新增 OKR -->
    <div>
      <Button icon="md-add" @click="drawerOpen=true">OKR 新增</Button>
    </div>
  
    <!-- OKR 新增抽屉 -->
    <Drawer title="新增 OKR" placement="right" width="500" :closable="false" v-model="drawerOpen">
      <Form>
        <!-- Object -->
        <FormItem label="计划目标">
          <Input v-model="newObject" type='textarea' :rows="4" placeholder="请填写 Object" />
        </FormItem>
        <!-- KR -->
        <FormItem>
          <div class="add-kr">
            <Input v-model="KeyResultContent" placeholder="请填写 KR" style="width: 300px" />
            <InputNumber
                  v-model="newKRWeight"
                  :max="100"
                  :formatter="value => `${value}%`"
                  :parser="value => value.replace('%', '')"
                  style="margin-left:5px"
                  />
            <Button icon="md-add" style="margin-left:5px" @click="addKeyResult()"></Button>
          </div>
          <div class="show-kr">
            <Table :columns="keyResultsCol" :data="KRDatas">

              <!-- 删除 slot -->
              <template slot-scope="{row, index}" slot="action">
                <Button icon="md-close" size="small" type="error" @click="deleteEditKR(row.kr)" ghost />
              </template>
            </Table>
          </div>
        </FormItem>
        <!-- 提交 or 取消 -->
        <FormItem>
          <Button type="primary" icon="md-paper-plane" @click="saveNewOKR()">提交</Button>
          <Button
            type="default"
            icon="md-close"
            style="margin-left: 8px"
            @click="drawerOpen=false"
          >取消</Button>
        </FormItem>
      </Form>
    </Drawer>
  </Card>
</template>

<script>
import ObjectManagement from '../omx/object_management'

export default {
  data: () => ({
    // 新增 OKR 抽屉的开闭状态
    drawerOpen: false,
    // kr table col
    keyResultsCol: [
      {
        title: "Key Result",
        key: "kr"
      },
      {
        title: "权重",
        key: "weight",
        width: 120,
        align: "center"
      },
      {
        title: "操作",
        slot: "action",
        width: 100,
        align: "center"
      },
    ],

    // 新增 OKR 页面的 KR 值
    KeyResultContent: "",

    // 新增 krs 数据
    KRDatas: [],

    // 新增 Object
    newObject: '',

    // 新增 kr 的权重
    newKRWeight: 0,
  }),

  watch: {
    KRDatas(val) {
      this.KRDatas = val
    }
  },

  methods: {
    // add KR
    addKeyResult() {
      this.KRDatas.push({
        kr: this.KeyResultContent,
        weight: this.newKRWeight,
      });
      // 清数据
      this.KeyResultContent = ''
    },

    /* 保存新增的 OKR */
    saveNewOKR() {
      let object = this.newObject
      let krs = this.KRDatas
      let okr = new ObjectManagement(object=object, krs=krs)
      try {
        okr.save()
        this.$Message.success('保存 OKR 成功')
      } catch(e) {
        this.$Message.error('存储失败，请排查原因...')
      } finally {
        // 关闭窗口，清空数据
        this.drawerOpen = false
        this.KRDatas = []
        this.newObject = ''
      }      
    },

    /* 删除新增编辑的 KR */
    deleteEditKR(krContent) {
      this.KRDatas = this.KRDatas.filter(e => {
        return e.kr != krContent
      })
    },
  }
};
</script>

<style scoped>
.ivu-card {
  height: 100%;
}

.add-kr {
  display: inline-flex;
}

.show-kr {
  margin-top: 20px;
}
</style>
