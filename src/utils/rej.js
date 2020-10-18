
//phone
export const regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

//username 字母开头，允许5-16字节，允许字母数字下划线
export const regUsername =/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/

//password 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
export const regPassword = /^[a-zA-Z]\w{5,17}$/

//昵称 中文、英文、数字包括下划线
export const regNickname = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/