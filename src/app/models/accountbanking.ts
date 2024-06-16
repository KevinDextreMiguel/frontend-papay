import { Bankingentity } from "./bankingentity"

export class Accountbanking{
   numberAccountBanking:number=0
   typeAccountBanking:string=''
   amountAccountBanking:number=0.0
   dateOpening: Date = new Date(Date.now());
   entityBank: Bankingentity = new Bankingentity()
}