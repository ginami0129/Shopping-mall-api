import swaggerAutogen from "swagger-autogen";
import mongoose from "mongoose";

const doc = {
  info: {
    version: "1.0.0",
    title: "Shopping mall API",
    description: "쇼핑몰에서 사용하는 범용적인 API입니다.",
  },
  host: "http://localhost:8080",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Products",
    },
    {
      name: "Orders",
    },
    {
      name: "Users",
    },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  definitions: {
    User: {
      $name: "string",
      $email: "string",
      $password: "string",
      bio: "string",
      address: "string",
      prefileImg: "string",
      isAdmin: "string",
    },
    Product: {
      $name: "string",
      $price: "string",
      $image: "string",
      $brand: "string",
      $category: "string",
      $description: "string",
    },
    Order: {
      $user: { $ref: "#/definitions/User" },
      orderItems: [
        {
          $name: "string",
          $qty: "string",
          $image: "string",
          $price: "string",
          $product: { $ref: "#/definitions/Product" },
        },
      ],
      $paymentMethod: {
        type: String,
        required: true,
      },
      paymentResult: {
        id: "{ type: String }",
        status: "{ type: String }",
        update_time: "{ type: String }",
        email_address: "{ type: String }",
      },
      $taxPrice: "Number",
      $shippingPrice: "Number",
      $totalPrice: "Number",
      isPaid: "Boolean",
      paitAt: "Date",
      isDelivered: "Boolean",
      deliveredAt: "Date",
    },
  },
};
const outputFile = "./config/swagger/index.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen({
  openapi: "3.0.0",
})(outputFile, endpointsFiles, doc).then(async () => {
  await import("../../server.js");
});
