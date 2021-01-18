import * as jwt from "jsonwebtoken"
import * as fs from "fs"
import * as BCrypt from "bcryptjs"
import * as ApiResponse from '../model/response'
import * as User from '../model/project'

//https://stackoverflow.com/questions/52580754/nodejs-how-to-securely-store-ip-username-and-password-of-a-database
const RSA_PRIVATE_KEY = fs.readFileSync('./cert/private.key')

const areValidCredentials = (email, password) => {
    const user = User.find({ email })

    if (user && BCrypt.compareSync(password, user.hash)) return true

    return false
}

const login = (req, res) => {
    const { email, password } = req.body

    if (areValidCredentials(email, password)) {
        const { _id } = User.find({ email })
 
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
            subject: _id
        })

        res.status(200).send(new ApiResponse({ status: 200, message: 'OK', result: { token: jwtBearerToken, expiresIn: 120 } }))

           // send the JWT back to the user
           // TODO - multiple options available                              
     } else {
         // send status 401 Unauthorized
         res.status(401).send(new ApiResponse({ status: 401, message: 'Unauthorized', result: '' }))
     }
}

export default login