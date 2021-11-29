from flask.json import jsonify
from flask_app import app, bcrypt
from flask import render_template, redirect, request, session, flash
from ..models import model_user

@app.route('/process-register', methods=['POST'])
def register():

    if not model_user.User.register_validation(request.form):
        return redirect('/register')

    hashy = bcrypt.generate_password_hash(request.form['password'])

    data = {
        'username': request.form['username'],
        'password': hashy,
    }

    uuid = model_user.User.save(data)
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
    print(user)
    if not user:
        return jsonify(False)
    
    user = user.user_to_dict()
    print(user)    

    return jsonify(user)
