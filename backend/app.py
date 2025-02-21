from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from extensions import db
from models import Note
from CRUD import crud_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Database files
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    app.register_blueprint(crud_bp)
    
    @app.route('/')
    def home():
        return 'running...', 200
    
    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)