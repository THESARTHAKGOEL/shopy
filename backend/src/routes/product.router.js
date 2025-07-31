const express = require("express");
const productModel = require("../models/product.model");
const ImageKit = require("imagekit");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", (req, res) => {});

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("=== NEW PRODUCT REQUEST ===");
    console.log("Request body:", req.body);
    console.log(
      "File received:",
      req.file ? `Yes: ${req.file.originalname}` : "No file"
    );

    if (!req.file) {
      console.log("ERROR: No file uploaded");
      return res.status(400).json({
        success: false,
        message: "Please select an image file",
      });
    }

    const imagekit = new ImageKit({
      publicKey: "public_M0PAK4NmC1d2995cVHB6hjiBgaE=",
      privateKey: "private_KT7FkfaTOTLNy6lVG+V7iKE2ba4=",
      urlEndpoint: "https://ik.imagekit.io/ls436o8px",
    });

    console.log("Uploading image to ImageKit...");
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      isPrivateFile: false,
      isPublished: true,
    });

    console.log("Image uploaded successfully. URL:", result.url);
    const imageUrl = result.url;

    const { title, description, category, price } = req.body;
    console.log("Product data:", { title, description, category, price });

    const product = new productModel({
      title: title,
      description: description,
      category: category,
      price: price,
      image: imageUrl,
    });

    console.log("Saving product to database...");
    await product.save();
    console.log("Product saved successfully!");

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: product,
    });
    console.log("Response sent to frontend");
  } catch (error) {
    console.error("=== ERROR DETAILS ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error name:", error.name);

    let errorMessage = "Failed to add product";
    if (error.message.includes("ImageKit")) {
      errorMessage = "Image upload failed - check ImageKit credentials";
    } else if (
      error.message.includes("MongoError") ||
      error.message.includes("mongoose")
    ) {
      errorMessage = "Database error - check MongoDB connection";
    } else if (error.message.includes("ValidationError")) {
      errorMessage = "Validation error - check required fields";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await productModel.findById(productId);

  console.log(product);

  res.status(200).json({ message: "data mil gya ", product });
});

router.get("/update/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await productModel.findById(productId);

  res.render("updateForm", { product: product });
});

router.post("/update/:id", upload.single("image"), async (req, res) => {
  const productId = req.params.id;

  console.log(req.body);

  const { title, description, category, price } = req.body;

  const imagekit = new ImageKit({
    publicKey: "public_M0PAK4NmC1d2995cVHB6hjiBgaE=",
    privateKey: "private_KT7FkfaTOTLNy6lVG+V7iKE2ba4=",
    urlEndpoint: "https://ik.imagekit.io/ls436o8px",
  });

  const result = await imagekit.upload({
    file: req.file.buffer,
    fileName: req.file.originalname,
    isPrivateFile: false,
    isPublished: true,
  });

  const imageUrl = result.url;

  await productModel.findByIdAndUpdate(productId, {
    title: title,
    description: description,
    category: category,
    price: price,
    image: imageUrl,
  });

  res.redirect(`/products/${productId}`);
});

router.get("/delete/:id", async (req, res) => {
  const productId = req.params.id;

  await productModel.findByIdAndDelete(productId);

  res.redirect("/");
});

module.exports = router;
