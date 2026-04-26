from flask import Flask, render_template
import os


def create_app():
    app = Flask(__name__)

    # Secret key for session/flash messages
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")

    # Home route
    @app.route("/")
    def home():
        return render_template("index.html")

    # About route
    @app.route("/about")
    def about():
        return render_template("about.html")

    # Contact route
    @app.route("/contact")
    def contact():
        return render_template("contact.html")

    # 404 Error Page
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template("404.html"), 404

    # 500 Error Page
    @app.errorhandler(500)
    def internal_error(error):
        return render_template("500.html"), 500

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)