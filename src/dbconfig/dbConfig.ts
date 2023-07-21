import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MANGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MangoDB connected sucessfully')
        })
        connection.on('error',()=>{
            console.log('MangoDB error')
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong');
        console.log(error);
    }
}