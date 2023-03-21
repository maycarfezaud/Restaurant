import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    heure: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    plat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;
