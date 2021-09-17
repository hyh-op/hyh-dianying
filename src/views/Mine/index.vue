<template>
    <div id="main">
        <Header title="hyh中心"></Header>
        	<div id="content">
                <Login></Login>
            </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import Header from  '@/components/Header'
import TabBar from  '@/components/TabBar'
import Login from '@/components/Login'
export default {
        name : 'Movie',
        components:{
            Header,
            TabBar,
            Login
        }
}
</script>

<style lang="scss" scoped>
#content .login_body{  width:100%;}
</style>