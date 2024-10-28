from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return "search engine"

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    return jsonify({"message": "search func"})

if __name__ == "__main__":
    app.run(debug=True)
