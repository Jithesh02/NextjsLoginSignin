import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userId}:any) =>{
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        // 
        if (emailType ==="VERIFY")
        {
            await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}) 
        }
        else if (emailType === 'reset'){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}) 
        }

        const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "e7c94c45cb7650",
                  pass: "9a8465d3fbc4b8"
                }
        })

        const mailOptions = {
            from: '123@g.com',
            to: email,
            subject: emailType ==="VERIFY"?"Verification":"Reseting",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"?"verify your email":"reset your password"}</p>`
        }

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;

    } catch(error: any) {
        throw new Error(error.message)
    }
}