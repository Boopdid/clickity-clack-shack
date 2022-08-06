import { buildSchema } from 'graphql';
import Product from '../models/productModel.js';

export const schema = buildSchema(`
  type Query {
    products: [Product]
  }
  type Product {
    id: ID,
    name: String!,
    description: String,
    image: String!, 
    brand: String!,
    category: String!,
    rating: Float!,
    reviews: [Review],
    numReviews: Int!, 
    price: Float!,
    countInStock: Int!, 
    user: ID
  }
  type Review {
      name: String!, 
      rating: Int!, 
      comment: String!
  }
  type User {
      id: ID, 
      name: String!,
      email: String!, 
      isAdmin: Boolean
  }
  type Order {
    user: ID,
    orderItems: [OrderItem],
    shippingAddress: ShippingAddress,
    paymentMethod: String!,
    paymentResult: PaymentResult,
    taxPrice: Float!,
    shippingPrice: Float!,
    totalPrice: Float!,
    isPaid: Boolean!, 
    paidAt: String
    isDeliever: Boolean!, 
    deliveredAt: String
  }
  type OrderItem {
    name: String!,
    qty: Int!,
    image: String!, 
    price: Float!,
    product: ID, 
  }
  type ShippingAddress {
    address: String!, 
    city: String!, 
    postalCode: String!, 
    country: String!
  }
  type PaymentResult {
    id: String, 
    status: String, 
    update_time: String, 
    email_address: String
  }
`);

export const rootResolver = {
  products: () => Product.find({}),
};
