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

export function validPassword(val){
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/
    return reg.test(val)
}

export default {
    validLoginName,
    validPassword
}