<template>
    <div class="movie_body" ref="movie_body">
		<Loading v-if="isLoading"/>
		<Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
				<ul>
					<!-- <li>
						<div class="pic_show"><img src="/images/movie_1.jpg"></div>
						<div class="info_list">
							<h2>无名之辈</h2>
							<p>观众评 <span class="grade">9.2</span></p>
							<p>主演: 陈建斌,任素汐,潘斌龙</p>
							<p>今天55家影院放映607场</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li> -->
					<li class="pulldown">{{pullDownMsg}}</li>
					<li v-for="data in movieList" :key="data.id">
						<div class="pic_show" @tap="handleToDetail(data.id)"><img :src=searchImg(data.img)></div>
						<div class="info_list">
							<h2 @tap="handleToDetail(data.id)">{{data.nm}} <img v-if="data.version === 'v3d imax'" src="@/assets/maxs.png" alt=""></h2>
							<p v-if="data.sc != 0 ">观众评 <span class="grade">{{data.sc}}</span></p>
							<p v-else><span class="grade">{{data.wish}}</span>人想看</p>
							<p>主演: {{data.star}}</p>
							<p>{{data.showInfo}}</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
				</ul>
		</Scroller>
			</div>
</template>

<script>

// import BScroll from 'better-scroll'

export default {
    name : 'Nowplaying',
	data(){
		return {
			movieList : [],
			pullDownMsg : '',
			isLoading : true,
			prevCityId : -1
		}
	},
	activated () {
		//mounted只会触发一次，不刷新的话
		//activated在keep-alive组件激活时调用,当切换城市要切换要走ajax,页面切换的时候不用

		var cityId = this.$store.state.city.id

		if (this.prevCityId === cityId){
			return
		}
		this.isLoading = true
		//console.log('123')
		this.axios.get(`/ajax/movieOnInfoList?cityId=${cityId}`).then(res=>{
			this.movieList = res.data.movieList
			this.isLoading = false
			this.prevCityId = cityId
			// console.log(res.data.movieList)
			//数据加载完毕的时候，再用better-scroll,vue提供下列函数，页面渲染完毕之后，再调用该方法的回调
			/* this.$nextTick(()=>{
				//BScroll两个参数，第一个最外层容器，第二个配置选项,让BScroll里面的事件生效
				var scroll = new BScroll(this.$refs.movie_body,{
					tap: true,
					probeType: 1
				})
				scroll.on('scroll',(pos)=>{
					// console.log('scroll')
					if( pos.y > 30){
						this.pullDownMsg = '正在加载中'
					}
				})
				scroll.on('touchEnd',(pos)=>{
					//console.log('touchEnd')
					if( pos.y > 30){
						//一般放在第二次ajax之后
						this.pullDownMsg = '加载完毕'
					}
				})
			}) */
		})
	},
	methods:{
		searchImg(data){
			var str = data.replace('w.h/','') + '@1l_1e_1c_128w_180h'
			return str
		},
		handleToDetail(movieId){
			//console.log(movieId)
			this.$router.push(`/movie/detail/1/${movieId}`)
		},
		handleToScroll(pos){
			if( pos.y > 30){
				this.pullDownMsg = '正在加载中'
			}
		},
		handleToTouchEnd(pos){
			if( pos.y > 30){
				//一般放在第二次ajax之后
				this.axios.get(`/ajax/movieOnInfoList?cityId=${this.cityId}`).then(res=>{
					this.pullDownMsg = '加载完毕'
					setTimeout(()=>{
						this.movieList = res.data.movieList
						this.pullDownMsg = ''
					},1000)
				})
				
			}
		}
	}
	
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pulldown{margin: 0;padding: 0;border: none;}
</style>