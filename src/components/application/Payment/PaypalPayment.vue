<template>
  <div class="paypal-container m-2">
    <div>
      <div ref="paypal"></div>
    </div>
  </div>
</template>

<script>
// import image from "../assets/lamp.png"
import Payment from '@/models/Payment'
export default {
  name: 'HelloWorld',
  props: {
    price: {
      type: Number,
      default: 10
    }
  },
  data: function () {
    return {
      loaded: false,
      paidFor: false
    }
  },
  mounted: function () {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.VUE_APP_PAYPAL_KEY}`
    script.addEventListener('load', this.setLoaded)
    document.body.appendChild(script)
  },
  methods: {
    setLoaded: function () {
      this.loaded = true
      window.paypal
        .Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            tagline: false
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: 'USD',
                    value: this.price
                  }
                }
              ]
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            this.data
            this.paidFor = true

            const storeData = {
              id: order.id,
              payer: order.payer,
              payee: order.purchase_units[0].payee,
              payment: order.purchase_units[0].payments.captures[0]
            }

            await new Payment().paypalSuccess(storeData)
          },
          onError: (err) => {
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.paypal-container {
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;

  // min-height: 200px;

  & > div {
    width: 100%;
  }
}
</style>
