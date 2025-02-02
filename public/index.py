from flask import Flask, render_template, request

app = Flask(__name__)

# Sample data of destinations and best places
destinations = {
    "mumbai": ["Gateway of India", "Marine Drive", "Chhatrapati Shivaji Maharaj Terminus", "Elephanta Caves"],
    "paris": ["Eiffel Tower", "Louvre Museum", "Notre-Dame Cathedral"],
    "london": ["Big Ben", "London Eye", "Tower of London"]
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    location = request.args.get('location', '').lower().strip()
    
    # Search for the location in the dictionary
    if location in destinations:
        places = destinations[location]
    else:
        places = None  # If the location is not found, display a message

    return render_template('search_results.html', location=location, places=places)

if __name__ == '__main__':
    app.run(debug=True)
