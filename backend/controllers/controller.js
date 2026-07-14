const Model = require('../models/Model');

async function getAll(req, res) {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getOne(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findById(id);
    if (!model) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  try {
    const model = new Model(req.body);
    await model.save();
    res.status(201).json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const id = req.params.id;
    const model = await Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!model) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    await Model.findByIdAndRemove(id);
    res.status(204).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAll, getOne, create, update, remove };