<template>
    <div class="city_body">
				<div class="city_list">
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="data in hostList" :key="data.cityId">
								{{data.name}}
							</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="item in cityList" :key="item.index">
							<h2>{{item.index}}</h2>
							<ul>
								<li v-for="city in item.list" :key="city.cityId">{{city.name}}</li>
							</ul>
						</div>
					</div>
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
			hostList : []
		}
	},
	mounted(){
		this.axios({
			url : 'https://m.maizuo.com/gateway?k=122572',
			headers: {'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16315121551792663514775553","bc":"440100"}',
			'X-Host': 'mall.film-ticket.city.list'}
		}).then(res => {
			// console.log(res.data)
			var msg = res.data.msg
			if(msg == 'ok'){
				var data = res.data.data.cities
				//用下面的函数，对data进行格式化改造
				var {cityList , hostList} = this.formatCityList(data)
				this.cityList = cityList
				this.hostList = hostList
			}
		})
	},
	methods: {
		formatCityList(cities){
			var cityList = []
			var hostList = []

			for(var i = 0; i < cities.length; i++){
				if(cities[i].isHot === 1){
					hostList.push(cities[i])
				}
			}

			for(var i =0; i< cities.length; i++){
				var firstLetter = cities[i].pinyin.substring(0,1).toUpperCase()
				if(toCom(firstLetter)){		//新添加索引
					cityList.push({ index : firstLetter , list : [ {name : cities[i].name , cityId : cities[i].cityId} ] })
				}else{	//累加已有索引
					for(var j = 0; j < cityList.length; j++){
						if( cityList[j].index === firstLetter){
							cityList[j].list.push({name : cities[i].name , cityId : cities[i].cityId})
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
			this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop

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