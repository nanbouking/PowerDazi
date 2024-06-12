const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const ActivityBiz = require('../../../biz/activity_biz.js');
const projectSetting = require('../../../public/project_setting.js');

Page({

	data: {

		isLoad: false,
		_params: null,

		sortMenus: [],
		sortItems: [],

		isShowCate: projectSetting.ACTIVITY_CATE.length > 1
	},

	/**
		* 生命周期函数--监听页面加载
		*/
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		this._getSearchMenu();
		this.setData({
			_params: {
				type: 'his'
			},

			isLoad: true
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	url: async function (e) {
		pageHelper.url(e, this);
	},

	bindCommListCmpt: function (e) {
		pageHelper.commListListener(this, e);
	},


	onShareAppMessage: function () {

	},

	_getSearchMenu: function () {

		let sortItem1 = [{
			label: '全部',
			type: 'cateId',
			value: ''
		}];

		if (ActivityBiz.getCateList().length > 1)
			sortItem1 = sortItem1.concat(ActivityBiz.getCateList());

		let sortItems = [];

		this.setData({
			sortItems,
			sortMenus: sortItem1
		})

	}

})