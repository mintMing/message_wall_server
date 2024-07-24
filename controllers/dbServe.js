const Model = require("../models/wallModel");  
  
// 新建留言  
const insertWall = async (req, res) => {  
    const data = req.body;  
    try {  
        const result = await Model.insertWall(data);  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  
  
// 新建反馈  
const insertFeedback = async (req, res) => {  
    const data = req.body;  
    try {  
        const result = await Model.insertFeedback(data);  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  
  
// 新建评论  
const insertComment = async (req, res) => {  
    const data = req.body;  
    try {  
        const result = await Model.insertComment(data);  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  
  
// 删除墙  
const deleteWall = async (req, res) => {  
    const data = req.body;  
    try {  
        // 如果地址存在，删除对应图片  
        if (data.img_url) {  
            // 假设Mkdir是一个处理文件删除的工具类  
            // Mkdir.delFiles("data/" + data.imgurl);  
        }  
        const result = await Model.deleteWall(data.id);  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  
  
// 删除反馈  
const deleteFeedback = async (req, res) => {  
    const data = req.body;  
    try {  
        const result = await Model.deleteFeedback(data.id);  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  

const deleteComment = async (req, res) => {  
    const data = req.body;  
    try {  
        const result = await Model.deleteComment(data.id);  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  
  
// 分页查询  
const findWallPage = async (req, res) => {  
    const data = req.query;
    // console.log(data)
    try {  
        const result = await Model.findWallPage(data.page, data.pageSize, data.type, data.label); 
         // 查找相应wall的赞、举报、撤销数据
        for (let i = 0; i < result.length; i++) {  
            // 喜欢
            result[i].like = await Model.feedbackCount(result[i].id, 0);  
             // 举报
            result[i].report = await Model.feedbackCount(result[i].id, 1);  
             // 要求撤销
            result[i].revoke = await Model.feedbackCount(result[i].id, 2);  
             // 是否点赞
            result[i].islike = await Model.likeCount(result[i].id, data.user_id);  
             // 评论数
            result[i].comcount = await Model.commentCount(result[i].id);  
        }  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        // console.error(error);
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  
  
// 倒序分页查墙的评论  
const findCommentPage = async (req, res) => {  
    const data = req.query; 
    try {  
        console.log(data)
        const result = await Model.findCommentPage(data.page, data.pageSize, data.id);  
        res.send({  
            code: 200,  
            message: result,  
        });  
    } catch (error) {  
        console.log(error)
        res.status(500).send({  
            code: 500,  
            message: "Internal Server Error",  
        });  
    }  
};  
  
module.exports = {  
    insertWall,  
    insertFeedback,  
    insertComment,  
    deleteWall,  
    deleteFeedback,  
    findWallPage,  
    findCommentPage,  
    deleteComment,
};