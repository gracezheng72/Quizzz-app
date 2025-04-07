from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize Flask app and database
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains (change for production)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the database model for questions
class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, nullable=False)
    options = db.Column(db.String, nullable=False)  # Store options as a string
    answer = db.Column(db.String, nullable=False)

# Initialize the database
with app.app_context():
    db.create_all()

@app.route('/quiz', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    return jsonify([{
        'id': q.id,
        'question': q.question,
        'options': eval(q.options),  # Convert the string back to a list of options
        'answer': q.answer
    } for q in questions])

@app.route('/quiz', methods=['POST'])
def add_question():
    data = request.get_json()
    new_question = Question(
        question=data['question'],
        options=str(data['options']),  # Convert options list to string
        answer=data['answer']
    )
    db.session.add(new_question)
    db.session.commit()
    return jsonify({
        'id': new_question.id,
        'question': new_question.question,
        'options': eval(new_question.options),
        'answer': new_question.answer
    }), 201

@app.route('/quiz/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    question = Question.query.get_or_404(question_id)
    db.session.delete(question)
    db.session.commit()
    return jsonify({"message": "Question deleted"})

@app.route('/quiz/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    data = request.get_json()
    question = Question.query.get_or_404(question_id)
    question.question = data['question']
    question.options = str(data['options'])  # Convert list to string
    question.answer = data['answer']
    db.session.commit()
    return jsonify({
        'id': question.id,
        'question': question.question,
        'options': eval(question.options),
        'answer': question.answer
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
