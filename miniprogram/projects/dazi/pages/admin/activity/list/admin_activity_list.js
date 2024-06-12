const AdminBiz = require('../../../../../../comm/biz/admin_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js'); 
const projectSetting = require('../../../../public/project_setting.js');
const behavior = require('admin_activity_list_bh.js');

Page({


	behaviors: [behavior],

	/**
	 * 页面的初始数据
	 */
	data: {
		route: 'admin'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		if (!AdminBiz.isAdmin(this)) return;

		wx.setNavigationBarTitle({
			title: projectSetting.ACTIVITY_NAME + '-管理',
		});
		this.setData({
			ACTIVITY_NAME: projectSetting.ACTIVITY_NAME
		});

		//设置搜索菜单
		this._getSearchMenu();

	},

	bindMoreTap: async function (e) {
		let idx = pageHelper.dataset(e, 'idx');

		let order = this.data.dataList.list[idx].ACTIVITY_ORDER;
		let orderDesc = (order == 0) ? '取消置顶' : '置顶';

		let vouch = this.data.dataList.list[idx].ACTIVITY_VOUCH;
		let vouchDesc = (vouch == 0) ? '推荐到首页' : '取消首页推荐';

		let itemList = ['预览', orderDesc, vouchDesc, '生成专属二维码', '评论管理'];
		let id = pageHelper.dataset(e, 'id');

		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: { //预览 
						wx.navigateTo({
							url: '../../../activity/detail/activity_detail?id=' + id,
						});
						break;
					}
					case 1: { //置顶 
						let sort = (order == 0) ? 9999 : 0;
						e.currentTarget.dataset['sort'] = sort;
						await this._setSort(e);
						break;
					}
					case 2: { //上首页 
						vouch = (vouch == 0) ? 1 : 0;
						e.currentTarget.dataset['vouch'] = vouch;
						await this._setVouch(e);
						break;
					}
					case 3: { //二维码 
						let title = encodeURIComponent(pageHelper.dataset(e, 'title'));
						let qr = encodeURIComponent(pageHelper.dataset(e, 'qr'));
						wx.navigateTo({
							url: `../../setup/qr/admin_setup_qr?title=${title}&qr=${qr}`,
						})
						break;
					}
					case 4: { //评论管理  
						wx.navigateTo({
							url: '../../../comment/list/comment_list?source=admin&id=' + id,
						})
						break;
					}
				}


			},
			fail: function (res) { }
		})
	},

	bindJoinMoreTap: async function (e) {
		let itemList = ['报名名单管理', '导出名单Excel表格', '管理员核销报名码', '获取用户自助签到码', '清空报名数据'];

		let activityId = pageHelper.dataset(e, 'id');
		let title = encodeURIComponent(pageHelper.dataset(e, 'title'));

		wx.showActionSheet({
			itemList,
			success: async res => {
				switch (res.tapIndex) {
					case 0: {
						wx.navigateTo({
							url: '../join_list/admin_activity_join_list?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 1: {
						wx.navigateTo({
							url: '../export/admin_activity_export?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 2: {
						wx.navigateTo({
							url: '../scan/admin_activity_scan?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 3: {
						wx.navigateTo({
							url: '../self/admin_activity_self?activityId=' + activityId + '&title=' + title,
						});
						break;
					}
					case 4: {
						await this._clearJoin(e);
						break;
					}
				}
			},
			fail: function (res) { }
		})
	},

	_setVouch: async function (e) {

		let id = pageHelper.dataset(e, 'id');
		let vouch = pageHelper.dataset(e, 'vouch');
		if (!id) return;

		let params = {
			id,
			vouch
		}

		try {
			await cloudHelper.callCloudSumbit('admin/activity_vouch', params).then(res => {
				pageHelper.modifyListNode(id, this.data.dataList.list, 'ACTIVITY_VOUCH', vouch);
				this.setData({
					dataList: this.data.dataList
				});
				pageHelper.showSuccToast('设置成功');
			});
		} catch (err) {
			console.log(err);
		}
	},


})