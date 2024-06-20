import { Typeservice } from "./typeservice"
import { User } from "./user"

export class Services{

    idService: number = 0
    nameService: string = ""
    descriptionService: string = ""
    
    dateService: Date=new Date(Date.now())
    timeService: Date=new Date()
    user: User=new User()
    typeService: Typeservice=new Typeservice()
}