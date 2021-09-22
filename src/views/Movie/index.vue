<template>
    <div id="main">
        <Header title="hyh电影"></Header>
            <div id="content">
                <div class="movie_menu">
                    <router-link class="city_name" tag="div" to="/movie/city">
                        <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>
                    </router-link>
                    <div class="hot_swtich">
                        <router-link class="hot_item" tag="div" to="/movie/nowplaying">正在热映</router-link>
                        <router-link class="hot_item" tag="div" to="/movie/comingsoon">即将上映</router-link>
                    </div>
                    <router-link class="search_entry" tag="div" to="/movie/search">
                        <i class="iconfont icon-sousuo"></i>
                    </router-link>
                </div>
                <keep-alive>
                    <router-view ></router-view>
                </keep-alive>
            </div>
        <TabBar></TabBar>
        <router-view name="detail"></router-view>
    </div>
</template>
<script>
import Header from  '@/components/Header'
import TabBar from  '@/components/TabBar'
import { messageBox } from '@/components/Js'
export default {
        name : 'Movie',
        components:{
            Header,
            TabBar
        },
        mounted(){
            setTimeout(()=>{
                this.axios.get('/geoip/').then(res=>{
                //console.log(res.data.city)
                    var nm = res.data.city
                    //这里留了个Bug,由于api不是原本猫眼的，没有对应的城市id数据，所以本地存储的id没法改,这样后续的影院ajax需要id也没法改
                    /* var nm = res.data.id */
                    if(this.$store.state.city.nm === nm){return}
                    messageBox({
                    title: '定位',
                    content : nm,
                    cancel : '取消',
                    ok : '切换定位',
                    handleOk(){
                        window.localStorage.setItem('nowNm',nm)
                        /* window.localStorage.setItem('nowId',id) */
                        window.location.reload()
                    }
                })
            })
            },3000)
            
        }
}
</script>

<style scoped>
#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
.movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>