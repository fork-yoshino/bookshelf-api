import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import Book from '../models/book';

async function getAllBooks(req: Request, res: Response): Promise<void> {
  const books = await Book.find().sort({ updatedAt: -1 });
  console.log(books);
  res.json(books);
}

// REVIEW: getOneBook or getBookById
async function getOneBook(req: Request, res: Response): Promise<void> {
  const _id = req.params.id;
  const book = await Book.findOne({ _id });
  if (book === null) {
    res.status(404).json({ msg: 'Target Book Not Found' });
    return;
  }
  res.json(book);
}

async function createBook(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const _errors = errors.array();
    res.status(400).json(_errors);
    return;
  }

  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
}

async function updateBook(req: Request, res: Response): Promise<void> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const _errors = errors.array();
    res.status(400).json(_errors);
    return;
  }

  const { title, rating, description, comment } = req.body;
  const _id = req.params.id;
  const book = await Book.findOne({ _id });
  if (book === null) {
    res.status(404).json({ msg: 'Target Book Not Found' });
    return;
  } else {
    if (title !== undefined) book.title = title;
    if (description !== undefined) book.description = description;
    if (rating !== undefined) book.rating = rating;
    if (comment !== undefined) book.comment = comment;
    await book.save();
  }
  res.json(book);
}

async function deleteBook(req: Request, res: Response): Promise<void> {
  const _id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id });
  if (deletedCount === 0) {
    res.status(404).json({ msg: 'Target Book Not Found' });
    return;
  }
  res.json({ msg: 'Delete succeeded' });
}

export { getAllBooks, getOneBook, createBook, updateBook, deleteBook };
