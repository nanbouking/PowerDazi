const ProjectBiz = require('../../../biz/project_biz.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const behavior = require('../../admin/activity/self/admin_activity_self_bh.js');

Page({
	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'client', 
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);  
		if (!await PassportBiz.loginMustBackWin(this)) return;
		if (!pageHelper.getOptions(this, options, 'activityId'));

		if (options && options.title) {
			let title = decodeURIComponent(options.title);
			this.setData({
				title
			});
		} 

		await this._loadDetail();
	 
	},


})