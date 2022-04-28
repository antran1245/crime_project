from flask import Flask
app = Flask(__name__)
DATABASE = "crime_report"
from flask_app.controllers import map, comments