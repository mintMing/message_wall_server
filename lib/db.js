const mysql = require("mysql2/promise");
const config = require("../config/default");

const createDatabase = async () => {
    const connection = await mysql.createConnection({
        host: config.database.HOST,
        user: config.database.USER,
        password: config.database.PASSWORD,
    });

    const WALL_DB_CREATE_SQL = `create database if not exists WALL default charset utf8 collate utf8_general_ci`;
    await connection.query(WALL_DB_CREATE_SQL);
    await connection.end();
};

const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const executeSQL = async (sql, value) => {
    try {
        const [results] = await pool.query(sql, value);
        return results;
    } catch (error) {
        throw error;
    }
};

const createTables = async () => {
    // 留言/图片表
    const walls = `create table if not exists walls(
        id int not null auto_increment,  
        type int not null comment "型0信息1图片",
        message varchar(1000) comment "留言",
        name varchar(100) not null comment "用户名",
        user_id varchar(100) not null comment "创建者ID",
        moment varchar(100) not null comment "时间",
        label int not null comment "标签",
        color int comment "颜色",
        img_url varchar(100) comment "图片路径",
        primary key (id)
    )`;

    // 留言反馈
    const feedbacks = `  
        create table if not exists feedbacks(  
            id int not null auto_increment,  
            wall_id int not null comment "留言墙ID",  
            user_id varchar(100) not null comment "反馈者ID",   
            type int not null comment "反馈类型0喜欢1举报2撤销",   
            moment varchar(100) not null comment "时间",  
            primary key (id)  
    )`;

    // 留言评论
    const comments = `  
        create table if not exists comments(  
            id int not null auto_increment,  
            wall_id int not null comment "留言墙ID",  
            user_id varchar(100) not null comment "评论者ID",  
            img_url varchar(100) comment "头像路径",  
            comment varchar(1000) comment "评论内容",  
            name varchar(100) not null comment "用户名",  
            moment varchar(100) not null comment "时间",  
            primary key (id)  
    )`;

    await executeSQL(walls);
    await executeSQL(feedbacks);
    await executeSQL(comments);
};

const setupDatabase = async () => {
    try {
        await createDatabase();
        await createTables();
        console.log("Database and tables created successfully.");
    } catch (error) {
        console.error("Error creating database and tables:", error);
    }
};

setupDatabase();

module.exports = pool;