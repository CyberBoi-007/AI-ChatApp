from flask import Flask, render_template, redirect, request, session, url_for
import requests, os
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@socketio.on('message')
def process(data):
    url = "https://waifu.p.rapidapi.com/path"

    name = session.get("name")

    querystring = {
        "user_id":"user",
        "message":data,
        "from_name":name,
        "to_name":"SpeedOfLight",
        "situation":f"SpeedOfLight is a programmer and a mathematician who is talking with his friend {name}",
        "translate_from":"en",
        "translate_to":"en"
    }

    payload = {}
    headers = {
        "content-type": "application/json",
        "X-RapidAPI-Key": os.environ("API_KEY"),
        "X-RapidAPI-Host": "waifu.p.rapidapi.com"
    }

    msg = requests.request(
        "POST", url,
         json=payload,
         headers=headers,
         params=querystring,
         timeout=10
    ).text

    send(msg)

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session["name"] = request.form["username"]
        return redirect(url_for("main"))

    return render_template("login.html")

@app.route('/', methods=['GET', 'POST'])
def main():

    # login and chatapp loading
    if not session.get("name"):
        return redirect(url_for("login"))
    else:
        return render_template("index.html", name=session.get("name"))


if __name__ == '__main__':
    socketio.run(app)
