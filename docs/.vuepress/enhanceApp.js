
import "./styles/style.css";
import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui/lib/index";

import AMapLoader from "@amap/amap-jsapi-loader";

import {
  agelForm,
  agelSearchPanel,
  agelFormDialog,
  agelRadio,
  tableditorMenuColumn,
  agelCheckbox,
  agelSelect,
  agelUpload,
  agelTreeSelect,
  agelMapInput
} from "../../src/index";


window._AMapSecurityConfig = { securityJsCode: '37c6baee599002d347756e3d1277246c' }
AMapLoader.load({
  key: "56f6a360f541889552ce0aea6469a3e3",
  plugins: [
    "AMap.PlaceSearch",
    "AMap.Autocomplete",
    "AMap.Geocoder"
  ],
}).then((AMap) => {
  window.AMap = AMap;
});

const mockData = {
  random() {
    return "随机数" + Math.ceil(Math.random() * 100) + '' + Math.ceil(Math.random() * 100)
  },
  "/api/getRandomData": function () {
    return [{ label: this.random(), value: '1' }, { label: this.random(), value: '2' }, { label: this.random(), value: '3' }];
  },
  "/api/getRandomTreeData": function () {
    return [
      {
        label: this.random(),
        value: "1",
        children: [
          {
            label: this.random(),
            value: "1-1",
            children: [
              {
                label: this.random(),
                value: "1-1-1",
              },
            ],
          },
        ],
      },
      {
        label: this.random(),
        value: "2",
      },
    ]
  }
}

export default ({ Vue }) => {
  Vue.use(Element, { size: 'mini' });
  Vue.use(agelForm, {
    "el-date-picker": function (prop, item, form) {
      if (item.valueFormat == undefined) {
        if (item.type == undefined || item.type == "daterange") item.valueFormat = "yyyy-MM-dd";
        if (item.type == "datetime" || item.type == "datetimerange") item.valueFormat = "yyyy-MM-dd HH:mm:ss";
        if (item.type == "month") item.valueFormat = "yyyy-MM";
        if (item.type == "year") item.valueFormat = "yyyy";
      }

      if (item.type == "daterange" || item.type == "datetimerange") {
        item.unlinkPanels = true;
      }
    },
  });


  Vue.component(agelRadio.name, agelRadio);
  Vue.component(agelCheckbox.name, agelCheckbox);
  Vue.component(agelSelect.name, agelSelect);
  Vue.component(agelUpload.name, agelUpload);
  Vue.component(agelTreeSelect.name, agelTreeSelect);
  Vue.component(agelSearchPanel.name, agelSearchPanel);
  Vue.component(agelFormDialog.name, agelFormDialog);
  Vue.component(agelMapInput.name, agelMapInput);
  Vue.component(tableditorMenuColumn.name, tableditorMenuColumn)

  Vue.prototype.$AMapKey = "56f6a360f541889552ce0aea6469a3e3";

  //模拟一个 http 请求
  Vue.prototype.$http = {
    get(url) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let data = mockData[url]();
          console.log('模拟请求数据', data);
          resolve(data);
        }, 1500);
      });
    },
  }
};
