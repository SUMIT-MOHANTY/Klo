from flask import Flask, jsonify
from dotenv import load_dotenv
import json
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    with open('config/app.json') as f:
        app.config.update(json.load(f))
    
    @app.route('/')
    def index():
        return jsonify({
            'name': app.config['name'],
            'environment': app.config['environment'],
            'version': app.config['version']
        })
    
    @app.route('/health')
    def health():
        return jsonify({'status': 'healthy'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=8080)
