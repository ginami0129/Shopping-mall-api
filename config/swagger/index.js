const config = {
  openapi: "3.0.0",
  info: {
    title: "Shopping mall API",
    description: "범용적인 쇼핑몰에서 사용하는 API입니다.",
    contact: {
      email: "ginami0129n@naver.com",
      name: "Kwon, Ginam",
    },
    version: "1.0.0",
  },

  externalDocs: {
    description: "개발자 GitHub",
    url: "https://github.com/ginami0129",
  },
  tags: [
    {
      name: "Product",
      description: "상품과 관련된 API",
    },
    {
      name: "Orders",
      description: "주문과 관련된 API",
    },
    {
      name: "Users",
      description: "유저와 관련된 API",
    },
  ],
  paths: {
    "/api/users": {
      post: {
        tags: ["Users"],
        summary: "Create User",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  $ref: "#/definitions/Users",
                },
                example: {
                  first_name: "Wesley",
                  last_name: "Westelley",
                  email: "wesley@gmail.com",
                  password: "1234",
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    newUserCreated: {
                      type: "object",
                    },
                  },
                  example: {
                    first_name: "Wesley",
                    last_name: "Westelley",
                    email: "wesleywestelley@gmail.com",
                    password:
                      "$2a$08$YoFgv1ClaAlKteANv31R2.9mS1XpPqfUtE3svXGGMfVXLbvSprlES",
                    cart: [],
                    admin: false,
                    _id: "61b222acb58a840f6d8dbd71",
                    __v: 0,
                  },
                },
              },
            },
          },
          404: {
            description:
              "Bad Request - invalid email/password/first_name/last_name or User already registered",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Users"],
        summary: "List Users",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Users listed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    users: {
                      type: "array",
                    },
                  },
                  example: {
                    success: true,
                    users: [
                      {
                        first_name: "Wesley",
                        last_name: "Westelley",
                        email: "wesleywestelley@gmail.com",
                        password:
                          "$2a$08$YoFgv1ClaAlKteANv31R2.9mS1XpPqfUtE3svXGGMfVXLbvSprlES",
                        cart: [],
                        admin: false,
                        _id: "61b222acb58a840f6d8dbd71",
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request",
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/users/login": {
      post: {
        tags: ["Users"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
                example: {
                  email: "email@gmail.com",
                  password: "1234",
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {},
                },
              },
            },
          },
          404: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "Token invalid",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/users/{userId}": {
      get: {
        tags: ["Users"],
        summary: "List User By ID",
        parameters: [
          {
            in: "path",
            name: "userId",
            description: "userId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "User listed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    user: [
                      {
                        first_name: "Wesley",
                        last_name: "Westelley",
                        email: "wesleywestelley@gmail.com",
                        password:
                          "$2a$08$YoFgv1ClaAlKteANv31R2.9mS1XpPqfUtE3svXGGMfVXLbvSprlES",
                        cart: [],
                        admin: false,
                        _id: "61b222acb58a840f6d8dbd71",
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - invalid ID or ID don't exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "ID is not valid",
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete User By ID - ADMIN",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            description: "userId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "User listed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    userDeleted: [
                      {
                        first_name: "Name",
                        last_name: "LastName",
                        email: "namelastname@gmail.com",
                        password:
                          "$2a$08$YoFgv1ClaAl2222222KteANv31R2.E3svXGGMfVXLbvSprlES",
                        cart: [],
                        admin: false,
                        _id: "61b222a1258a840f6d8dbd71",
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - invalid ID or ID don't exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "ID is not valid",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - must be admin or the user to delete.",
          },
        },
      },
    },
    "/products": {
      post: {
        tags: ["Product"],
        summary: "Create new product - ADMIN",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  $ref: "#/definitions/Product",
                },
                example: {
                  name: "React Infinity Run Flyknit 2",
                  description:
                    "React Infinity Run Flyknit is perfect for any environment and is super comfortable for both walking and running.",
                  product_image:
                    "https://static.nike.com/a/images/t_default/9f0c78f7-f7f0-4778-8ba5-806ccfeac665/react-infinity-run-flyknit-2-womens-road-running-shoes-rfh6Z8.png",
                  category: "Woman",
                  price: 95,
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Product created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    newProductCreated: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    newProductCreated: [
                      {
                        name: "React Infinity Run Flyknit 2",
                        description:
                          "React Infinity Run Flyknit is perfect for any environment and is super comfortable for both walking and running.",
                        product_image:
                          "https://static.nike.com/a/images/t_default/9f0c78f7-f7f0-4778-8ba5-806ccfeac665/react-infinity-run-flyknit-2-womens-road-running-shoes-rfh6Z8.png",
                        category: "Woman",
                        price: 95,
                        _id: "61bd2d7c7682b8e5c983fe10",
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - Product already exists/fields invalid",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "Product already exists",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
      get: {
        tags: ["Product"],
        summary: "List products",
        parameters: [
          {
            in: "query",
            name: "category",
            description: "filter by category (Man/Woman)",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Product listed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    newProductCreated: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    listProducts: [
                      {
                        name: "React Infinity Run Flyknit 2",
                        description:
                          "React Infinity Run Flyknit is perfect for any environment and is super comfortable for both walking and running.",
                        product_image:
                          "https://static.nike.com/a/images/t_default/9f0c78f7-f7f0-4778-8ba5-806ccfeac665/react-infinity-run-flyknit-2-womens-road-running-shoes-rfh6Z8.png",
                        category: "Woman",
                        price: 95,
                        _id: "61bd2d7c7682b8e5c983fe10",
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/products/{productId}": {
      get: {
        tags: ["Product"],
        summary: "Get Product By ID",
        parameters: [
          {
            in: "path",
            name: "productId",
            description: "productId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Product listed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    product: {
                      type: {},
                    },
                  },
                  example: {
                    success: true,
                    product: {
                      _id: "61bd275b7682b8e5c983fdf5",
                      name: "Nike Shox NZ Shoes ",
                      description:
                        "Ideal for the runner who craves protection from impact, this sneaker is designed with a comfortable upper, firm laces and cushioned midsole.",
                      product_image:
                        "https://images.lojanike.com.br/1024x1024/produto/tenis-nike-shox-nz-masculino-501524-108-1.png",
                      category: "Man",
                      price: 95,
                      video_url: "https://youtu.be/7LEQUBg1UE8",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - invalid ID or ID don't exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "ID is not valid",
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Product"],
        summary: "Delete Product By ID - ADMIN",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            description: "productId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Product deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    productDeleted: {
                      _id: "61bd2ab87682b8e5c983fe00",
                      name: "Nike Air Max 270",
                      description:
                        "Nike Air Max 270 was designed from the ground up for casual wear comfort, and Nike React is one of the softest, most responsive and toughest foams on the market. ",
                      product_image:
                        "https://static.nike.com/a/images/t_default/25f77096-431c-447e-b9b7-56ae5cb72fd0/air-max-270-womens-shoes-Pgb94t.png",
                      category: "Woman",
                      price: 95,
                      video_url: "",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - invalid ID or ID don't exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "ID is not valid",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
      put: {
        tags: ["Product"],
        summary: "Edit Product By ID - ADMIN",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            description: "productId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Product edited",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    productEdited: {
                      _id: "61bd2ab87682b8e5c983fe00",
                      name: "270",
                      description:
                        "responsive and toughest foams on the market. ",
                      product_image:
                        "https://static.nike.com/a/images/t_default/25f77096-431c-447e-b9b7-56ae5cb72fd0/air-max-270-womens-shoes-Pgb94t.png",
                      category: "Woman",
                      price: 95,
                      video_url: "",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - invalid ID or ID don't exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "ID is not valid",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/cart": {
      get: {
        tags: ["Cart"],
        summary: "List user cart",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "All user cart listed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    cartUser: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    cartUser: [
                      {
                        _id: "61c388e616b12624d9a7443a",
                        userId: "61c37d31f96e674171871f4c",
                        productId: [
                          {
                            _id: "61bd24987682b8e5c983fdef",
                            name: "Nike Shox R4",
                            description:
                              "The Nike Shox R4 men's sneaker is designed with a comfortable upper, firm laces, and a cushioned midsole.",
                            product_image:
                              "https://images.lojanike.com.br/1024x1024/produto/tenis-nike-shox-r4-masculino-104265-045-1.png",
                            category: "Man",
                            price: 100,
                            video_url: "https://youtu.be/mDpiH3RV0Pg",
                            __v: 0,
                          },
                        ],
                        quantity: 2,
                        __v: 0,
                      },
                    ],
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/cart/{productId}": {
      delete: {
        tags: ["Cart"],
        summary: "Remove product from cart",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            description: "productId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Product removed",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      type: {},
                    },
                  },
                  example: {
                    success: true,
                    productRemoved: {
                      deletedCount: 1,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - invalid ID or ID don't exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "ID is not valid",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
      put: {
        tags: ["Cart"],
        summary: "Edit Quantity Product In Cart",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            description: "productId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Product edited",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    productEdited: {
                      _id: "61bd2ab87682b8e5c983fe00",
                      name: "270",
                      description:
                        "responsive and toughest foams on the market. ",
                      product_image:
                        "https://static.nike.com/a/images/t_default/25f77096-431c-447e-b9b7-56ae5cb72fd0/air-max-270-womens-shoes-Pgb94t.png",
                      category: "Woman",
                      price: 95,
                      video_url: "",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request - invalid ID or ID don't exists",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "ID is not valid",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
      post: {
        tags: ["Cart"],
        summary: "Add Product In Cart",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            description: "productId is required",
            type: "string",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Product added",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    user: {
                      type: [{}],
                    },
                  },
                  example: {
                    success: true,
                    productAdded: {
                      _id: "61bd2ab87682b8e5c983fe00",
                      name: "270",
                      description:
                        "responsive and toughest foams on the market. ",
                      product_image:
                        "https://static.nike.com/a/images/t_default/25f77096-431c-447e-b9b7-56ae5cb72fd0/air-max-270-womens-shoes-Pgb94t.png",
                      category: "Woman",
                      price: 95,
                      video_url: "",
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
          404: {
            description:
              "Bad Request - invalid ID or Product already add in your cart",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                  example: {
                    success: false,
                    error: "Product already add in your cart",
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
          },
        },
      },
    },
    "/payment": {
      post: {
        tags: ["Checkout"],
        summary: "Checkout",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    url: {
                      type: "string",
                    },
                  },
                  example: {
                    url: "https://checkout.stripe.com/pay/cs_test_a1TOqf0XUI1u9MeFLb2oQsEMbhO5jsoszOLnAvHL1VodI11ezaZBN4j0hb#fidkdWxOYHwnPyd1blpxYHZxWjA0TjU8MlVPUVVpTmJGbU1GSmlDM1dvPDJETz1nd01QTkpHcWFUZ2RgZjBBQmJqT08wQ1A2SnNNTHxBNHJ2YVZKRzVQXENPNU9qZ05",
                  },
                },
              },
            },
          },
          404: {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                    error: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Users: {
        type: "object",
        required: ["first_name", "last_name", "email", "password"],
        properties: {
          first_name: {
            type: "string",
          },
          last_name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "number",
          },
          admin: {
            type: "boolean",
            required: false,
          },
        },
        xml: {
          name: "User",
        },
      },
      Product: {
        type: "object",
        required: ["name", "description", "product_image", "category", "price"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          product_image: {
            type: "string",
          },
          category: {
            type: "string",
          },
          price: {
            type: "number",
          },
          video_url: {
            type: "string",
            required: false,
          },
        },
        xml: {
          name: "Product",
        },
      },
      Cart: {
        type: "object",
        required: ["name", "description", "product_image", "category", "price"],
        properties: {
          userId: {
            type: "string",
          },
          productId: {
            type: "string",
          },
          quantity: {
            type: "number",
            default: 1,
          },
        },
        xml: {
          name: "Cart",
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  definitions: {
    Users: {
      type: "object",
      required: ["first_name", "last_name", "email", "password"],
      properties: {
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "number",
        },
        admin: {
          type: "boolean",
          required: false,
        },
      },
      xml: {
        name: "User",
      },
    },
    Product: {
      type: "object",
      required: ["name", "description", "product_image", "category", "price"],
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        product_image: {
          type: "string",
        },
        category: {
          type: "string",
        },
        price: {
          type: "number",
        },
        video_url: {
          type: "string",
          required: false,
        },
      },
      xml: {
        name: "Product",
      },
    },
    Cart: {
      type: "object",
      required: ["name", "description", "product_image", "category", "price"],
      properties: {
        userId: {
          type: "string",
        },
        productId: {
          type: "string",
        },
        quantity: {
          type: "number",
          default: 1,
        },
      },
      xml: {
        name: "Cart",
      },
    },
  },
};

export default config;
