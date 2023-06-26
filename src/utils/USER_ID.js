import {v4 as uuidv4} from 'uuid'
let userId
export const getUserUUID = ()=>{
    userId = localStorage.getItem('USERTEMPID')
    if(!userId){
        userId = uuidv4()
        localStorage.setItem('USERTEMPID',userId)
    }
    return userId
}