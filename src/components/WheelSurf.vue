<template>
  <div class="turntable-circle">
    <div class="wrapper">
      <div
        class="prize-list"
        :style="{
          backgroundImage: `url(${background})`,
        }"
        
      ></div>
      <i class="point" ref="prizeList" :style="{
        transition: `transform ${Math.floor(this.time / 1000)}s ease`,
          transform: `rotateZ(${needRotateAngle}deg) translate3d(-50%, -50%, 0)`
      }" @click="startLattory"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    background: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: "clockWise",
      validator(value) {
        return (
          typeof value === "undefined" ||
          ["clockWise", "counterClockWise"].includes(value)
        );
      },
    },
    turnNum: {
      type: Number,
      default: 6,
      validator(value) {
        return typeof value === "number";
      },
    },
    // 单位： ms
    time: {
      type: Number,
      default: 5000,
    },
    /**
     * [{ id, prizeName, percent }]
     */
    prizeList: {
      type: Array,
      required: true,
      validator(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (let i = 0; i < value.length; i++) {
          if (
            Object.prototype.toString.call(value[i]).slice(8, -1) !== "Object"
          ) {
            return false;
          }
          if (
            !value[i].hasOwnProperty("id") ||
            !value[i].hasOwnProperty("prizeName")
          ) {
            return false;
          }
        }
        return true;
      },
    },
    // num || 'infinite' 允许抽奖次数
    allowGetTimes: {
      default: 1,
      validator(value) {
        if (typeof value !== "number" && value !== "infinite") {
          return false;
        }
        return true;
      },
    },
  },
  data() {
    return {
      userPrizeList: [],
      needRotateAngle: 0,
      prizeObj: null,
      currentTimes: 0,
      // 奖品的权重和
      prizeWeightedSum: 0,
      weightedArr: [],
      localPrizeInfo: [],
    };
  },
  created() {
    this.userPrizeList = this.prizeList;
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      let base = 360 / this.userPrizeList.length;
      this.userPrizeList.forEach((item, index) => {
        item.angle = this.direction === 'clockWise' ? 360 - index * base : index * base;
        // 计算奖品的权重和，*100是因为允许中奖率精确度保留小数点后两位
        this.prizeWeightedSum += item.percent * 100;
      });
      // 根据权重对奖品进行排序
      this.userPrizeList = this.sort(this.userPrizeList);
    },
    startLattory() {
      // this.needRotateAngle += 300;
      if (this.allowGetTimes === 1 && this.$refs.prizeList.style.transform) {
        return this.$emit("error", {
          errorCode: 1,
          errorMsg: "超过抽奖次数限制",
        });
      }
      // 计算中奖奖品
      this.weightedAverage();
      this.currentTimes++;
      let needRotateAngle = 0;
      if (this.currentTimes === 1) {
        needRotateAngle = this.prizeObj.angle + this.turnNum * 360;
      } else {
        needRotateAngle = this.prizeObj.angle + this.turnNum * 360;
        // 确保至少转this.turnNum圈
        while (true) {
          if (needRotateAngle - Math.abs(this.needRotateAngle) < this.turnNum * 360) {
            needRotateAngle += 360;
          } else {
            break;
          }
        }
      }
      this.needRotateAngle =
        this.direction === "clockWise"
          ? -needRotateAngle
          : needRotateAngle;
      setTimeout(() => {
        this.$emit("success", this.prizeObj);
      }, this.time);
    },
    /**
     * @desc 加权平均数算法
     */
    weightedAverage() {
      let random = Math.floor(Math.random() * this.prizeWeightedSum) + 1;
      let sum = 0;
      for (let i = 0; i < this.userPrizeList.length; i++) {
        sum += this.userPrizeList[i].percent * 100;
        if (sum >= random) {
          this.prizeObj = this.userPrizeList[i];
          console.log('prizeobj', this.prizeObj.id)
          break;
        }
      }
    },
    /**
     * @desc 对权重进行排序, 采用快速排序
     */
    sort(arr) {
      if (arr.length <= 1) {
        return arr;
      }
      let midIndex = Math.floor(arr.length / 2);
      let midItem = arr.splice(midIndex, 1)[0];
      let left = [],
        right = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].weight <= midItem.weight) {
          right.push(arr[i]);
        } else {
          left.push(arr[i]);
        }
      }
      return this.sort(left).concat([midItem], this.sort(right));
    },
  },
};
</script>
<style lang="scss">
.turntable-circle {
  width: 80%;
  height: 0;
  padding-bottom: 80%;
  position: relative;
  margin: 0 auto;

  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;

    .prize-list {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-size: 100% 100%;
      background-position: center;
      z-index: 0;
    }

    .point {
      display: block;
      z-index: 900;
      width: 50px;
      height: 50px;
      margin-top: 50%;
      margin-left: 50%;
      transform-origin: 0 0;
      background: url("../assets/point.jpeg") center / 100% no-repeat;
    }
  }
}
</style>