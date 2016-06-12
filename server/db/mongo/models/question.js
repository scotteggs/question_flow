/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {type: String},
  response: {type: String},
  options: {type: Array},
  questionType: {
		type: String,
		required: true,
		enum: ['openResponse', 'trueFalse', 'multipleChoice']
  },
  respondedStatus: {
		type: Boolean,
		require: true,
		default: false
  }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Question', QuestionSchema);

