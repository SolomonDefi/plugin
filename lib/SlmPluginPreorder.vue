<template>
<div class="slm-plugin-preorder">
  <div class="slm-plugin-content-title">
    {{ $t('preorder.select') }}
  </div>
  <div class="slm-plugin-content">
    <div class="slm-plugin-content-row">
      <div class="slm-plugin-select-title">
        {{ $t('chargebacks.select_label') }}
      </div>
      <SlmSelect
        v-model="currency"
        :options="$tm('chargebacks.currency')"
        class="slm-plugin-row-right"
      />
    </div>
    <div class="slm-plugin-content-row">
      <div class="slm-plugin-select-title">
        {{ $t('chargebacks.schedule') }}
      </div>
      <div class="slm-plugin-row-right">
        <SlmSelect
          v-model="year"
          :disabled="true"
          :options="['2021', '2022', '2023']"
          class="slm-plugin-year"
        />
        <SlmSelect
          v-model="month"
          :disabled="true"
          :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          class="slm-plugin-month"
        />
        <SlmSelect
          v-model="day"
          :options="[day]"
          :disabled="true"
        />
      </div>
    </div>
    <div class="slm-plugin-content-row">
      <div class="slm-plugin-select-title">
        {{ $t('chargebacks.protection') }}
      </div>
      <SlmSelect
        v-model="protection"
        :options="['0%', '5%','10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%']"
        class="slm-plugin-row-right"
      />
    </div>
    <div class="slm-plugin-content-row">
      <div class="slm-plugin-select-title">
        {{ $t('chargebacks.price') }}
      </div>
      <div class="slm-plugin-row-right">
        <div class="slm-plugin-price">
          {{ price || '0' }}
          <div class="slm-plugin-currency">
            {{ currency }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'slm-plugin-preorder',
  props: {
    prices: {
      type: Object,
      default: () => ({ priceEth: 0, priceSlm: 0, priceUsd: 0 })
    }
  },
  data() {
    return {
      month: 6,
      day: 16,
      year: '2021',
      currency: 'ETH',
      protection: '0%',
    };
  },
  computed: {
    price() {
      return this.round(this.currency === 'ETH' ? this.prices.priceEth : this.prices.priceSlm);
    },
  },
  methods: {
    round(n) {
      return Math.round((n + Number.EPSILON) * 1000000) / 1000000;
    },
  },
};
</script>

<style lang="postcss">
</style>
