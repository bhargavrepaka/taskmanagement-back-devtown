import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const Task= sequelize.define('Tasks', {

    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    assignedTo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    tag:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    assignedBy:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    assignedDate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    }  
})

