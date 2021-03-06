from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, request
from flask_app import app, DATABASE, bcrypt
import re

p_regex = ("^(?=.*[a-z])(?=." +
           "*[A-Z])(?=.*\\d)")
PASSWORD_REGEX = re.compile(p_regex)


class User:
    def __init__(self, data):
        self.id = data['id']
        self.username = data['username']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.points = data['points']
        self.drawings = []

    @classmethod
    def get_user_by_username(cls, data):
        query = "SELECT * FROM users WHERE username = %(username)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if not results:
            return False
        return cls(results[0])

    @classmethod
    def get_user_by_id(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if len(results) < 1:
            return False
        return cls(results[0])

    @classmethod
    def get_all_users_not_self(cls, data):
        query = "SELECT * FROM users WHERE NOT id = %(id)s LIMIT 5;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if len(results) < 1:
            return False
        users = []
        for user in results:
            users.append(cls(user))
        return users

    @classmethod
    def get_all_users(cls):
        query = "SELECT * FROM users;"
        results = connectToMySQL(DATABASE).query_db(query)
        if len(results) < 1:
            return False
        users = []
        for user in results:
            users.append(cls(user))
        return users

    @classmethod
    def save(cls, data):
        query = "INSERT INTO users (username, password) \
        VALUES (%(username)s, %(password)s);"
        return connectToMySQL(DATABASE).query_db(query, data)

    @classmethod
    def updatePoints(cls, data):
        query = "UPDATE users SET points=%(points)s where id = %(id)s"
        return connectToMySQL(DATABASE).query_db(query, data)

    @staticmethod
    def register_validation(user):

        is_valid = True

        if len(user['username']) < 2:
            flash(u'Username must be at least 2 characters', 'username')
            is_valid = False

        if len(user['password']) < 8:
            flash(u'Password must be at least 8 characters', 'password')
            is_valid = False

        # Check for at least 1 digit and capitol letter
        if not re.search(PASSWORD_REGEX, user['password']):
            flash(u'Password does not contain necessary components', 'password')
            is_valid = False

        if user['password'] != request.form['confirm']:
            flash(u'Passwords do not match', 'confirm')
            is_valid = False

        return is_valid

    @staticmethod
    def login_validation(user, password):
        if not user:
            flash(u"Invalid login", 'login')
            return False
        if not bcrypt.check_password_hash(user.password, password):
            flash(u"Invalid login", 'login')
            return False

        return True

    def user_to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }
