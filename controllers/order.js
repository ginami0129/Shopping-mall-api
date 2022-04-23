import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const getOrders = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Orders']
  const orders = await Order.find();

  res.json({
    msg: "Read order",
    count: orders.length,
    result: orders,
  });
});

const createOrder = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Orders']
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.json({
      msg: "Created Order!",
      createdOrder,
    });
  }

  //   const newOrder = {
  //     product: req.body.product,
  //     qty: req.body.quantity,
  //     message: req.body.msg,
  //   };
  //   res.json({
  //     msg: "Create order",
  //     order: newOrder,
  //   });
});

const getOrderByID = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Orders']
  const { orderID } = req.params;
  const order = await Order.findById(orderID);
  res.json({
    msg: "test",
    order,
  });
});

const myOrder = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Orders']
  const order = await Order.findOne({ user: req.user._id });
  if (!order) {
    res.json({
      msg: "Empty order",
    });
  }
  res.json({
    msg: "Update order",
    order,
  });
});

const updatePayStatus = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Orders']
  const order = await Order.findById(req.params.id);
  // if (order.user != req.user._id) {
  //   res.status(408);
  //   throw new Error("주문한 사람이 아닙니다.");
  // }

  if (order) {
    order.isPaid = true;
    order.paitAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateDeliveryStatus = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Orders']
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  getOrders,
  createOrder,
  myOrder,
  updatePayStatus,
  updateDeliveryStatus,
  getOrderByID,
};
