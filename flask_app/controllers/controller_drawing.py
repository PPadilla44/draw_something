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
    model_drawing.Drawing.save(request.form)
    return jsonify(message="SUCCESS")


@app.route("/get/answer", methods=['POST'])
def get_drawing():
    drawing = model_drawing.Drawing.get_drawing_by_id(request.form)
    return jsonify(answer = drawing['word'])


@app.route("/game/guess/<id>")
def guess_drawing(id):

    drawing = model_drawing.Drawing.get_drawing_by_id({'id': id})

    if(drawing['receiver_id'] != session['uuid']):
        return redirect("/dashboard")
    drawing['image'] = str(drawing['image'], encoding='utf-8')

    context = {
        "drawing": drawing,
        "curUser" : model_user.User.get_user_by_id({"id" : session['uuid']})
    }


    return render_template('guessing.html', **context )


@app.route("/delete/drawing/<int:id>")
def delete_drawing(id):
    
    drawing = model_drawing.Drawing.get_drawing_by_id({'id': id})

    if (session['uuid'] != drawing['receiver_id']):
        return redirect("/dashboard")
    
    
    model_drawing.Drawing.delete({"id": id})
    return redirect("/dashboard")

