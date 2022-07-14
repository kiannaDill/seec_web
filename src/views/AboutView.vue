<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import instance from "@/api/api"
export default {
  name: "HomeView",
  created() {
    // /api/aa  ===> 127.0.0.1:2222/aa
    instance.get("/asd").then(res => console.log(res))

    // instance.post("/asd",{name:"zz"}).then(res => console.log(res))
  }
};
</script>

<style lang="scss" scoped>

</style>