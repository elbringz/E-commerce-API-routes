const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    //finds all categories by id
    const categories = await Category.findAll({
      include: [{model: Product}],
    });
    //if no categories found display 404 status
    if(!categories) {
      res.status(404).json({message: 'No entries found.'});
      return;
    }
    // If accepted displays all categories found
    res.status(200).json(categories);
  }
  catch(err){
    // if error displays 500 internal server error
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    // finds single category based on given primary key(id)
    const categories = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    // if not found display 404 status
    if(!categories) {
      res.status(404).json({message: 'No entries found.'});
      return;
    }
    // if found display 200 status
    res.status(200).json(categories);
  }
  catch(err){
    //if error display 500 internal server error
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    // posts new category using the given request parameter
    const categories = await Category.create(req.body);
    //if accepted display status 200
    res.status(200).json(categories);
  }
  catch(err){
    //if error display status 500 internal server error
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    //updates a category name based on given id
    const updateCategories = await Category.update({
      category_name: req.body.category_name,    
    },
    {
      where:{
        id: req.params.id,
      }
    }
    );
    if(!updateCategories){
      // if not found displays 404 status
      res.status(404).json({ message: 'No entries found.' });
      return;
    }
    //if accepted displays 200 status
    res.status(200).json(updateCategories);
  }
  catch(err){
    //if error displays 500 status
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    

    //deletes category based on given id
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    //returns deleted category
    res.status(200).json(deletedCategory);
    
  }
  //if error displays 500 status
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
