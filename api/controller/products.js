const Product=require("../models/product")
exports.get_all_products =(req,res,next)=>{
  Product.find()
  .select("name price _id productImage")
  .exec()
  .then(docs=>{
    // if(docs.length >=0 ){
      const response = {
        count:docs.length,
        products:docs.map(doc=>{
          return {
            name:doc.name,
            price:doc.price,
            productImage:doc.productImage,
            _id:doc._id,
            request:{
              type:"Get",
              url:"http://localhost:3000/products/" + doc._id
            }
          }
        })
      }
      res.status(200).json(response)
    // }else{
      // res.status(404).json({message:"no entries found"})
    // }
  })
  .catch(err=>{
    res.status(500).json(err)
  })
}
exports.create_products =(req,res,next)=>{
  console.log(req.file)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name:req.body.name,
    price:req.body.price,
    productImage:req.file.path
  })
product.save().then(result=>{
  console.log(result)
  res.status(200).json({
    message:"created product successfully",
    createdProduct:{
      name:result.name,
      price:result.price,
      id:result._id,
      request:{
        type:"Get",
        url:"http://localhost:3000/products/" + result._id
      }
    }
})
.catch(err=>{
  console.log(err)
  res.status(500).json({
    error:err
  })
})
  
  });
}
exports.get_products=(req,res,next)=>{
  const id =req.params.productId;
 Product.findById(id)
 .select("name price _id productImage")
 .exec()
 .then(doc=>{
   console.log(doc)
   if(doc){
    res.status(200).json({
      product:doc,
      request:{
        type:"Get",
        url:"http://localhost:3000/products/" + doc._id
      }
    })
   }else{
     res.status(404).json({
       message:"no valid entry found for provided Id"
     })
   }
   
 })
 .catch(err=>{
   console.log(err)
 })
  }
  exports.patch_product =(req,res,next)=>{
    const id = req.params.productId
    const updateOps = {}
    for(const ops of req.body){
      updateOps[ops.propName] = ops.value
    }
    Product.updateOne({ _id:id },{$set:updateOps})
    .exec()
    .then(result=>{
      console.log(result)
      res.status(200).json({
        message:"product updated",
        request:{
          type:"Get",
          url:"http://localhost:3000/products" + id
        }
      })
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      })
    })
  }
  exports.delete_products=(req,res,next)=>{
    const id = req.params.productId
    Product.remove(id)
    .exec()
    .then(result=>{
      res.status(200).json({
        message:'Product deleted',
        request:{
          type:"POST",
          url:"http://localhost:3000/products",
          body:{name:"String",price:"Number"}
        }
  
      })
    })
    .catch(err=>{
    res.status(500).json({
      error:err
    })
    })
  }