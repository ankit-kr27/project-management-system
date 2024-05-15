import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createSubmission } from '../controllers/submission.controller.js';
import { zipUpload } from '../middlewares/multer.middleware.js';

const router = Router();

router.use(verifyJWT);

router.route('/create/:projectId/:stage').post(zipUpload.single('file'), createSubmission);

router.route('/user-submissions').get(getSubmissions);

export default router;