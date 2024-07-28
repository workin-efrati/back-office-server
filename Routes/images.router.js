import express from 'express';
import { deleteImageFromCloud, saveImgToCloud } from '../cloudinary/cloudinary.js';
import multer, { memoryStorage } from 'multer';

const
    router = express.Router(),
    upload = multer({ storage: memoryStorage() });

router.post('/imageFile', upload.single('file'), async (req, res) => {
    const { file } = req
    console.log(file);
    try {
        let result = await saveImgToCloud(file);
        res.send(result)
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }

})

// router.post('/buffer', async (req, res) => {
//     const { buffer } = req.body;

//     try {
//         if (!buffer) {
//             return res.status(400).send("No buffer provided");
//         }

//         const bufferData = Buffer.from(buffer, 'base64');
//         const result = await saveImgOrBufferToCloud(bufferData);
//         res.send(result);
//     } catch (err) {
//         res.status(400).send(err.msg || err.message || "An error occurred");
//     }
// });


//to delete you need to usu public_id
router.delete('/:image_id', async (req, res) => {
    const { image_id } = req.params;
    console.log(image_id);
    try {
        const result = await deleteImageFromCloud(image_id);
        if (result.result === 'ok') {
            res.status(200).send(`Item with id ${image_id} deleted successfully`);
        } else {
            res.status(400).send(`Failed to delete item with id ${image_id}`);
        }
    }
    catch (err) {
        res.status(400).send(err.msg || err.message || "wrong")
    }

})




export default router;  