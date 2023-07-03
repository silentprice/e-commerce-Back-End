const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [{ model: Product }],
  })
  .then((tags) => res.json(tags))
  .catch((err) =>res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.json(tag);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id },
  })
    .then((tag) => {
      if (!tag[0]) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.json({ message: 'Successfully updated tag!!' });
    })
    .catch((err) => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: 'No tag with this id!' });
        return;
      }
      res.json({ message: 'Successfully deleted tag!!' });
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
