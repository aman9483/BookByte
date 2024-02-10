const Order = require("../Model/orderModel");
const Product = require("../Model/bookModel");


// Create new Order
exports.newOrder = async (req, res, next) => {

  try{
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  
  res.status(201).json({
    success: true,
    order,
    
  });

}catch(err){

  res.status(400).json({
    success: false,
    message: err.message

  });
    
}
};

// get Single Order
exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  try{

  if (!order) {
    return next(

        res.status(404).json({

            message: "order not found with this Id"
        })
    );
  }

  res.status(200).json({
    success: true,
    order,
  });

}catch(e){

      res.status(500).json({

          message: e.message
      })
}
};

// get logged in user  Orders
exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  try{

  

  res.status(200).json({
    success: true,
    orders,
  });

}catch(e){

     res.status(500).json({

          message: e.message
     })
}
};

// get all Orders -- Admin
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

// update Order Status -- Admin
exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next("Order not found with this Id", 404);
  }

  if (order.orderStatus === "Delivered") {
    return next("You have already delivered this order", 400);
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next("Order not found with this Id", 404);
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
};