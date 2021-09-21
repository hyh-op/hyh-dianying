<template>
    <div class="city_body">
				<div class="city_list">
					<Loading v-if="isLoading"/>
					<Scroller ref="city_List"  v-else>
						<div>
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="data in hostList" :key="data.id" @tap='handleToCity(data.nm , data.id)'>
								{{data.nm}}
							</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="city in item.list" :key="city.id" @tap='handleToCity(city.nm , city.id)'>{{city.nm}}</li>
							</ul>
						</div>
					</div>
					</div>
					</Scroller>
				</div>
				<div class="city_index">
					<ul>
						<li v-for="(data,index) in cityList" :key="data.index" @touchstart="handleToindex(index)">{{data.index}}</li>
					</ul>
				</div>
	</div>
</template>

<script>
export default {
    name : 'City',
	data(){
		return {
			cityList : [],
			hostList : [],
			isLoading : true
		}
	},
	mounted(){
		var cityList = window.localStorage.getItem('cityList')
		var hostList = window.localStorage.getItem('hostList')
		//如果有本地存储的话，就不用再加载了
		if(cityList && hostList){
			this.cityList = JSON.parse(cityList)
			this.hostList = JSON.parse(hostList)
			this.isLoading = false
		}else{
		this.axios.get('/dianying/cities.json').then(res => {
			// console.log(res.data)
			var msg = 'ok'
			if(msg == 'ok'){
				this.isLoading = false
				var data = res.data.cts
				//用下面的函数，对data进行格式化改造
				var {cityList , hostList} = this.formatCityList(data)
				this.cityList = cityList
				this.hostList = hostList
				window.localStorage.setItem('cityList' ,JSON.stringify(cityList))
				window.localStorage.setItem('hostList' ,JSON.stringify(hostList))
			}
		})
		}
	},
	methods: {
		formatCityList(cities){
			var cityList = []
			var hostList = []

			for(var i = 0; i < cities.length; i++){
				if(cities[i].id >= 1 && cities[i].id <= 30){
					hostList.push(cities[i])
				}
			}

			for(var i =0; i< cities.length; i++){
				var firstLetter = cities[i].py.substring(0,1).toUpperCase()
				if(toCom(firstLetter)){		//新添加索引
					cityList.push({ index : firstLetter , list : [ {nm : cities[i].nm , id : cities[i].id} ] })
				}else{	//累加已有索引
					for(var j = 0; j < cityList.length; j++){
						if( cityList[j].index === firstLetter){
							cityList[j].list.push({nm : cities[i].nm , id : cities[i].id})
						}
					}
				}
			}
			cityList.sort((n1,n2) => {
				if(n1.index > n2.index){
					return 1
				}
				else if(n1.index < n2.index){
					return -1
				}
				else{
					return 0
				}
			})

			
		
			function toCom(firstLetter){
				for(var i = 0; i< cityList.length; i++){
					if(cityList[i].index === firstLetter){
						return false
					}
				}
				return true
			}
			// console.log(cityList)
			// console.log(hostList)
			return {
				cityList,
				hostList
			}
			},
		handleToindex(index){
			var h2 = this.$refs.city_sort.getElementsByTagName('h2')
			//this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
			//上面是原本的写法，加上betterscroll之后，里面的点击被管理了，在封装里面些，用betterscroll自带的方法，自带的方法是向上滚动的，要给距离加上负的
			this.$refs.city_List.toScrollTop(-h2[index].offsetTop)

		},
		handleToCity(nm,id){
			this.$store.commit('city/CITY_INFO',{nm , id })
			window.localStorage.setItem('nowNm',nm)
			window.localStorage.setItem('nowId',id)
			this.$router.push('/movie/nowPlaying')
		}
		}
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>