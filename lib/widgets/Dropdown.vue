<template>
<div
  class="dropdown"
  :class="{ dropup: top }"
  @mouseleave="mouseLeave"
  @mouseover="mouseOver"
  @mouseenter="mouseEnter"
  @click="toggleMenu"
>
  <slot />
  <transition :name="transition">
    <div
      v-show="modelValue"
      ref="dropdown"
      class="dropdown-menu show"
      :style="styles"
      @mouseleave="startTimer"
      @mouseenter="stopTimer"
      @click.stop
    >
      <slot name="dropdown" />
    </div>
  </transition>
</div>
</template>

<script>
const clickEventType = document.ontouchstart !== null ? 'click' : 'touchstart';

export default {
  name: 'dropdown',
  emits: ['update:modelValue'],
  props: {
    modelValue: Boolean,
    hover: Boolean,
    hoverTime: {
      type: Number,
      default: 100
    },
    hoverTimeout: {
      type: Number,
      default: 2500
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    interactive: { // If true, stays open until clicked outside
      type: Boolean,
      default: true,
    },
    transition: {
      type: String,
      default: '',
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hovering: false,
      top: false,
    };
  },
  watch: {
    modelValue(v) {
      if(v) {
        let vm = this;
        this.top = false;
        this.$nextTick(() => {
          const rect = vm.$refs.dropdown.getBoundingClientRect();
          const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
          this.top = (rect.bottom > windowHeight) && (rect.top >= rect.height);
        });
      }
    },
  },
  methods: {
    mouseEnter() {
      this.stopTimer();
      if(this.hover && this.hoverTime > 0 && !this.modelValue) {

        this.hoverOpenTimer = setTimeout(() => {
          this.updateValue(true);
          // Briefly disable
          this.hovering = true;
          setTimeout(() => {
            this.hovering = false;
          }, this.hoverTimeout);
        }, this.hoverTime);
      }
      if(this.hover && !this.modelValue && this.hoverTime === 0) {
        this.hovering = true;
        setTimeout(() => {
          this.hovering = false;
        }, this.hoverTimeout);
        this.updateValue(true);
      }
    },
    mouseLeave() {
      if(!this.hoverTimer) {
        this.startTimer();
      }
      if(this.hoverTime > 0 && this.hover) {
        clearTimeout(this.hoverOpenTimer);
      }
    },
    mouseOver() {
      this.stopTimer();
    },
    closeMenu($event) {
      if(!$event || !this.$el.contains($event.target)) {
        if(this.modelValue && this.closeOnClickOutside) {
          this.updateValue(false);
        }
      }
    },
    toggleMenu() {
      if(this.hovering || (this.modelValue && this.hover)) {
        return;
      }
      this.updateValue(!this.modelValue);
    },
    updateValue(value) {
      this.$emit('update:modelValue', value);
      if(value) {
        document.body.addEventListener(clickEventType, this.closeMenu);
      } else {
        document.body.removeEventListener(clickEventType, this.closeMenu);
      }
    },
    stopTimer() {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    },
    startTimer() {
      if(!this.interactive) {
        this.hoverTimer = setTimeout(this.closeMenu, this.hoverTimeout);
      }
    },
  },
  unounted() {
    document.body.removeEventListener('click', this.closeMenu);
  },
};
</script>

<style lang="postcss">
.dropdown {
  position: relative;
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  top: 34px;
  z-index: 1000;
  width: 100%;
  left: 0;
  max-height: 120px;
  overflow-y: scroll;
}
</style>
