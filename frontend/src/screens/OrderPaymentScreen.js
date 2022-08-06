import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, makePaymentIntent } from '../actions/orderActions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const OrderPaymentScreen = (props) => {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(
      'pk_test_51LT7u2Kq2cnBFx9OtcnUmgRfMuNeaUAEHtQOA5HDCHZAuIxQKbftF00djVSn10g26TH2lUhgIi11AMj6v3jQQUOf00gB09dfij'
    )
  );

  let params = useParams();
  const orderId = params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderIntentInfo = useSelector((state) => state.orderPayIntent);
  console.log(orderIntentInfo);
  const {
    loading: loadingPaymentIntent,
    success: successPaymentIntent,
    paymentIntent,
  } = orderIntentInfo;
  let clientSecret = paymentIntent?.clientSecret;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetails(orderId));
    }

    if (!order?.isPaid && !clientSecret?.length) {
      dispatch(makePaymentIntent(orderId));
    }
  }, [dispatch, order, orderId, clientSecret]);

  console.log(clientSecret);

  const appearance = {
    theme: 'night',

    variables: {
      colorBackground: '#6f42c1',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return loading || loadingPaymentIntent || !stripePromise ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1> Order {order._id}</h1>
      <Row>
        <Col md={7}>
          <Card>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm orderId={orderId} />
              </Elements>
            )}
          </Card>
        </Col>
        <Col>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderPaymentScreen;
