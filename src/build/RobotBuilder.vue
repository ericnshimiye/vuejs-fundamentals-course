<template>
  <div v-if="availableParts" class="content">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="selectedRobot.torso.src"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src"/>
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">
      Add to Cart
      </button>
    </div>
    <div class="top-row">
        <PartSelector
          :parts="availableParts.heads"
          position="top"
          @partSelected="part => selectedRobot.head=part"/>
    </div>
    <div class="middle-row">
        <PartSelector
          :parts="availableParts.arms"
          position="left"
          @partSelected="part => selectedRobot.leftArm=part"/>
        <PartSelector
          :parts="availableParts.torsos"
          position="center"
          @partSelected="part => selectedRobot.torso=part"/>
        <PartSelector
          :parts="availableParts.arms"
          position="right"
          @partSelected="part => selectedRobot.rightArm=part"/>
    </div>
    <div class="bottom-row">
        <PartSelector
          :parts="availableParts.bases"
          position="bottom"
          @partSelected="part => selectedRobot.base=part"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',
  components: { PartSelector, CollapsibleSection },
  created() {
    this.getParts();
  },
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      /* eslint no-restricted-globals: 0 */
      /* eslint no-alert: 0 */
      const response = confirm('You have not added your robot to your cart, are you sure you want to leave ?');
      next(response);
    }
  },
  data() {
    return {
      addedToCart: false,
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        rightArm: {},
        base: {},
        torso: {},
      },
    };
  },
  computed: {
    availableParts() {
      return this.$store.state.robots.parts;
    },
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
  },
  methods: {
    ...mapActions({
      getParts: 'robots/getParts',
      addRobotToCart: 'robots/addRobotToCart',
    }),
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost + robot.leftArm.cost + robot.torso.cost
       + robot.rightArm.cost + robot.base.cost;

      this.addRobotToCart(Object.assign({}, robot, { cost }))
        .then(() => this.$router.push('/cart'));

      this.addedToCart = true;
    },
  },
};
</script>

<style scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
}
.part img {
  width:165px;
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.robot-name{
  position: absolute;
  top:-25px;
  text-align: center;
  width: 100%;
}

.content{
  position: relative;
}
.add-to-cart{
  position: absolute;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
