import express from "express";

const router = express.Router();

router.get("/crear", (req, res) => {
    res.render("crear");
});

export default router;