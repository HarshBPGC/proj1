from flask import Flask, render_template, request, jsonify
from nicegui import ui
import json
from datetime import datetime

app = Flask(__name__)

# Resume data structure
resume_data = {
    'personal_info': {
        'name': '',
        'email': '',
        'phone': '',
        'location': '',
        'summary': ''
    },
    'education': [],
    'experience': [],
    'skills': [],
    'projects': []
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/save_resume', methods=['POST'])
def save_resume():
    data = request.json
    resume_data.update(data)
    return jsonify({'status': 'success'})

@app.route('/api/generate_website', methods=['POST'])
def generate_website():
    # Here you would implement the website generation logic
    return jsonify({'status': 'success', 'url': '/preview'})

@app.route('/preview')
def preview():
    return render_template('preview.html', data=resume_data)

if __name__ == '__main__':
    app.run(debug=True, port=3000) 