const router=require("express").Router()

router.use((req, res) => {
    res.status(404);
    const accept = req.headers.accept || "";
    if (accept.includes("html")) {
        res.status(404).json({ success: false, error: "Route Not Found" });
    } else if (accept.includes("json")) {
        res.status(404).json({ success: false, error: "Route Not Found" });
    } else {
        res.status(404).json({ success: false, error: "Route Not Found" });
    }
});
module.exports = router