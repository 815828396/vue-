
import until from './common/common'
export default class Job {
    constructor ({noid, comid, name, colligate, address, type, state, sex, ctime, stime, etime, content, price, setcycle, persum, labour, unit, merchantid, merchantinfo}) {
        this.noid = noid
        this.comid = comid
        this.colligate = colligate
        this.name = name
        this.address = address
        this.type = type
        this.state = state
        this.sex = sex
        this.ctime = ctime
        this.etime = etime
        this.stime = stime
        this.content = content
        this.price = price
        this.setcycle = setcycle
        this.persum = persum
        this.labour = labour
        this.unit = unit
        this.merchantid = merchantid
        this.merchantinfo = merchantinfo
    }
}

/**
 *
 * @name 过滤job兼职属性
 * @param colligate 是否置顶 1
 * @param noid 兼职ID编号
 * @param name 兼职名称
 * @param ctime 创建时间
 * @param stime 开始时间
 * @param etime 结束时间
 * @param price 价钱
 * @param address 地址
 * @param labour
 * @param setcycle 工作周期
 * @param persum 招聘人数
 * @param content 兼职内容
 * @param type 0: 兼职 1: 全职
 * @param sex 0: 兼职 1: 全职
 * @param state 0: 兼职 1: 全职
 * @param unit 0: 小时 1: 日 2：周 3：月
 * @returns {Job}
 */
export function createJob (job) {
    return new Job({
        noid: job.noid,
        name: job.name,
        ctime: until.analyDate(new Date(Date.parse(job.create_time))),
        stime: until.analyDate(new Date(Date.parse(job.start_time))),
        etime: until.analyDate(new Date(Date.parse(job.end_time))),
        colligate: job.colligate,
        price: job.salary,
        address: job.job_address,
        labour: job.labour,
        setcycle: job.setcycle,
        persum: job.hirnumb,
        content: job.content,
        type:  job.type === 0 ? '兼职' : '全职',
        sex: job.sex === 0 ? '男' : (job.sex === '1' ? '女' : '不限'),
        state: job.state === 0 ? '正在招' : '已招完',
        unit: job.unit === 0
          ? '时'
          : (job.unit === 1
              ? '日'
              : (job.unit === 2
                  ? '周'
                  : '月')),
        merchantid: job.merchant_id,
        merchantinfo: job.merchantModel
    })
}
