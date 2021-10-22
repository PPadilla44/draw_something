from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, request
from flask_app import app, DATABASE, bcrypt

class Drawing:
    def __init__(self,data):
        self.id = data['id']
        self.image = data['image']
        self.word = data['word']
        self.creator_id = data['creator_id']
        self.receiver_id = data['receiver_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']


    @classmethod
    def get_drawing_by_id(cls,data):
        query = "SELECT * FROM drawings WHERE id = %(id)s;"
        results = connectToMySQL(DATABASE).query_db(query,data)
        if len(results) < 1:
            return False
        return cls(results[0])

    @classmethod
    def save(cls,data):
        query = "INSERT INTO drawings (image, word, creator_id, receiver_id) \
        VALUES (%(image)s, %(word)s, %(creator_id)s, %(receiver_id)s);"
        return connectToMySQL(DATABASE).query_db(query,data)

    @classmethod
    def get_all_drawings_by_receiver_id(cls, data):
        query = "SELECT * FROM drawings WHERE receiver_id = %(receiver_id)s;"
        results = connectToMySQL(DATABASE).query_db(query,data)
        if len(results) < 1:
            return False
        drawings = []
        for drawing in results:
            drawings.append(drawing)
        return drawings