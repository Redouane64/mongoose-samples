import mongoose, { CreateQuery, Document, Model } from "mongoose"
import { User, UserSchema } from "./user.model"
import { EmailSchema, UserEmail } from "./user-email.model"
import merge from 'mergerino'

const createUser = async (data: User, users: Model<Document & User>) : Promise<void> => {
    const { id } = await users.create(data)
    console.debug(`user ${id} saved.`)
}

const findUserById = async (id: string, users: Model<Document & User>) : Promise<User> => {
    const user = await await users.findOne({id})
    console.debug(JSON.stringify(user))
    return user
}

(async function main() {

    const connection = await mongoose.connect("mongodb://127.0.0.1:27017/acme", { useNewUrlParser: true })
    const usersModel = connection.model<Document & User>("User", UserSchema)
    const emailsModel = connection.model<Document & UserEmail>("Email", EmailSchema)

    try {
        
        //const email = new emailsModel({email: "redouane.sobaihi@live.com"})
        //const user = new usersModel({ userName: "redouane"})

        //email.user = user
        //user.emails.push(email)

        //await email.save()
        //await user.save()
        

        //const found = await usersModel.findOne({ userName: 'redouane' }).populate('emails')
        //console.debug(JSON.stringify(found, undefined, 4))
        /*
        const email = new emailsModel({email: "jack.costo@live.com"})
        const merged = await merge((<User>found), {
            userName: "jack_costo",
            emails: [...found.emails, email]
        })
        */
        //console.debug(JSON.stringify(merged, undefined, 4))

        //const emails = await emailsModel.find().populate('user')
        //console.debug(JSON.stringify(emails, undefined, 4))

        //await createUser({ userName: "redouane", emails: [] }, userModel)
        //await findUserById("57c129fe-72e8-4681-b816-1ef8dacb8203", userModel)

        const found = await usersModel.find({ 
            emails: { $elemMatch: { email: "redouane.sobaihi@live.com"} }
        }).populate('emails')

        console.debug(JSON.stringify(found, undefined, 4))
    } catch (error) {
        console.log(error?.message || "Something went wrong!")
    } finally {
        await connection.disconnect()
    }
})()