export const db = process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/question-flow';

export default {
  db
};
