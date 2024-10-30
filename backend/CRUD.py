from flask import Blueprint
from extensions import db
from models import User

crud_bp = Blueprint('crud', __name__)

# create record
@crud_bp.route('/add_user/<username>/<email>')
def add_user(username, email):
    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()
    return f'User {username} added.'

# read record
@crud_bp.route('/users')
def get_users():
    users = User.query.all()
    return '<br>'.join([f"User_id: {user.id} - User: {user.username}, Email: {user.email}" for user in users])

# update record
@crud_bp.route('/update_user/<int:user_id>/<new_email>')
def update_user(user_id, new_email):
    user = User.query.get(user_id)
    if user:
        user.email = new_email
        db.session.commit()
        return f'User {user.username} updated to {new_email}.'
    return 'User not found.'

# delete record
@crud_bp.route('/delete_user/<int:user_id>')
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return f'User {user.username} deleted!'
    return 'User not found.'