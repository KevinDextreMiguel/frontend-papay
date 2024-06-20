import { Services } from "./services"

export class Voucher{
   idVoucher:number=0
   dateVoucher:Date=new Date(Date.now())
   hourVoucher:Date=new Date()
   destinationAccountVoucher:number=0
   amountVoucher:number=0.0
   numberOperationVoucher:number=0
   serviceB: Services =new Services()
}
