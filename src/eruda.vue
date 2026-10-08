
<script setup>
  import { onMounted } from 'vue'
  
  onMounted(() => {
    if (process.env.NODE_ENV !== 'production') {
      import('eruda').then(({ default: eruda }) => {
        eruda.init()
      })
    }
  })
</script>
