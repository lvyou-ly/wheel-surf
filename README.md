# wheel-surf

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

组件实现了通过定制化每种奖品的中间率和加权平均数算法，来计算每次的随机奖品

转盘抽奖的组件为'/src/components/WheelSurf.vue'

使用转盘抽奖的组件的页面为'/src/views/useWheel'

转盘抽奖组件接收的属性

1.background: 
  说明：转盘背景图，值为图片路径或者base64图片
  类型：String
  要求：必传
  默认值：无
 2.direction
   说明：转盘转动方向
   类型：String
   要求：非必传
   默认值：'clockWise'
 3.turnNum
   说明：每次转动转盘，转盘转动的圈数
   类型：Number
   要求：非必传
   默认值：6
 4.time
   说明：每次转盘转动，转盘转动的时间，单位ms
   类型：Number
   要求：非必传
   默认值：5000
 5.prizeList
   说明：全部奖品列表，包括非奖品
   类型：Array
   要求：必传
   示例数据：[
             { id: 1, prizeName: '一等奖' },
             { id: 2, prizeName: '感谢参与' },
             { id: 3, prizeName: '再来一次' },
             { id: 4, prizeName: '没有中奖' },
             { id: 5, prizeName: '二等奖' },
             { id: 6, prizeName: '感谢参与' },
             ],
 6.getPrize
   说明：奖品中间率
   类型：Array
   要求：必传
   示例数据：{
             1: 0.5,
             4: 0.2,
             5: 0.1,
             6: 0.2,
            }
  7.allowGetTimes
    说明：允许抽奖次数
    类型：Number || 'infinite'
    要求：非必传
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
