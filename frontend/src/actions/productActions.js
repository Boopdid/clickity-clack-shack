import axios from 'axios';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants.js';

let origin = window.location.origin;

const client = new ApolloClient({
  uri: `${origin}/graphql`,
  cache: new InMemoryCache(),
});

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await client.query({
      query: gql`
        query {
          products {
            id
            name
            image
            price
            description
            brand
            category
            rating
            numReviews
            countInStock
            reviews {
              name
              rating
              comment
            }
          }
        }
      `,
    });

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
