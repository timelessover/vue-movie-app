import{calcTime} from '../utils/util.js'
export const handleImgandStars = {
	methods: {
		//处理数据
		formatData(arr) {
			let list = []
			if (arr.length) {
				list = arr.map(item => {
					let temp = { ...item
					}
					temp.avatarurl = temp.avatarurl || '/static/images/avatar.png'
					temp.purchase = !!(temp.tagList && temp.tagList.fixed.some(item => item.id === 4))
					temp.stars = this.formatStar(temp.score)
					temp.calcTime = calcTime(temp.startTime)
					return temp
				})
			}
			return list
		},
		//处理评分星星
		formatStar(sc) {
			//1分对应满星，0.5对应半星
			let stars = new Array(5).fill('star-empty')
			const fullStars = Math.floor(sc) //满星的个数
			const halfStar = sc % 1 ? 'star-half' : 'star-empty' //半星的个数，半星最多1个
			stars.fill('star-full', 0, fullStars) //填充满星
			if (fullStars < 5) {
				stars[fullStars] = halfStar; //填充半星
			}
			let url = stars.map(item => {
				return item = `/static/images/${item}.png`
			})
			return url
		}
	}
}
