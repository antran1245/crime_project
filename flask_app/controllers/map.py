import os
from flask import render_template, redirect
from flask_app import app

@app.route('/')
def main():
    
    api = os.environ.get("GOOGLE_MAP_API")
    return render_template('map.html', api=api)
