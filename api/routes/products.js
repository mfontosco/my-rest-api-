const express = require("express");
const router = express.Router();

const ProductControllers =require("../controller/products")
const multer = require("multer");

const checkAuth=require("../middleware/check-auth")

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
      const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
  }
});
const fileFilter = (req,file,cb) =>{
// reject file
if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
  cb(null,true)
}else{
  cb(null,false);
}
}
const upload = multer({ storage: storage ,
  limit:{
  fileSize:1024 * 1024 * 5
},
fileFilter:fileFilter
})



router.get("/",ProductControllers.get_all_products);
router.post("/",checkAuth,upload.single("productImage"),ProductControllers.create_products)
router.get("/:productId",);
router.patch("/:productId",checkAuth,ProductControllers.patch_product);
router.delete("/:Id",checkAuth,ProductControllers.delete_products);


module.exports = router;