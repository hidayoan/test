<template>
  <div class="product-detail">
    <el-page-header content="List Product" @back="goBack" />
    <el-row :gutter="32" align="middle">
      <el-col :span="8">
        <el-image :src="data.imageSrc" :preview-src-list="[data.imageSrc]" fit="cover" class="product-detail__image" />
      </el-col>
      <el-col :span="16">
        <el-card class="product-detail__card">
          <template #header>
            <div class="product-detail__card--header">
              <label>{{ data.name }}</label>
              <el-tag effect="dark" size="large">$ {{ data.price }}</el-tag>
            </div>
          </template>
          <div>
            <div class="description">
              <strong>Team size :</strong>
              <read-more
                more-str="read more"
                :text="data.size"
                link="#"
                less-str="read less"
                :max-chars="200"
                class="123"
              ></read-more>
            </div>

            <div class="payment-type">
              <Payment />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent } from 'vue'
import Payment from '../../components/application/Payment/Payment.vue'

export default defineComponent({
  components: { Payment },
  setup() {
    const goBack = () => {
      router.push('/product')
    }

    const data = {
      id: 1,
      name: 'School Event',
      imageSrc:
        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/school-event-flyer-template-design-9717e1632b811c2aff8ae62891878455_screen.jpg?ts=1636989589',
      imageAlt: 'School event',
      price: '35',
      size: 12
    }
    return { data, goBack }
  }
})
</script>

<style lang="scss">
.product-detail {
  &__image {
    border-radius: 10px;
    background-color: white;

    width: 100%;
  }

  &__card {
    // min-height: 400px;
    border-radius: 10px;

    &--header {
      background-color: white;

      display: flex;
      align-items: center;
      justify-content: space-between;

      & > label {
        font: 1.5em sans-serif;
        margin-bottom: 0;
      }
    }
  }

  p {
    margin-bottom: 0 !important;
  }
}

.description {
  display: flex;
  margin-bottom: 20px;
  & > * {
    margin-right: 10px;
  }
}
</style>
