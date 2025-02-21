from flask import Blueprint, request
from extensions import db
from models import Note

crud_bp = Blueprint('crud', __name__)

# Create note
@crud_bp.route('/add_note/', methods=['POST'])
def add_note():
    try:
        data = request.get_json()
        title = data.get('title')
        content = data.get('content')
        category = data.get('category')
        
        new_note = Note(title=title, content=content, category=category)
        db.session.add(new_note)
        db.session.commit()

        return {'message': f'Note {title} added.', 'id': new_note.id}, 201
    except Exception as e:
        return {'error': str(e)}, 500

# Get all notes
@crud_bp.route('/notes', methods = ['GET'])
def get_notes():
    try:
        notes = Note.query.all()
        if not notes:
            return {'error': 'No notes found'}, 404
        
        notes_data = [{"id": note.id, "title": note.title, "content": note.content, 
                       "category": note.category} for note in notes]
        
        return {'notes': notes_data}
    except Exception as e:
        return {'error': str(e)}, 500

# Update note
@crud_bp.route('/update_note/<int:note_id>/', methods=['PUT'])
def update_note(note_id):
    try:
        data = request.get_json()
        new_title = data.get('title')
        new_content = data.get('content')
        new_category = data.get('category')

        note = Note.query.get(note_id)
        if not note:
            return {'error': 'Note not found'}, 404

        note.title = new_title
        note.content = new_content
        note.category = new_category
        db.session.commit()

        return {'message': f'Note {note.title} updated.'}
    except Exception as e:
        return {'error': str(e)}, 500

# Delete note
@crud_bp.route('/delete_note/<int:note_id>/', methods=['DELETE'])
def delete_note(note_id):
    try:
        note = Note.query.get(note_id)
        if not note:
            return {'error': 'Note not found'}, 404

        db.session.delete(note)
        db.session.commit()

        return {'message': f'Note with id {note_id} deleted successfully'}, 200
    except Exception as e:
        return {'error': str(e)}, 500