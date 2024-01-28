import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Comment= sequelize.define('Comments', {

    message:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    sender:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    senderRole:{
        type: DataTypes.STRING,
        allowNull: true,
    } 
})

