const db = require("../lib/db");

// 新建留言
const insertWall = async (wall) => {
    const { type, message, name, user_id, moment, label, color, img_url } =
        wall;
    const sql =
        "INSERT INTO walls (type, message, name, user_id, moment, label, color, img_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [
        type,
        message,
        name,
        user_id,
        moment,
        label,
        color,
        img_url,
    ]);
    return { id: result.insertId, ...wall };
};

// 新建反馈
const insertFeedback = async (value) => {
    const { wall_id, user_id, type, moment } = value;
    const _sql = `INSERT INTO feedbacks (wall_id, user_id, type, moment) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(_sql, [wall_id, user_id, type, moment]);
    return result;
};

// 新建评论
const insertComment = async (value) => {
    const { wall_id, user_id, img_url, moment, comment, name } = value;
    const _sql = `INSERT INTO comments (wall_id, user_id, img_url, moment, comment, name) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(_sql, [
        wall_id,
        user_id,
        img_url,
        moment,
        comment,
        name,
    ]);
    return result;
};

// 删除墙 主表对应多条子表一起删除
const deleteWall = async (id) => {
    let _sql = `DELETE a, b, c FROM walls a LEFT JOIN feedbacks b ON a.id = b.wall_id LEFT JOIN comments c ON a.id = c.wall_id WHERE a.id = ?`;
    await db.query(_sql, [id]);
};

// 删除反馈
const deleteFeedback = async (id) => {
    let _sql = `DELETE FROM feedbacks WHERE id = ?`;
    await db.query(_sql, [id]);
};

// 删除评论
const deleteComment = async (id) => {
    const _sql = `DELETE FROM comments WHERE id = ?`;
    await db.query(_sql, [id]);
};

/**
 * 分页查询
 * @param {number} page
 * @param {number} pageSize 一页的数据量
 * @param {number} type
 * @param {string} label 根据标签查询 -1 为全部
 */
const findWallPage = async (page, pageSize, type, label) => {
    let _sql = null;
    console.log(label)
    if (label == -1) {
        _sql = `SELECT * FROM walls WHERE type = ? ORDER BY id DESC LIMIT ?, ?`;
        // _sql = `SELECT * FROM walls;`;   // 才能匹配完整
        const [results] = await db.query(_sql, [
            type,
            (page - 1) * pageSize,
            parseInt(pageSize, 10),
        ]);
        return results;
    } else {
        _sql = `SELECT * FROM walls WHERE type = ? AND label = ? ORDER BY id DESC LIMIT ?, ?`;
        const [results] = await db.query(_sql, [
            type,
            label,
            (page - 1) * pageSize,
            parseInt(pageSize, 10),
        ]);
        return results;
    }
};

/**
 * 倒叙分页查墙的评论
 * @param {number} page
 * @param {number} pageSize
 * @param {number} id
 */
const findCommentPage = async (page, pageSize, id) => {
    console.log(page + pageSize + id)
    const _sql = `SELECT * FROM comments WHERE wall_id = ? ORDER BY id DESC LIMIT ?, ?`;
    const [results] = await db.query(_sql, [
        id,
        (page - 1) * pageSize,
        parseInt(pageSize, 10),
    ]);
    return results;
};

/**
 * 查询各反馈总数据
 * @param {*} wid 外键
 * @param {*} type
 */
const feedbackCount = async (wid, type) => {
    const _sql = `SELECT COUNT(*) AS count FROM feedbacks WHERE wall_id = ? AND type = ?`;
    const [results] = await db.query(_sql, [wid, type]);
    return results[0];
};

// 查询评论总数
const commentCount = async (wid) => {
    const _sql = `SELECT COUNT(*) AS count FROM comments WHERE wall_id = ?`;
    const [results] = await db.query(_sql, [wid]);
    return results[0];
};

/**
 * 是否点赞
 * @param {*} wid
 * @param {*} uid 用户对 wid 用户点赞
 */
const likeCount = async (wid, uid) => {
    const _sql = `SELECT COUNT(*) AS count FROM feedbacks WHERE wall_id = ? AND user_id = ? AND type = 0`;
    const [results] = await db.query(_sql, [wid, uid]);
    return results[0];
};

module.exports = {
    insertWall,
    insertFeedback,
    insertComment,
    deleteWall,
    deleteFeedback,
    deleteComment,
    findWallPage,
    findCommentPage,
    feedbackCount,
    commentCount,
    likeCount,
};
