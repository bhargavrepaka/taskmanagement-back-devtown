import nodemailer from 'nodemailer'


let config = {
    service : 'gmail',
    auth : {
        user:"lookoutknowledge@gmail.com",
        pass: "huakmfblbjeucpvf"
    }
}

let transporter =nodemailer.createTransport(config)

export const sendMail=async (messageFor,mailReceiver,mailText,sender)=>{
    let messageForTaskUpdate = {
        from: 'nomoreterminate@gmail.com', // sender address
        to: mailReceiver, // list of receivers
        subject: "Task has been Updated", // Subject line
        text: mailText, // plain text body
        html: `<h1>${mailText}</h1>`, // html body
      }

      let messageForNewTask = {
        from: 'nomoreterminate@gmail.com', // sender address
        to: mailReceiver, // list of receivers
        subject: `New Task Assigned` , // Subject line
        text: mailText, // plain text body
        html:`<h1>${mailText}</h1>`, // html body
      }

      let messageForUserRoleChange = {
        from: 'nomoreterminate@gmail.com', // sender address
        to: mailReceiver, // list of receivers
        subject: `Role Changed` , // Subject line
        text: mailText, // plain text body
        html:`<h1>${mailText}</h1>`, // html body
      }

      let messageForNewComment = {
        from: 'nomoreterminate@gmail.com', // sender address
        to: mailReceiver, // list of receivers
        subject: `New comment on  task` , // Subject line
        text: mailText, // plain text body
        html:`<h1>${mailText}</h1>`, // html body
      }
      let mailObject=null
      if(messageFor==="newtask"){
        mailObject=messageForNewTask
        }
      else if(messageFor==="taskupdate"){
            mailObject=messageForTaskUpdate
        }
      else if(messageFor==="roleupdate"){
            mailObject=messageForUserRoleChange
        }
        else{
            mailObject=messageForNewComment
        }

      try {
        const result = await transporter.sendMail(mailObject)
        return Promise.resolve(result)
      } catch (error) {
        //("error from mail helper",error)
        return Promise.reject(error)
      }
}
