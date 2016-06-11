import Questionnaire from '../models/questionnaires';

/**
 * List
 */
export function all(req, res) {
  Questionnaire.find({}).exec((err, questionnaires) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(questionnaires);
  });
}

/**
 * Find one questionnaire
 */
export function findOne(req, res) {
  const query = { _id: req.params.id };
  Questionnaire.findOne(query).exec((err, questionnaire) => {
    if (err) {
      console.log('Error in query');
      return res.status(500).send('Something is wrong in finding this data');
    }
    return res.json(questionnaire);
  });
}

/**
 * Add a Questionnaire
 */
export function add(req, res) {
  Questionnaire.create(req.body, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

/**
* Update a questionnaire
*/
export function update(req, res) {
  const query = { _id: req.params.id };
  const data = req.body;
  Questionnaire.findOneAndUpdate(query, data, (err) => {
    if (err) {
      console.log('Error on save!');
      return res.status(500).send('We failed to save for some reason');
    }
      return res.status(200).send('Updated Content successfully');
  });
}

/**
 * Remove a questionnaire
 */
export function remove(req, res) {
  const query = { _id: req.params.id };
  Questionnaire.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  findOne,
  add,
  update,
  remove
};
