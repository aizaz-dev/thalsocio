/*
const express = require("express");
const router = express.Router();
const { create, 
        productById,
        readSingle,
        deleteProduct,
        updateProduct,
        list,
        listRelated,
        listCategories,
        listBySearch,
        productPhoto,
     } = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {userById}=require('../controllers/user')

router.get("/product/:productId",readSingle)
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId", requireSignin,isAuth, isAdmin,deleteProduct)
router.put("/product/:productId/:userId", requireSignin,isAuth, isAdmin,updateProduct)
router.param("userId",userById)
router.param("productId",productById)
router.get("/products",list)
router.get("/products/related/:productId",listRelated)
router.get("/products/categories", listCategories)
router.post("/products/by/search", listBySearch)
router.get("/product/photo/:productId", productPhoto)

module.exports=router

*/