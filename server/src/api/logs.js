const { Router } = require('express');
const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/:id', async (req, res, next) => {
  try {
    const logEntry = await LogEntry.findOne({ _id: req.params.id });
    res.json(logEntry);
  } catch (error) {
    res.status(400).send({
      error: `An error has occured ${error}`
    });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }

    next(error);
  }
});

module.exports = router;
