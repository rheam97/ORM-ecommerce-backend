const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: {
      model: Product,
      attributes: ['product_name']
    }
  }).then(dbCategoryData=> {
    res.json(dbCategoryData)
  }).catch(err=> {
    console.log(err)
    res.sendStatus(500).json(err)
  })
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    include: {
      model: Product,
      attributes: ['product_name']
    }
  }).then(dbCategoryData=> {
    if(!dbCategoryData){
      res.sendStatus(404).json({message: 'No category found with this id'})
      return
    }
    res.json(dbCategoryData)
  }).catch(err=> {
    console.log(err)
    res.sendStatus(500).json(err)
  })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(dbCategoryData=> res.json(dbCategoryData))
  .catch(err=> {
    console.log(err)
    res.sendStatus(500).json(err)
  })
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
   { where: {
      id: req.params.id
   }
  }).then(dbCategoryData=> {
    if(!dbCategoryData){
      res.sendStatus(404).json({message: 'No category found with this id'})
      return
    }
    res.json(dbCategoryData)
  }).catch(err=> {
    console.log(err)
    res.sendStatus(500).json(err)
  })
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then(dbCategoryData=> {
    if(!dbCategoryData){
      res.sendStatus(404).json({message: 'No category found with this id'})
      return
    }
    res.json(dbCategoryData)
  }).catch(err=> {
    console.log(err)
    res.sendStatus(500).json(err)
  })
  // delete a category by its `id` value
});

module.exports = router
