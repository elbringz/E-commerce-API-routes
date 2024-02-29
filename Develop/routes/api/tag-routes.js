const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  //finds all tags
  try {
    const tags = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'tagToProduct'}],
    });
    //if no tags are found displays 404 error
    if(!tags) {
      res.status(404).json({message: 'No entries found.'});
      return;
    }
    //if tags are found display tags with 200 status code
    res.status(200).json(tags);
  }
  // if error display as 500 internal server error
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  //Finds single tag based on given id
  try {
    const tags = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'tagToProduct'}],
    });
    // If no match found return 404 error
    if(!tags) {
      res.status(404).json({message: 'No entries found.'});
      return;
    }
    // If found return 200 status
    res.status(200).json(tags);
  }
  // If error return error with 500 internal server code
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  //creates tag based on request body content
  try {
    const newTags = await Tag.create(req.body);
    // If accepted display content and return status 200
    res.status(200).json(newTags);
  }
  //if error return status 500 internal server error
  catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTags = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
    where: {
      id: req.params.id,
    }
  }
    );
    // if accepted return status 200
    res.status(200).json(updateTags);
  }
  // if error return status 500 server error
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  
  try {
    const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    }
  }
    )
    //returns deleted tag
    res.status(200).json(deletedTag);
   
  }
  //if error status 500 and return error
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
