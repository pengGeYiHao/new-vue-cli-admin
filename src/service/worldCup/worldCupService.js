import xhr from '@/service/xhr'

class WorldCupService {

  getList(params, that, cb) {
    return xhr(
      that,
      'http://testapi.hoolihome.com/activity/sports-competition/list',
      'POST',
      params,
      cb)
  }

  add(params, that, cb) {
    return xhr(
      that,
      'http://testapi.hoolihome.com/activity/sports-competition/add',
      'POST',
      params,
      cb)
  }

  edit(params, that, cb) {
    return xhr(
      that,
      'http://testapi.hoolihome.com/activity/sports-competition/update',
      'POST',
      params,
      cb)
  }

  delete(params, that, cb) {
    return xhr(
      that,
      'http://testapi.hoolihome.com/activity/sports-competition/delete',
      'POST',
      params,
      cb)
  }

  getActivityList(params, that, cb) {
    return xhr(
      that,
      'http://testapi.hoolihome.com/activity/sports-bet/activity-list',
      'POST',
      params,
      cb)
  }

  getListDetail(params, that, cb) {
    return xhr(
      that,
      'http://testapi.hoolihome.com/activity/sports-competition/admin-detail',
      'POST',
      params,
      cb)
  }

}

export default new WorldCupService()
