CREATE TABLE destinations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE places (
    id INTEGER PRIMARY KEY,
    destination_id INTEGER,
    name TEXT NOT NULL,
    FOREIGN KEY (destination_id) REFERENCES destinations(id)
);
