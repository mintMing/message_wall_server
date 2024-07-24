const multer = require("multer");

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./data/photo");
    },
    filename: (req, file, cb) => {
        const type = file.originalname.replace(/.+\./, ".");
        cb(null, Date.now() + random(1, 100) + type);
    },
});

const upload = multer({
    storage: storage,
});

module.exports = (app) => {
    app.post("/profile", upload.single("file"), (req, res, next) => {
        const name = req.file.filename;
        const imt_url = "/photo/" + name;
        res.send(imt_url);
    });
};
