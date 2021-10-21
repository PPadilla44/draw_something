from logging import debug, exception
from flask_app import app

from flask_app.controllers import controller_users, controller_routes, controller_drawing

from flask_app.config.mysqlconnection import connectToMySQL

from livereload import Server

if __name__ == "__main__":
    # app.debug = True

    server = Server(app.wsgi_app)
    server.serve()


    # app.run(debug=True, use_reloader=True)