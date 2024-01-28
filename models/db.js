import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
})
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS ,{
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port:process.env.DB_PORT
    }
)

sequelize.authenticate().then(() => {
   //('RDS DB connected .');
}).catch((error) => {
   console.error('Unable to connect  ', error);
});



