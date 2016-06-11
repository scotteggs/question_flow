/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const QuestionnaireSchema = new mongoose.Schema({
  title: {type: String, maxlength: 30},
  //owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Questionnaire', QuestionnaireSchema);

