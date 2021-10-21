from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify
from ..models import model_user

@app.route("/game/<int:id>")
def get_user(id):
    if "uuid" not in session:
        redirect("/")

    words = {
        "dog" : "dog",
        "cat" : "cat",
        "fish" : "fish",
    }
    
    user = model_user.User.get_user_by_id( { "id": id } )




    return render_template("game.html", user=user, words=words)


