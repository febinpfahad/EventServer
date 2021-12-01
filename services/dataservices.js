
const db = require('./db')
const { v4: uuidv4 } = require('uuid')

const jwt = require('jsonwebtoken')

const register = (userid, username, password) => {

    return db.Eventuser.findOne({ userid })
        .then(user => {
            if (user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "user already exist....plz login"
                }
            }
            else {

                const newUser = new db.Eventuser({
                    userid,
                    username,
                    password,
                    event: []

                })
                newUser.save()
                console.log(newUser)
                return {
                    statusCode: 200,
                    status: true,
                    message: "registered successfully"
                }
            }

        })
}
const login = (userid, password) => {
    return db.Eventuser.findOne({ userid, password })
        .then(user => {
            if (user) {
                const token = jwt.sign({
                    currentId: userid
                }, 'spersecretkey123123')
                return {
                    statusCode: 200,
                    status: true,
                    message: "login successfully",
                    token,
                  currentUser:user.username,
              currentId:user.userid
                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
        })

}
const eventAdd = (req, eventname, eventdate) => {
    let uno = uuidv4();

    let userid = req.currentNo
    console.log(userid,eventname,eventdate)
    return db.Eventuser.findOne({ userid })
        .then(user => {
            if (!user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
            
            user.event.push({
                uno,
                eventname,
                eventdate
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                message: "event added successfully",
            }

        })

}

const eventDelete = (req, uno) => {
    let userid = req.currentNo

    return db.Eventuser.updateOne({ userid }, { $pull: { event: { uno } } })
        .then(user => {
            if (!user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
            else {
                console.log(user);
                return {
                    statusCode: 200,
                    status: true,
                    message: "deleted successfully"


                }
            }

        }
        )





}
const eventAll = (req) => {
    let userid = req.currentNo
    return db.Eventuser.findOne({ userid })
        .then(user => {
            if (user) {
                // console.log(user.event[0]);

                return {
                    statusCode: 200,
                    status: true,
                    event: user.event
                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
        })
}
const eventEdit = (req, uno,eventname,eventdate) => {
    let userid = req.currentNo
   let data={
       uno,
       eventname,
       eventdate
   }

    return db.Eventuser.updateOne({ userid, "event.uno": uno},
    { $set: {"event.$":data } } )
        .then(user => {
            if (!user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
            else {
                console.log(data);
                return {
                    statusCode: 200,
                    status: true,
                    message: "edited successfully"


                }
            }

        }
        )





}
const deleteAcc = (req) => {
    let userid = req.currentNo
    return db.Eventuser.deleteOne({ userid })
        .then(user => {
            if (user) {
                // console.log(user.event[0]);

                return {
                    statusCode: 200,
                    status: true,
                    message: "your account deleted successfully"
                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
        })
}




module.exports = {
    register,
    login,
    eventAdd,
    eventAll,
    eventDelete,
    eventEdit,
    deleteAcc
}