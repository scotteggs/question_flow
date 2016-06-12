/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';
import question from './question';

const QuestionnaireSchema = new mongoose.Schema({
  title: {type: String, maxlength: 30},
  submittedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  questions: [question]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Questionnaire', QuestionnaireSchema);

