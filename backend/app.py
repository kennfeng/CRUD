from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
    
@app.route('/')
def home():
    return 'a'

# CRUD
# Create record
@app.route('/add_user/<username>/<email>')
def add_user(username, email):
    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()
    return f'User {username} added.'

# Read record
@app.route('/users')
def get_users():
    users = User.query.all()
    return '<br>'.join([f"User_id: {user.id} - User: {user.username}, Email: {user.email}" for user in users])

# Update record
@app.route('/update_user/<int:user_id>/<new_email>')
def update_user(user_id, new_email):
    user = User.query.get(user_id)
    if user:
        user.email = new_email
        db.session.commit()
        return f'User {user.username} updated to {new_email}.'
    return 'User not found.'

# Delete record
@app.route('/delete_user/<int:user_id>')
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return f'User {user.username} deleted!'
    return 'User not found.'

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)