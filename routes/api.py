from flask import Blueprint, jsonify

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/status')
def status():
    return jsonify({'message': 'API is running', 'version': '1.0.0'})
