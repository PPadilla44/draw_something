from flask.json import jsonify
from flask_app import app, bcrypt
from flask import render_template, redirect, request, session, flash
from ..models import model_user, model_drawing
import base64
import os

@app.route('/process-register', methods=['POST'])
def register():

    if model_user.User.get_user_by_username(request.form):
        flash("Username already taken")
        return redirect("/register")
    if not model_user.User.register_validation(request.form):
        return redirect('/register')

    hashy = bcrypt.generate_password_hash(request.form['password'])

    data = {
        'username': request.form['username'],
        'password': hashy,
    }

    uuid = model_user.User.save(data)

    
    cwd = os.getcwd()
    image_loc = f"{cwd}\\flask_app\static\images\Beaver.png"
    
    with open(image_loc, 'rb') as fp:
        encoded_string = base64.b64encode(fp.read())

    image_data = {
        "image": "data:image/png;base64," + encoded_string.decode("utf-8"),
        "word": "BEAVER",
        "creator_id": uuid,
        "receiver_id": uuid,
    }

    model_drawing.Drawing.save(image_data)

    session['uuid'] = uuid

    return redirect(f'/dashboard')

@app.route('/process-login', methods=['POST'])
def login():
    
    get_user = model_user.User.get_user_by_username({'username': request.form['username']})

    if not model_user.User.login_validation(get_user,request.form['password']):
        return redirect('/login')
    
    session['uuid'] = get_user.id

    return redirect('/dashboard')

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/search_user_by_username", methods=["POST"])
def search_user_by_username():

    user = model_user.User.get_user_by_username(request.form)

    if not user:
        return jsonify(False)
    
    user = user.user_to_dict()

    return jsonify(user)

@app.route("/add-points", methods=["POST"])
def add_points():
    model_user.User.updatePoints(request.form)
    return jsonify(msg="SUCCESS")


@app.route('/skip-login')
def skip_login():

    all_users = model_user.User.get_all_users()
    num = len(all_users)
    username = f"Guest{num}"

    hashy = bcrypt.generate_password_hash(username)


    data = {
        'username': username,
        'password': hashy,
    }

    uuid = model_user.User.save(data)

    
    cwd = os.getcwd()
    image_loc = f"{cwd}/flask_app/static/images/Beaver.png"
    print(image_loc)

    f = open("logs.txt", "a")
    f.write(image_loc)
    f.close()
    
    # with open(image_loc, 'rb') as fp:
    #     encoded_string = base64.b64encode(fp.read())

    # image_data = {
    #     "image": "data:image/png;base64," + encoded_string.decode("utf-8"),
    #     "word": "BEAVER",
    #     "creator_id": uuid,
    #     "receiver_id": uuid,
    # }

    # model_drawing.Drawing.save(image_data)

    session['uuid'] = uuid

    return redirect(f'/dashboard')