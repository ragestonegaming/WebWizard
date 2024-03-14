from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from main import predict_disease
from AI import conversation
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
# from waitress import serve

app = Flask(__name__)
cors = CORS(app)

@app.route('/predict', methods=['POST'])
@cross_origin(supports_credentials=True)
def predict():
    try:
        symptoms = request.json["symptoms"]
        prediction = predict_disease(symptoms)
        return prediction
    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)})

@app.route('/chat', methods=['POST'])
@cross_origin(supports_credentials=True)
def chat():
    message = request.json["message"]
    response = conversation(message)
    return {
        "response" : response 
    }

DB_NAME = 'user.db'

def create_table():
    try:
        with app.app_context():
            conn = sqlite3.connect(DB_NAME)
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL
                )
            ''')
            conn.commit()
    except sqlite3.Error as e:
        return jsonify({'error': f"SQLite error: {str(e)}"}), 500
    finally:
        if conn:
            conn.close()

    return jsonify({'message': 'Table created successfully'}), 200

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Username and password are required'}), 400
        
        username = data['username']
        password = data['password']
        hashed_password = generate_password_hash(password, method='sha256')
        
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
        conn.commit()
        return jsonify({'message': 'Signup successful'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username already exists'}), 400
    except sqlite3.Error as e:
        return jsonify({'error': f"SQLite error: {str(e)}"}), 500
    finally:
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Username and password are required'}), 400
        
        username = data['username']
        password = data['password']
        
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        
        if user and check_password_hash(user[2], password):
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    except sqlite3.Error as e:
        return jsonify({'error': f"SQLite error: {str(e)}"}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)
