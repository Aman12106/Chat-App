import { Router } from "express";

const router = Router();

router.get('/login',(req, res) => {
    return res.json({
        message: "hit login routes"
    })
})

export default router;