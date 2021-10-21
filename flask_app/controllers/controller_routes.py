from flask.globals import session
from flask_app import app
from flask import redirect, render_template
from ..models import model_user

@app.route('/')
def index():
    if "uuid" in session:
        return redirect("/dashboard")
    return render_template('index.html')

@app.route("/dashboard")
def dashboard():
    
    context = {
        "user" : model_user.User.get_user_by_id( { "id": session["uuid"] } ),
        "userList" : model_user.User.get_all_users_not_self( { "id" : session['uuid'] } )
    }
    
    return render_template("dashboard.html", **context)
