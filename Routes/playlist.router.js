import { Router } from "express";
import { createPlaylist, readOnePlaylist, readPlaylist } from "../BL/service/playlist.service.js";

const router = Router()

router.post('/', async(req, res) => {
    try {
        const data = req.body
        const result = await createPlaylist(data)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})
// read
router.get('/', async(req, res) => {
    try {
        const filter = req.body
        const result = await readPlaylist(filter)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})
router.get('/:_id', async(req, res) => {
    try {
        const _id = req.params._id
        const result = await readOnePlaylist(_id)
        res.send(result)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

export default router