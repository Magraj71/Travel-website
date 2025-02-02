from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Make sure you set this

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, id):
        self.id = id

# Create a sample user database (could be replaced with a real one)
users = {'admin': {'password': 'password123'}}

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Check if the username exists in the mock database and password matches
        if username in users and users[username]['password'] == password:
            user = User(username)
            login_user(user)
            return redirect(url_for('home'))  # Redirect to the home page
        else:
            flash('Invalid credentials, please try again.', 'danger')
    return render_template('login.html')

@app.route('/home')
def home():
    return 'Welcome to the home page!'

if __name__ == '__main__':
    app.run(debug=True)
