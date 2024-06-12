const AdminActivityBiz = require('../../../biz/admin_activity_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const behavior = require('../../admin/activity/add/admin_activity_add_bh.js');

Page({
	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'client',
		returnUrl: '../../my/index/my_index',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		this.setData(AdminActivityBiz.initFormData());
		this.setData({
			isLoad: true
		});
	},

	bindFormSubmit: async function () {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		await this._bindFormSubmit();
	}

})