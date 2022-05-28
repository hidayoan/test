<template>
  <div class="coinbase-payment__field">
    <el-button class="coinbase-payment__button" type="primary" @click="handlePaymentByCoinbase">Click</el-button>
  </div>
</template>

<script lang="ts">
import Payment from '@/models/Payment'
import store from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
  methods: {
    async handlePaymentByCoinbase() {
      try {
        const result = await new Payment().coinbaseCheckout({
          price: { amount: '0.1', currency: 'USD' }
        })
        if (result.status) {
          window.open(result.data.hosted_url, '_blank')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style lang="scss">
.coinbase-payment {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__field {
    width: 100%;
  }

  &__button {
    border-radius: 5px !important;
    padding: 10px 20px;
    height: 55px;
    min-width: 200px;
    width: 100% !important;
  }
}
</style>
