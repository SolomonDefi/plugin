<template>
<transition name="modal">
  <div v-if="show" class="slm-plugin-modal">
    <div class="slm-plugin-mask" @click="$emit('cancel')" />
    <div class="slm-plugin-wrap">
      <div class="slm-plugin">
        <div class="slm-plugin-title">
          {{ $t('title') }}
        </div>
        <div class="slm-plugin-types-wrap">
          <div class="slm-plugin-types">
            <div
              v-for="plugin in plugins"
              :key="plugin"
              :ref="el => setTypeRef(plugin, el)"
              :class="{ active: type.name === plugin }"
              @click="selectType(types[plugin])"
            >
              {{ $t(`plugin.${plugin}.label`) }}
            </div>
          </div>
          <div
            class="slm-plugin-types-arrow"
            :style="{ left: type.arrowPosition }"
          />
        </div>
        <div class="slm-plugin-content-wrap">
          <SlmPluginChargebacks
            v-if="type.name === 'chargebacks'"
            :prices="prices"
          />
          <SlmPluginPreorder
            v-if="type.name === 'preorder'"
            :prices="prices"
          />
          <SlmPluginEscrow
            v-if="type.name === 'escrow'"
            :prices="prices"
          />
          <div class="slm-plugin-secure">
            <img :src="IcLock">
            <div>{{ $t('secure') }}</div>
          </div>
          <div class="slm-plugin-buttons">
            <div class="slm-plugin-continue" @click="$emit('cancel')">
              {{ $t('continue') }}
            </div>
            <div class="slm-plugin-confirm">
              {{ $t('confirm') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import IcLock from '/lib/assets/img/ic_lock.png';

const plugins = ['chargebacks', 'preorder', 'escrow'];

export default {
  name: 'slm-plugin',
  emits: ['cancel'],
  props: {
    show: Boolean,
    initialType: {
      validator: value => (
        plugins.indexOf(value) !== -1
      ),
      default: 'solomon',
    },
    store: {
      type: Object,
      default: null,
    },
    priceUsdCents: {
      type: Number,
      default: 0,
    },
  },
  data() {
    const types = {
      chargebacks: {
        name: 'chargebacks',
        arrowPosition: '140px',
      },
      preorder: {
        name: 'preorder',
        arrowPosition: '208px',
      },
      escrow: {
        name: 'escrow',
        arrowPosition: '326px',
      },
    };
    return {
      IcLock,
      types,
      plugins,
      type: types[this.initialType || 'chargebacks'],
    };
  },
  computed: {
    priceCents() {
      return this.store ? this.store.totalPrice.value : this.priceUsdCents;
    },
    priceSlm() {
      return this.priceCents * 0.001848;
    },
    priceEth() {
      return this.priceCents * 0.0000084;
    },
    prices() {
      return {
        priceUsd: this.priceCents,
        priceSlm: this.priceSlm,
        priceEth: this.priceEth,
      };
    },
  },
  watch: {
    initialType(newVal) {
      this.type = this.types[newVal];
    },
  },
  methods: {
    escapeListener(event) {
      if(event.keyCode === 27) {
        this.$emit('cancel');
      }
    },
    selectType(type) {
      this.type = type;
    },
    setTypeRef(plugin, el) {
      const type = this.types[plugin];
      if(el) {
        type.arrowPosition = `${el.offsetLeft + ((el.offsetWidth - 20) / 2)}px`;
      }
    },
  },
  mounted() {
    window.addEventListener('keyup', this.escapeListener);
  },
  beforeUnmount() {
    window.removeEventListener('keyup', this.escapeListener);
  },
};
</script>

<style lang="postcss">
@import '/lib/assets/css/font.css';
@import '/lib/assets/css/global.css';

.slm-plugin-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .slm-plugin-mask {
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .slm-plugin-wrap {
    position: relative;
    width: 480px;
    background: white;
    display: flex;
    border-radius: 4px;
  }
  .slm-plugin {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .slm-plugin-title {
    @mixin flex-center;
    @mixin title 24px;
    height: 80px;
    border-bottom: 1px solid #eee;
    color: $text-dark2;
  }
  .slm-plugin-types-wrap {
    position: relative;
  }
  .slm-plugin-types {
    @mixin flex-center;
    @mixin title 11px;
    color: $bg-grey;
    letter-spacing: 2px;
    height: 56px;
    > div {
      @mixin flex-center;
      padding: 0 16px;
      cursor: pointer;
      border-radius: 14px;
      height: 28px;
      &.active {
        background-color: $purple;
        color: white;
      }
      &:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
  .slm-plugin-types-arrow {
    width: 0; 
    height: 0;
    bottom: -1px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid $text-dark;
    transition: left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .slm-plugin-type {
    height: 48px;
    display: flex;
  }
  .slm-plugin-content-wrap {
    background-color: $text-dark;
    transition: height 0.3s;
    .slm-plugin-content-title {
      @mixin text-regular 17px;
      @mixin flex-center;
      color: $bg-grey;
      height: 96px;
    }
    .slm-plugin-content {
      width: 340px;
      height: 184px;
      margin: 0 auto;
      @mixin flex-center-col;
      background-color: white;
      border-radius: 4px;
      padding: 32px 16px 32px 8px;;
      .slm-plugin-content-row {
        display: flex;
        width: 100%;
        &:not(:first-child) {
          margin-top: 9px;
        }
      }
      .slm-plugin-select-title {
        @mixin flex-center;
        @mixin title-regular 12px;
        justify-content: flex-end;
        color: $text-dark;
        height: 34px;
        width: 120px;
        margin-right: 8px;
      }
      .slm-plugin-row-right {
        @mixin flex-center;
        @mixin title-medium 15px;
        color: $text-dark3;
        justify-content: flex-start;
        flex-grow: 1;
      }
      .slm-plugin-price {
        @mixin select;
        flex-grow: 1;
        position: relative;
        justify-content: flex-start;
        .slm-plugin-currency {
          @mixin title 13px;
          color: $text-med2;
          position: absolute;
          right: 8px;
          top: 10px;
        }
      }
      .slm-plugin-month, .slm-plugin-year {
        margin-right: 6px;
      }
      .slm-plugin-year {
        flex-grow: 1;
      }
    }
    .slm-plugin-secure {
      @mixin text-regular 13px;
      @mixin flex-center;
      color: $bg-grey;
      margin: 32px 0;
      img {
        height: 18px;
        margin-right: 8px;
      }
    }
  }
  .slm-plugin-buttons {
    @mixin flex-center;
    height: 96px;
    background: white;
    > div {
      @mixin flex-center;
      height: 34px;
      @mixin title 10px;
      letter-spacing: 1.7px;
      padding: 0 24px;
      border-radius: 17px;
      cursor: pointer;
    }
    .slm-plugin-continue {
      color: $text-dark;
      border: 1px solid $border-med;
      margin-right: 16px;
    }
    .slm-plugin-confirm {
      background-color: $purple;
      color: white;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s linear;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .slm-plugin-wrap,
.modal-leave-active .slm-plugin-wrap {
  transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.3s linear;
}
.modal-enter-from .slm-plugin-wrap,
.modal-leave-to .slm-plugin-wrap {
  opacity: 0;
  transform: scale(0.7) translateY(-10%);
}
</style>
