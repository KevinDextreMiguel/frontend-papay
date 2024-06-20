import { Movement } from "./movement"

export class Notification{
    idNotification:number=0
    messageNotification:string=''
    dateShipNotification:Date=new Date(Date.now())
    stateNotification:string=''
    movement: Movement =new Movement()
}