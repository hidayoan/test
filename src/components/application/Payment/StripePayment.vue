<template>
  <div>
    <div class="stripe-payment m-2">
      <div class="stripe-payment__field">
        <StripeElements
          v-if="stripeLoaded"
          v-slot="{ elements }"
          ref="elms"
          :stripe-key="stripeKey"
          :instance-options="instanceOptions"
          :elements-options="elementsOptions"
        >
          <StripeElement ref="card" :elements="elements" :options="cardOptions" />
        </StripeElements>
      </div>
      <el-button type="primary" class="stripe-payment__button" @click="pay">Pay</el-button>
    </div>
    <div v-if="token.token">
      {{ token.token.id }}
    </div>
  </div>
</template>

<script lang="ts">
import { StripeElements, StripeElement } from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { defineComponent, ref, onBeforeMount } from 'vue'
import store from '@/store'
import Payment from '@/models/Payment'

export default defineComponent({
  name: 'CardOnly',

  components: {
    StripeElements,
    StripeElement
  },

  setup() {
    let isLoading = ref(false)

    const stripeKey = ref(
      'pk_test_51Kvk1rBd5H3WmM6fcpLdZk1DtkRty4I7KfVD7IoGDzU7ju6Q2Wt9JvNXvkJyoFw7MSTZidtwjQchyKNCi5jhYzV800wzapyqiY'
    ) // test key
    const instanceOptions = ref({
      // https://stripe.com/docs/js/initializing#init_stripe_js-options
    })
    const elementsOptions = ref({
      // https://stripe.com/docs/js/elements_object/create#stripe_elements-options
    })
    const cardOptions = ref({
      // https://stripe.com/docs/stripe.js#element-options
      value: {
        postalCode: '12345'
      }
    })
    const stripeLoaded = ref(false)
    const card = ref()
    const elms = ref()

    const token: any = ref({})

    onBeforeMount(() => {
      const stripePromise = loadStripe(stripeKey.value)
      stripePromise.then(() => {
        stripeLoaded.value = true
      })
    })

    return {
      stripeKey,
      stripeLoaded,
      instanceOptions,
      elementsOptions,
      cardOptions,
      card,
      elms,
      token
    }
  },

  methods: {
    pay() {
      // Get stripe element
      const cardElement = this.card.stripeElement

      // Access instance methods, e.g. createToken()
      this.elms.instance.createToken(cardElement).then(async (result: any) => {
        // Handle result.error or result.token
        try {
          this.token = result

          const data = await new Payment().stripeCheckout({
            source: result.token.id,
            amount: 40000,
            currency: 'usd',
            description: 'abc'
          })

          if (data) {
            console.log(data)
          }
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
})
</script>

<style lang="scss">
.StripeElement {
  height: 55px;
  width: 100%;
  padding: 10px 20px;
  border-top: 1px solid #999;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  border-radius: 5px 0 0 5px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.__PrivateStripeElement {
  width: 100%;
  margin: auto 0 !important;
}
.stripe-payment {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__field {
    width: 100%;
  }

  &__button {
    border-radius: 0 5px 5px 0 !important;
    padding: 10px 20px;
    height: 55px;
    min-width: 200px;
  }
}
</style>
