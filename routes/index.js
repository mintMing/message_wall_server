const controller = require("../controllers/dbServe");

module.exports = function (app) {
    // 新建留言
    app.post("/messages", controller.insertWall);

    // 新建反馈
    app.post("/feedback", controller.insertFeedback);

    // 新建评论
    app.post("/comment", controller.insertComment);

    // 删除墙
    app.delete("/wall/:id", controller.deleteWall);

    // 删除反馈
    app.delete("/feedback/:id", controller.deleteFeedback);

    // 删除评论
    app.delete("/comment/:id", controller.deleteComment);

    // 分页查询 wall 并获取点赞、举报、撤销数据
    app.get("/wall", controller.findWallPage);

    // 倒序分页查墙的评论
    app.get("/wall/:wallId/comment", controller.findCommentPage);

    // 登记用户 ip
    app.get("/signip", (req, res) => {
        const ip = req.ip;
        res.send({
            code: 200,
            ip,
        });
    });
};
