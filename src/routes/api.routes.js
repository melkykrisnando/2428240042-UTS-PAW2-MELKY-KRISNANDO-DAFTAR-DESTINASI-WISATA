import express from 'express'
import WisataController from '../controllers/wisata.controller.js'
import { logMiddleware } from '../middleware/log.middleware.js'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'

const router = express.Router()

router.use(logMiddleware)

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

router.get('/wisata',WisataController.index)
router.get("/wisata/:_id",WisataController.show)
router.post("/wisata",WisataController.store)
router.put("/wisata/:_id",WisataController.update)
router.patch("/wisata/:_id",WisataController.update) 
router.delete("/wisata/:_id",WisataController.delete)

export default router
