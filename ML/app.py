from flask import Flask
import flask
import gpt3
app = Flask(__name__)

@app.route("/classify", methods=["POST"])
def classify():
    content = flask.request.json
    alignment = gpt3.classifyArticle(content["content"])
    return {"alignment": alignment}
