<template>
<div class="checkout">
  <div class="container">
    <div class="checkout-payment">
      <div class="section-head">
        <div class="head-line1 title">
          Payment Method
        </div>
        <div class="head-line2 title">
          How would you like to pay?
        </div>
      </div>
      <div class="payment-options">
        <div class="payment-solomon title" @click="showPlugin('chargebacks')">
          <img :src="SolomonImg">
          SOLOMON
        </div>
        <div class="payment-paypal">
          <img :src="PaypalImg">
        </div>
        <div class="payment-card title">
          Credit Card
        </div>
      </div>
    </div>
  </div>
  <SlmPlugin
    :show="!!paymentType"
    :initialType="paymentType"
    :priceUsdCents="500"
    @cancel="paymentType = null"
  />
</div>
</template>

<script>
import SlmPlugin from '/lib/SlmPlugin.vue';
import SolomonImg from '/example/img/solomon_white.png';
import PaypalImg from '/example/img/paypal.png';

export default {
  name: 'checkout',
  components: {
    SlmPlugin,
  },
  data() {
    return {
      SolomonImg,
      PaypalImg,
      paymentType: null,
    };
  },
  methods: {
    showPlugin(type) {
      this.paymentType = type;
    },
  },
};
</script>

<style lang="postcss">
@import '../dist/font.css';

html,body {
  padding: 0;
  margin: 0;
  width: 100%;
  background-color: #f9f9f9;

  color: black;
  * {
    box-sizing: border-box;
  }
}
.container {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 48px;
  display: flex;
  justify-content: center;
}
.title {
  font-family: Arial, sans-serif;
  font-weight: 700;
}
.checkout {
  text-align: center;
}
.payment-options {
  display: flex;
  margin-top: 24px;
}
.payment-options > div {
  height: 38px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
}
.payment-options > div:not(:last-child) {
  margin-right: 16px;
}
.payment-solomon {
  background-color: #141414;
  font-size: 15px;
  letter-spacing: 1.4px;
  color: white;
}
.payment-solomon> img {
  height: 22px;
  margin-right: 8px;
} 
.payment-paypal {
  background-color: #0079c1;
}
.payment-paypal > img {
  height: 20px;
  margin-top: 2px;
}
.payment-card {
  background-color: #1476f1;
  color: white;
}
.section-head {
  color: #908e8e;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: 8px;
  margin-top: 48px;
}
.head-line1 {
  letter-spacing: 0.65px;
  font-size: 17px;
  font-weight: 600;
}
.head-line2 {
  letter-spacing: 0.42px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 2px;
  color: #b2b2b2;
}
</style>
