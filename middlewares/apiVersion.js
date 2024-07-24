const apiVersionMiddleware = (req, res, next) => {
    const apiVersion = req.headers["api-version"];
    const supportedVersion = ["v1"];
    if(!apiVersion || !supportedVersion.includes(apiVersion)) {
        return res.status(400).send("Unsupported API version.")
    }

    req.apiVersion = apiVersion;  
    next();
}

module.exports = apiVersionMiddleware;