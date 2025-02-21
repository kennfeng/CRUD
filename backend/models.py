from extensions import db

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)  # Title of the note
    category = db.Column(db.String(100), nullable=True)  # Category of the note
    content = db.Column(db.Text, nullable=False)  # Content of the note

    def __repr__(self):
        return f"Note('{self.title}', '{self.category}', '{self.content[:30]}...')" 

