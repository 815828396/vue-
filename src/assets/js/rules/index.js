/**
 * @name element-ui 限制 表达规则验证
 * @author xing
 */
import ruleFn from './ruleFun'

export const isNull = (trigger = 'blur') => [{validator: ruleFn.checkNull, required: true, trigger}]

export const isPid = (trigger = 'blur') => [{validator: ruleFn.checkPid, required: true, trigger}]

export const isPhone = (trigger = 'blur') => [{validator: ruleFn.checkPhone, required: true, trigger}]
