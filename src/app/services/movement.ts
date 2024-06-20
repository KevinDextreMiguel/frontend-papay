import { Accountbanking } from "./accountbanking"

export class Movement{
    idMovement: number = 0
    dateMovement: Date=new Date(Date.now())
    typeMovement: string = ""
    amountMovement: number = 0.0
    numberAccountBanking: Accountbanking =new Accountbanking()
}




