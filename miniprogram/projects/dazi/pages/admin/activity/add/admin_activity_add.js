const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const AdminActivityBiz = require('../../../../biz/admin_activity_biz.js');
const projectSetting = require('../../../../public/project_setting.js');
const behavior = require('admin_activity_add_bh.js');

Page({  
	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'admin', 
		returnUrl: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ACTIVITY_NAME + '-添加',
		});

		this.setData(AdminActivityBiz.initFormData());
		this.setData({
			isLoad: true
		});
	},

	bindFormSubmit: async function () {
		if (!AdminBiz.isAdmin(this)) return;

		await this._bindFormSubmit();
	}



})