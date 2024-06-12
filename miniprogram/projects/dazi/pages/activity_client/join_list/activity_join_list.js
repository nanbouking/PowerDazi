const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js'); 
const behavior = require('../../admin/activity/join_list/admin_activity_join_list_bh.js');

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
	onLoad: function (options) {
		ProjectBiz.initPage(this);
		if (!PassportBiz.loginMustBackWin(this)) return;

		// 附加参数 
		if (options && options.activityId) {
			//设置搜索菜单 
			this._getSearchMenu();

			this.setData({
				activityId: options.activityId,
				_params: {
					activityId: options.activityId
				}
			}, () => {
				this.setData({
					isLoad: true
				});
			});
		} 
	},

})