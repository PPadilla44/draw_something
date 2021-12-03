from flask_app import app

from flask_app.controllers import controller_users, controller_routes, controller_drawing


if __name__ == "__main__":
    from waitress import serve
    # serve(app)
    app.run()