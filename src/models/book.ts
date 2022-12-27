import { model, Schema } from 'mongoose';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
      get: (val: number) => Math.round(val),
      set: (val: number) => Math.round(val),
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Book = model('Book', bookSchema, 'books');

export default Book;
