from logging import log
from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify
from ..models import model_user, model_drawing

@app.route("/game/<int:id>")
def get_user(id):

    print("NOO")

    if "uuid" not in session:
        redirect("/")

    words = {
        "dog" : "dog",
        "cat" : "cat",
        "fish" : "fish",
    }
    

    context = {

        "words" : words,
        'user' : model_user.User.get_user_by_id( { "id": id } ),
        'curUser': model_user.User.get_user_by_id( { "id": session['uuid'] } ),

    }




    return render_template("game.html", **context)


@app.route("/send/drawing", methods=["POST"])
def send_drawing():
    print("SEND")
    print(request.form)
    model_drawing.Drawing.save(request.form)
    return jsonify(message="YEET")


