/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const QuestionnaireSchema = new mongoose.Schema({
  title: {type: String, maxlength: 30},
  description: {type: String},
  questionnaireType: {type: String, enum: ['master', 'submission']},
  status: {type: String, enum: ['completed', 'inProgress', 'new']},
  submittedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  questions: [{
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
  }]
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
export default mongoose.model('Questionnaire', QuestionnaireSchema);

