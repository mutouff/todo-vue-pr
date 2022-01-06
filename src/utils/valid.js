function userName(str){
    const reg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
    return reg.test(str)
}

function userAccount(str){
    const reg = /[a-zA-Z0-9_]{6,15}/
    return reg.test(str)
}

export function validLoginName(str){
    return userName(str)||userAccount(str)
}

export function validPhone(val){
    const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    return reg.test(val)
}

export function validEmail(val){
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return reg.test(val)
}

export function validPassword(val){
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/
    return reg.test(val)
}

export default {
    validLoginName,
    validPassword,
    validPhone,
    validEmail
}