from pathlib import Path
import os

from flask import Flask, abort, send_from_directory


BASE_DIR = Path(__file__).resolve().parent
ALLOWED_FILES = {
    "index.html",
    "application.html",
    "validation.js",
    "README.es.md",
    "CONTEXT.md",
}

app = Flask(__name__, static_folder=str(BASE_DIR), static_url_path="")


@app.get("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/<path:filename>")
def static_files(filename: str):
    if filename not in ALLOWED_FILES:
        abort(404)
    return send_from_directory(BASE_DIR, filename)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "5000"))
    app.run(host="0.0.0.0", port=port)
