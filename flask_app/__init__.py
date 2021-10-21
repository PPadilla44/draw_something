from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.secret_key = "BLEH"

DATABASE = "draw_db"

from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
