from json import encoder
from flask.globals import session
from flask_app import app
from flask import jsonify, redirect, render_template

from flask_app.controllers.controller_users import login
from ..models import model_user, model_drawing


@app.route('/')
def index():
    if "uuid" in session:
        return redirect("/dashboard")
    return redirect('/login')

@app.route('/login')
def show_login():
    if "uuid" in session:
        return redirect("/dashboard")
    return render_template('index.html', login=True)

@app.route('/register')
def show_reg():
    if "uuid" in session:
        return redirect("/dashboard")
    return render_template('index.html', login=False)

@app.route("/dashboard")
def dashboard():
    print(session)
    if "uuid" not in session:
        return redirect("/register")

    context = {
        "curUser" : model_user.User.get_user_by_id( { "id": session["uuid"] } ),
        "userList" : model_user.User.get_all_users_not_self( { "id" : session['uuid'] } ),
    }

    return render_template("dashboard.html", **context)

@app.route("/get_images")
def get_images():
    games = model_drawing.Drawing.get_all_drawings_by_receiver_id( { "receiver_id": session['uuid'] } )
    if(games):
        for game in games:
            game['image'] = str(game['image'], encoding='utf-8')
    return jsonify(games = games)

