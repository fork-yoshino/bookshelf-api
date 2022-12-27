import { Router } from 'express';

import { createBook, deleteBook, getAllBooks, getOneBook, updateBook } from '../controllers/books';
import { requestErrorHandler } from '../helpers/helper';
import { createBookValidation, updateBookValidation } from '../validations/books';

const router = Router();

// /api/books
router.get('/', requestErrorHandler(getAllBooks));
router.get('/:id', requestErrorHandler(getOneBook));
router.post('/', createBookValidation, requestErrorHandler(createBook));
router.patch('/:id', updateBookValidation, requestErrorHandler(updateBook));
router.delete('/:id', requestErrorHandler(deleteBook));

export default router;
