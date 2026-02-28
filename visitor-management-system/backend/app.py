from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ============================================================
# DATABASE CONFIGURATION (DOCKER READY)
# ============================================================

DB_HOST = os.getenv("DB_HOST", "mysql")   # IMPORTANT: mysql (service name)
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "root")
DB_NAME = os.getenv("DB_NAME", "visitors")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:3306/{DB_NAME}"

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

print("\n" + "="*60)
print("🚀 Connected to MySQL")
print(f"Host: {DB_HOST}")
print(f"Database: {DB_NAME}")
print("="*60 + "\n")

# ============================================================
# DATABASE MODEL
# ============================================================

class Visitor(db.Model):
    __tablename__ = "visitors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    purpose = db.Column(db.String(255))
    check_in = db.Column(db.DateTime, default=datetime.utcnow)
    check_out = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "purpose": self.purpose,
            "check_in": self.check_in,
            "check_out": self.check_out,
        }

# ============================================================
# CREATE TABLES
# ============================================================

with app.app_context():
    db.create_all()
    print("✅ Tables created successfully")

# ============================================================
# ROUTES
# ============================================================

@app.route("/")
def home():
    return jsonify({"message": "Visitor Management System Backend Running"})


@app.route("/add_visitor", methods=["POST"])
def add_visitor():
    data = request.get_json()

    new_visitor = Visitor(
        name=data.get("name"),
        phone=data.get("phone"),
        purpose=data.get("purpose"),
    )

    db.session.add(new_visitor)
    db.session.commit()

    return jsonify({"message": "Visitor added successfully"}), 201


@app.route("/visitors", methods=["GET"])
def get_visitors():
    visitors = Visitor.query.all()
    return jsonify([v.to_dict() for v in visitors])


@app.route("/checkout/<int:visitor_id>", methods=["PUT"])
def checkout(visitor_id):
    visitor = Visitor.query.get(visitor_id)

    if not visitor:
        return jsonify({"error": "Visitor not found"}), 404

    visitor.check_out = datetime.utcnow()
    db.session.commit()

    return jsonify({"message": "Visitor checked out successfully"})


# ============================================================
# RUN APPLICATION
# ============================================================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)