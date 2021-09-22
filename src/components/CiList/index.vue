<template>
    <div class="cinema_body">
		<Loading v-if="isLoading"/>
		<Scroller>
				<ul>
					<!-- <li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li> -->
					<li v-for="data in cinemaList" :key="data.cinemaId">
						<div>
							<span>{{data.nm}}</span>
							<span class="q"><span class="price">{{data.sellPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{data.addr}}</span>
							<span>{{data.distance}}</span>
						</div>
						<div class="card">
                			<div v-for="(cardNum,key) in data.tag" v-if="cardNum === 1" :key="key" :class="key | classCard">
								{{key | formatCard }}
							</div>
       					</div> 
					</li>
				</ul>
		</Scroller>
			</div>
</template>

<script>
export default {
    name : 'CiList',
	data () {
		return {
			cinemaList : [],
			isLoading : true,
			prevCityId : -1
		}
	},
	activated(){
		var cityId = this.$store.state.city.id

		if (this.prevCityId === cityId){
			return
		}
		this.isLoading = true
		//这里有个bug，这里的axios的url拼接上了日期，由于还没有对日期进行获取，所以每隔天请求需要改一下url的日期，待后期完善
		this.axios.get(`/api/mtrade/mmcs/cinema/v1/select/movie/cinemas.json?limit=20&offset=0&utm_term=7.5&client=iphone&channelId=4&areaId=-1&brandId=-1&districtId=-1&hallType=-1&lineId=-1&movieId=1356063&serviceId=-1&stationId=-1&showDate=2021-09-22&cityId=${cityId}&ci=151`).then(res =>{
				this.cinemaList = res.data.data.cinemas
				this.isLoading = false
				console.log(this.cinemaList)
				this.prevCityId = cityId
			

		})
	},
	/* mounted(){
		this.axios({
			url:'https://m.maizuo.com/gateway?cityId=440100&ticketFlag=1&k=5640806',
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16315121551792663514775553","bc":"440100"}',
				'X-Host': 'mall.film-ticket.cinema.list'
			}
		}).then(res =>{
				this.cinemaList = res.data.data.cinemas
				console.log(this.cinemaList)
			

		})
	}, */
	filters : {
		formatCard(key){
			var card = [
				{ key : 'allowRefund' , value : '退'},
				{ key : 'buyout' , value : ''},
				{ key : 'cityCardTag' , value : ''},
				{ key : 'deal' , value : ''},
				{ key : 'endorse' , value : '改签'},
				{ key : 'giftTag' , value : ''},
				{ key : 'sell' , value : '折扣卡'},
				{ key : 'snack' , value : '小吃'},
			]
			for (var i =0; i< card.length; i++){
				if(card[i].key === key){
					return card[i].value
				}
			}
			return ''
		},
		classCard(key){
			var card = [
				{ key : 'allowRefund' , value : 'bl'},
				{ key : 'buyout' , value : ''},
				{ key : 'cityCardTag' , value : ''},
				{ key : 'deal' , value : ''},
				{ key : 'endorse' , value : 'bl'},
				{ key : 'giftTag' , value : ''},
				{ key : 'sell' , value : 'or'},
				{ key : 'snack' , value : 'or'},
			]
			for (var i =0; i< card.length; i++){
				if(card[i].key === key){
					return card[i].value
				}
			}
			return ''
		}
	}
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>