<template lang="pug">

</template>
<script>
export default {
   data() {
      return {

      }
   },
   mounted() {

   },
   beforeRouteEnter(to, from, next) {
       //console.log(from)
        next(vm => {
            vm.$router.replace(from.fullPath)
        })
    },
   methods: {

   }
}
</script>
<style scoped lang="less">

</style>
