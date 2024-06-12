const ActivityBiz = require('../../../../biz/activity_biz.js');
const pageHelper = require('../../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../../helper/cloud_helper.js'); 

module.exports = Behavior({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
	},

	methods: {
		/**
			* 生命周期函数--监听页面初次渲染完成
			*/
		onReady: function () { },

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: async function () { },

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function () { },

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () { },

		url: async function (e) {
			pageHelper.url(e, this);
		},

		bindCommListCmpt: function (e) {
			pageHelper.commListListener(this, e);
		}, 

		_delActivity: async function (e, that) {
			let id = pageHelper.dataset(e, 'id');
			let params = {
				id
			}

			let callback = async () => {
				try {
					let opts = {
						title: '删除中'
					}
					await cloudHelper.callCloudSumbit(this.data.route + '/activity_del', params, opts).then(res => {
						pageHelper.delListNode(id, that.data.dataList.list, '_id');
						that.data.dataList.total--;
						that.setData({
							dataList: that.data.dataList
						});
						pageHelper.showSuccToast('删除成功');
					});
				} catch (err) {
					console.log(err);
				}
			}
			pageHelper.showConfirm('确认删除？删除后报名数据将一并删除且不可恢复', callback);
		},

		_clearJoin: async function (e) {
			let id = pageHelper.dataset(e, 'id');

			let params = {
				id
			}

			let callback = async () => {
				try {
					let opts = {
						title: '处理中'
					}
					await cloudHelper.callCloudSumbit(this.data.route + '/activity_clear_join', params, opts).then(res => {
						let node = {
							'ACTIVITY_JOIN_CNT': 0,
						}
						pageHelper.modifyPrevPageListNodeObject(id, node, 1);

						pageHelper.showSuccToast('清空完成');
					});
				} catch (err) {
					console.log(err);
				}
			}
			pageHelper.showConfirm('确认清空所有数据？清空后不可恢复', callback);
		},


		bindStatusTap: function (e) {
			let cb = () => {
				this._setStatus(e, this);
			}
			pageHelper.showConfirm('您确定执行此操作？', cb);

		},

		_setStatus: async function (e, that) {
			let id = pageHelper.dataset(e, 'id');
			let status = Number(pageHelper.dataset(e, 'status'));
			let params = {
				id,
				status
			}

			try {
				await cloudHelper.callCloudSumbit(this.data.route + '/activity_status', params).then(res => {
					pageHelper.modifyListNode(id, that.data.dataList.list, 'ACTIVITY_STATUS', status, '_id');
					pageHelper.modifyListNode(id, that.data.dataList.list, 'statusDesc', res.data.statusDesc, '_id');
					that.setData({
						dataList: that.data.dataList
					});
					pageHelper.showSuccToast('设置成功');
				});
			} catch (err) {
				console.log(err);
			}
		},

		bindStatusMoreTap: async function (e) {
			let itemList = ['启用', '停用 (不显示)', '删除'];
			wx.showActionSheet({
				itemList,
				success: async res => {
					switch (res.tapIndex) {
						case 0: { //启用
							e.currentTarget.dataset['status'] = 1;
							await this._setStatus(e, this);
							break;
						}
						case 1: { //停止 
							e.currentTarget.dataset['status'] = 0;
							await this._setStatus(e, this);
							break;
						}
						case 2: { //删除 
							await this._delActivity(e, this);
							break;
						}
					}
				},
				fail: function (res) { }
			})
		}, 

		_setSort: async function (e) {

			let id = pageHelper.dataset(e, 'id');
			let sort = pageHelper.dataset(e, 'sort');
			if (!id) return;

			let params = {
				id,
				sort
			}

			try {
				await cloudHelper.callCloudSumbit('admin/activity_sort', params).then(res => {
					pageHelper.modifyListNode(id, this.data.dataList.list, 'ACTIVITY_ORDER', sort);
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('设置成功');
				});
			} catch (err) {
				console.log(err);
			}
		}, 
		
		_getSearchMenu: function () {
			let cateIdOptions = ActivityBiz.getCateList();

			let sortItem1 = [{ label: '分类', type: '', value: 0 }];
			sortItem1 = sortItem1.concat(cateIdOptions);

			let sortItem2 = [
				{ label: '排序', type: '', value: 0 },
				{ label: '按报名人数', type: 'sort', value: 'ACTIVITY_JOIN_CNT|desc' },
				{ label: '按开始时间', type: 'sort', value: 'ACTIVITY_START|desc' },
				{ label: '按报名截止时间', type: 'sort', value: 'ACTIVITY_STOP|desc' },
			];

			let sortItems = [];
			if (sortItem1.length > 2) sortItems.push(sortItem1);
			sortItems.push(sortItem2);

			let sortMenus = [
				{ label: '全部', type: '', value: '' },
				{ label: '正常', type: 'status', value: 1 }, 
				{ label: '停用', type: 'status', value: 0 }, 
				{ label: '最新', type: 'sort', value: 'new' },
				{ label: '置顶', type: 'top', value: 'top' },
			]
			this.setData({
				search: '',
				cateIdOptions,
				sortItems,
				sortMenus,
				isLoad: true
			})
		}
	}

})