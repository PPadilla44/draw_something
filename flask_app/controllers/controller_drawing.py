from logging import log
from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify
from ..models import model_user, model_drawing
import random

@app.route("/game/<int:id>")
def get_user(id):

    if "uuid" not in session:
        redirect("/")

    import json
    import os 

    words_loc = os.getcwd() + "/flask_app/static/words/animals.json"

    # Opening JSON file
    with open(words_loc) as json_file:
        data = json.load(json_file)

    animal_list = []
    for x in range(3):
        if data[random.randint(0, len(data))] not in animal_list:
            animal_list.append(data[random.randint(0, len(data))].upper())
    

    context = {

        "words" : animal_list,
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

    if "uuid" not in session:
        return redirect("/register")

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

    if "uuid" not in session:
        return redirect("/register")
    
    drawing = model_drawing.Drawing.get_drawing_by_id({'id': id})

    if (session['uuid'] != drawing['receiver_id']):
        return redirect("/dashboard")
    
    
    model_drawing.Drawing.delete({"id": id})
    return redirect("/dashboard")

