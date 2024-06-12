

module.exports = { //dazi 
	PROJECT_COLOR: '#FDC907',
	NAV_COLOR: '#000000',
	NAV_BG: '#ffe99a',


	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' },
		{ title: '用户使用协议', key: 'SETUP_YS' },
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [ 
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'trade', title: '行业领域', type: 'text', must: true },
		{ mark: 'city', title: '所在地区', type: 'text', must: false },
	],
	USER_CHECK_FORM: {
		name: 'formName|must|string|min:1|max:30|name=昵称',
		mobile: 'formMobile|must|mobile|name=手机',
		pic: 'formPic|must|string|name=头像',
		forms: 'formForms|array'
	},


	NEWS_NAME: '公告通知',
	NEWS_CATE: [
		{ id: 1, title: '公告通知' },

	],
	NEWS_FIELDS: [
	],

	ACTIVITY_NAME: '活动',
	ACTIVITY_CATE: [
		{ id: 1, title: '饭搭' },
		{ id: 2, title: '旅搭' },
		{ id: 3, title: '游戏' },
		{ id: 4, title: '运动' },
		{ id: 5, title: '户外' }, 
		{ id: 7, title: '交友' },
		{ id: 8, title: '聊天' },
		{ id: 9, title: '健身' }, 
		{ id: 10, title: '电影' }, 
		{ id: 11, title: '万能搭' },
	
	],
	ACTIVITY_FIELDS: [ 
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true }, 
		{ mark: 'desc', title: '活动介绍', type: 'content', must: true }, 

	], 
	ACTIVITY_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, max: 30 },
		{ mark: 'phone', type: 'mobile', title: '手机', must: true, edit: false, ext: { hidden: true } }
	],


	COMMENT_NAME: '评论',
	COMMENT_FIELDS: [
		{ mark: 'content', title: '评论内容', type: 'textarea', must: true },
		{ mark: 'img', title: '图片', type: 'image', min: 0, max: 8, must: false },

	],

}