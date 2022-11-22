export type Cart = {
	goods_id: string,
	goods_name: string,
	goods_price: number,
	goods_count: number,
	goods_small_logo: string,
	goods_state: string,
}
export type TestState = {
	count: number
	user: {
		age: number
		name: string
	}
}
export type TestGetters = {
	doubleCount: (state: TestState) => number
	username: (state: TestState) => string
}
export  type TestActions = {
	setCount: (count: number) => void
}
// 注意：如有导入导出的依赖数据或类型，自定义test类型需要使用export导出；否则可视为全局类型即可直接使用

export type TestType={
	name?:string,
	id:string|number
}