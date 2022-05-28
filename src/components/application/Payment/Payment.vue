<template>
  <div>
    <el-select v-model="paymentType" class="m-2 mb-4" placeholder="Select" size="large">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <template v-if="paymentType === 'stripe'">
      <StripePayment />
    </template>

    <template v-else-if="paymentType === 'paypal'"> <PaypalPayment :price="35" /> </template>

    <template v-else>
      <CoinbasePayment />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StripePayment from './StripePayment.vue'
import PaypalPayment from './PaypalPayment.vue'
import CoinbasePayment from './CoinbasePayment.vue'

export default defineComponent({
  components: { StripePayment, PaypalPayment, CoinbasePayment },
  setup() {
    const paymentType = ref('paypal')
    const options = [
      { value: 'stripe', label: 'Stripe' },
      { value: 'paypal', label: 'Paypal' },
      { value: 'coinbase', label: 'Coinbase' }
    ]
    return { paymentType, options }
  },
  created() {},
  methods: {}
})
</script>

<style scoped></style>
