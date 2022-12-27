import { check } from 'express-validator';

export const createBookValidation = [
  check('title').notEmpty().withMessage('バリデーションエラー'),
  check('description').notEmpty(),
  check('rating').notEmpty().isInt({ min: 1, max: 5 }),
  check('comment').notEmpty(),
];

export const updateBookValidation = [
  check('title').optional().notEmpty(),
  check('description').optional().notEmpty(),
  check('rating').optional().notEmpty().isInt({ min: 1, max: 5 }),
  check('comment').optional().notEmpty(),
];
