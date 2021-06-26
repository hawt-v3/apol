from flask import Flask
import flask
from gpt3 import classifyArticle

app = Flask(__name__)

@app.route("/classify", methods=["POST"])
def classify():
    content = flask.request.json
    alignment = classifyArticle(content["content"])
    return {"Alignment": alignment}


if __name__ == "__main__":
    app.run(debug=True)